// Options used on the server and the client
const sharedOptions = {
  name: 'Discounts',
  schema: {
    right: { type: Array, label: 'Droits', min: 3, max: 16},
    'right.$': { type: String, label: 'Droit', min: 3, max: 32},
    basic: {type: Number, min: 0, max: 2000, label: 'Vétérinaire non-adhérent'},
    avef: {type: Number, min: 0, max: 2000, label: 'Adhérent AVEF'},
    snvel: {type: Number, min: 0, max: 2000, label: 'Adhérent SNVEL'},
    snvelDelegate: {type: Number, min: 0, max: 2000, label: 'Délégué SNVEL'},
    seniorJuniorVetCcp: {type: Number, min: 0, max: 2000, label: 'Sénior/Jeune vétérinaire/CCP'},
    nurseDentistSmith: {type: Number, min: 0, max: 2000, label: 'ASV/TDE/Maréchal'},
    junior: {type: Number, min: 0, max: 2000, label: 'Vétérinaire junior (Jour1+Jour2)'}
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
        right: tokens[0].trim().spli('/'),
        basic: tokens[1].trim(),
        avef: tokens[2].trim(),
        snvel: tokens[3].trim(),
        snvelDelegate: tokens[4].trim(),
        seniorJuniorVetCcp: tokens[5].trim(),
        nurseDentistSmith: tokens[6].trim(),
        junior: tokens[7].trim(),
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
