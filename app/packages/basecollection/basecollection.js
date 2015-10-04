// Technical articles :
// * http://joshowens.me/how-to-optimize-your-mongo-database-for-meteor-js/

/** Base class for Collection. Takes car of default value and ensure indexes. */
class BaseCollection {
  /**
   * C-tor
   * @param {Object} Object literal with:
   *  * name: The collection name.
   *  * schame: A SimpleSchema on the Collection.
   *  * subs: An object literal on the Collection.
   * @return {Object} Instance of the class.
   */
  constructor({ name, schema, subs }) {
    // Assign arguments as class properties
    let [ args, dummy ] = [...arguments];
    for (let prop of Object.keys(args)) {
      this[prop] = args[prop];
    }
    // Create a logger
    this.logger = Logger.createLogger(`Collection ${this.name}`);
    // Create a Meteor collection
    this.collection = new Meteor.Collection(this.name);
    this.logger.info('Created');
    // Create Schema and attach it to the collection
    this.schema = new SimpleSchema(schema);
    this.collection.attachSchema(this.schema);
    this.logger.info('Schema attached');
    // Create subscription methods
    for (let key of Object.keys(this.subs)) {
      // Ensure immediate call
      (subName => {
        this.logger.info(`Subscrition method ${this.name}${subName} declared`);
        // Create the method
        let subscribeFct = function() {
          let variables = [...arguments];
          this.logger.info('Subscribing to', subName, 'with', variables);
          let boundVars = [`${this.name}${subName}`].concat(variables);
          // Use regular subscription owing to this: https://github.com/kadirahq/subs-manager/issues/55
          return Meteor.subscribe.apply(SD.Utils.globalSubs, boundVars);
          // @TODO return SD.Utils.globalSubs.subscribe.apply(SD.Utils.globalSubs, boundVars);
        };
        Object.defineProperty(this, `sub${subName}`, { value: subscribeFct });
      })(key);
    }
  }
}
// Export class
SD.Structure.BaseCollection = BaseCollection;

// Server only
if (Meteor.isServer) {
  /** Server side base collection. Add defaults and indexes in Mongo */
  class ServerBaseCollection extends BaseCollection {
    /**
     * C-tor.
     * @param  {Object} sharedOptions Same options as thus for BaseCollection.
     * @param  {Object} serverOptions Specific options for the defaults and the indexes.
     * @return {Object} An instance of the class
     */
    constructor(sharedOptions, serverOptions) {
      super(sharedOptions);
      // Assign serverOptions as class properties
      for (let prop of Object.keys(serverOptions)) {
        this[prop] = serverOptions[prop];
      }
      // Create indexes if provided
      if (this.indexes) { this._createIndexes(); }
      // Create default data if provided
      if (this.defaults) { this._createDefaults(); }
      // Publish data for the subscriptions
      if (this.subs) { this._createPublications(); }
    }
    _createIndexes() {
      this.collection._ensureIndex(this.indexes);
      this.logger.info('Indexes created');
    }
    _createDefaults() {
      if (this.collection.find().count() !== 0) {
        return this.logger.info('Defaults already filled');
      }
      // Add MongoID's
      for (var d of this.defaults) {
        d._id = new Meteor.Collection.ObjectID().valueOf();
      }
      // Batch insert default Documents
      this.collection.rawCollection().insert(this.defaults, (err, res) => {
        if (err) {
          return this.logger.error(err);
        }
        this.logger.info('Defaults created');
      });
    }
    _createPublications() {
      for (let key of Object.keys(this.subs)) {
        this.logger.info(`Publishing ${this.name}${key}`);
        // Ensure immediate call
        (subName => {
          const publishFct = function(meteorContext, ...args) {
            this.logger.debug('Received args', args);
            this.logger.info(`Publishing ${subName} for user ${this.userId} with ${args.length} args`);
            const subOpts = this.subs[subName];
            // Check restrictions
            if (subOpts.roles) {
              if (!meteorContext.userId || !Roles.userIsInRole(meteorContext.userId, subOpts.roles)) {
                this.logger.warn('Request attempt by', meteorContext.userId, 'on restricted function', subName, 'whith roles', subOpts.roles);
                throw new Meteor.Error(403, 'Access denied');
              }
            }
            // Check arguments and build a potential mongo query selector
            let query = {};
            if (subOpts.query) {
              // Subscription is on a query
              for (let varIdx in args) {
                check(args[varIdx],
                      this.schema.getDefinition(subOpts.query[varIdx]).type);
                query[subOpts.query[varIdx]] = args[varIdx];
              }
            } else if (subOpts.filter) {
              // Subscription is on a filter
              query = subOpts.filter;
            }
            // Get query options
            let options = subOpts.options ? subOpts.options : {};
            // When a query parameter is used, consider the return a a single element
            return this.collection.find(query, options);
          }.bind(this);
          // Publish and preserve Meteor's context
          Meteor.publish(`${this.name}${subName}`, function(...args) {
            return publishFct(this, ...args);
          });
        })(key);
      }
      this.logger.info('Data published');
    }
  }
  // Export class
  SD.Structure.ServerBaseCollection = ServerBaseCollection;
}
