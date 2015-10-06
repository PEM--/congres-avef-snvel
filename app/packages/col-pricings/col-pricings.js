const RelevantAmountSchema = new SimpleSchema({
  relevancy: { type: Boolean, label: 'Applicable' },
  amount: { type: Number, label: 'Montant (€)', min: 0, max: 2000 }
});
SD.Structure.RelevantAmountSchema = RelevantAmountSchema;

// Options used on the server and the client
const sharedOptions = {
  name: 'Pricings',
  schema: {
    right: { type: String, label: 'Droit', min: 3, max: 32},
    basic: {type: SD.Structure.RelevantAmountSchema, label: 'Non adhérent'},
    avef: {type: SD.Structure.RelevantAmountSchema, label: 'Adhérent AVEF'},
    snvel: {type: SD.Structure.RelevantAmountSchema, label: 'Adhérent SNVEL'},
    snvelDelegate: {type: SD.Structure.RelevantAmountSchema, label: 'Délégué SNVEL'},
    seniorJuniorVetCcp: {type: SD.Structure.RelevantAmountSchema, label: 'Sénior/Jeune vétérinaire/CCP'},
    nurseDentistSmith: {type: SD.Structure.RelevantAmountSchema, label: 'ASV/TDE/Maréchal'},
    junior: {type: SD.Structure.RelevantAmountSchema, label: 'Junior (Jour1+Jour2)'}
  },
  // Available subscriptions and publications
  subs: {
    All: {}
  }
};

// Client only
if (Meteor.isClient) {
  class Pricings extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.pricings = new Pricings(sharedOptions);
}

let relevantAmountTranslator = function(token) {
  const smallToken = token.trim().toLowerCase();
  let relevancy = false, amount = 0;
  if (smallToken !== 'na') {
    amount = Number(smallToken);
  }
  return { relevancy, amount };
};

// Server only
if (Meteor.isServer) {
  const log = Logger.createLogger('Collection Pricings');
  // Get pricings as CSV
  const pricingsCsv = Assets.getText('pricings.csv');
  let defaults = [];
  pricingsCsv.split('\n').slice(1).map((pricingLine, idx) => {
    log.info('Analyzing line', idx, 'with content', pricingLine);
    if (pricingLine !== '') {
      const tokens = pricingLine.split(',');
      defaults.push({
        right: tokens[0].trim(),
        avef: relevantAmountTranslator(tokens[1]),
        snvel: relevantAmountTranslator(tokens[2]),
        snvelDelegate: relevantAmountTranslator(tokens[3]),
        seniorJuniorVetCcp: relevantAmountTranslator(tokens[4]),
        nurseDentistSmith: relevantAmountTranslator(tokens[5]),
        junior: relevantAmountTranslator(tokens[6])
      });
    }
  });
  // Options used only on the server
  const serverOptions = {
    defaults,
    // Set indexes on collection
    indexes: { right: 1 }
  };
  class Pricings extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.pricings = new Pricings(sharedOptions, serverOptions);
}
