// Technical articles :
// * http://joshowens.me/how-to-optimize-your-mongo-database-for-meteor-js/
// * https://github.com/andrewreedy/meteor-collection-setup/blob/master/src/CollectionSetup.js

// Base class for Collection. Takes car of default value and ensure indexes.
class BaseCollection {
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
      ((subName) => {
        this.logger.info(`Subscrition method ${this.name}${subName} declared`);
        // Create the method
        let subscribeFct = (cb) => {
          this.logger.info('Subscribing to', subName);
          return globalSubs.subscribe(`${this.name}${subName}`, cb);
        };
        Object.defineProperty(this, `sub${subName}`, { value: subscribeFct });
      })(key);
    }
  }
}
// Export class
Col.BaseCollection = BaseCollection;

// Server only
if (Meteor.isServer) {
  class ServerBaseCollection extends BaseCollection {
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
        // @TODO unique publication
        // Ensure immediate call
        ((subName) => {
          Meteor.publish(`${this.name}${key}`, (cb) => {
            if (this.subs[key].data) {
              this.logger.error('Key', key);
            }
            this.logger.info('Publishing', key, 'for user', this.userId);
            check(cb, Match.Any);
            return this.collection.find({});
          });
        })(key);
      }
      this.logger.info('Data published');
    }
  }
  // Export class
  Col.ServerBaseCollection = ServerBaseCollection;
}
