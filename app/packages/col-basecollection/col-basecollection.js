// Technical articles :
// * http://joshowens.me/how-to-optimize-your-mongo-database-for-meteor-js/
// * https://github.com/andrewreedy/meteor-collection-setup/blob/master/src/CollectionSetup.js

// Base class for Collection. Takes car of default value and ensure indexes.
class BaseCollection {
  constructor({ name, logger, schema, defaults, indexes }) {
    // Assign arguments as class properties
    let [ args, dummy ] = [...arguments];
    for (let prop of Object.keys(args)) {
      this[prop] = args[prop];
    }
    // Create a Meteor collection
    this.collection = new Meteor.Collection(this.name);
    this.logger.info('Collection', this.name, 'created');
    // Create Schema and attach it to the collection
    this.schema = new SimpleSchema(schema);
    this.collection.attachSchema(this.schema);
    this.logger.info('Schema created for', this.name);
  }
}

// Export class
Col.BaseCollection = BaseCollection;

// Server only
if (Meteor.isServer) {
  class ServerBaseCollection extends BaseCollection {
    constructor(options) {
      super(options);
      // Create indexes if provided
      if (this.indexes) {
        this._createIndexes();
      }
      // Create default data if provided
      if (this.defaults) {
        this._createDefaults();
      }
    }
    _createIndexes() {
      this.collection._ensureIndex(this.indexes);
      this.logger.info('Indexes created on', this.name);
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
        this.logger.info('Creating defaults');
      });
    }
  }
  // Export class
  Col.ServerBaseCollection = ServerBaseCollection;
}
