// Options used on the server and the client
const sharedOptions = {
  name: 'Products',
  schema: {
    name: { type: String, label: 'Nom', min: 1, max: 256},
    right: { type: String, label: 'Droit', min: 2, max: 256 }
  },
  // Available subscriptions and publications
  subs: {
    All: {}
  }
};

// Client only
if (Meteor.isClient) {
  class Products extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.products = new Products(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  const log = Logger.createLogger('Collection Products');
  // Get products as CSV
  const productsCsv = Assets.getText('products.csv');
  let defaults = [];
  productsCsv.split('\n').slice(1).map((pricingLine, idx) => {
    log.info('Analyzing line', idx, 'with content', pricingLine);
    if (pricingLine !== '') {
      const tokens = pricingLine.split(',');
      defaults.push({
        name: tokens[0].trim(),
        right: tokens[1].trim()
      });
    }
  });
  // Options used only on the server
  const serverOptions = {
    defaults,
    // Set indexes on collection
    indexes: { name: 1 }
  };
  class Products extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.products = new Products(sharedOptions, serverOptions);
}
