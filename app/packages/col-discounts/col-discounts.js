// Options used on the server and the client
const sharedOptions = {
  name: 'Discounts',
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
  class Discounts extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.discounts = new Discounts(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  const log = Logger.createLogger('Collection Discounts');
  // Get discounts as CSV
  const discountsCsv = Assets.getText('discounts.csv');
  let defaults = [];
  discountsCsv.split('\n').slice(1).map((pricingLine, idx) => {
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
  class Discounts extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.discounts = new Discounts(sharedOptions, serverOptions);
}
