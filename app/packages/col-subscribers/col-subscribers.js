// Options used on the server and the client
const sharedOptions = {
  name: 'Subscribers',
  schema: {
    status: { type: String, label: 'Statut', optional: true, min: 2, max: 8 },
    avef: {type: String, label: 'N° adhérent AVEF', optional: true, min: 4, max: 16},
    snvel: {type: String, label: 'N° ordinal pour adhérent SNVEL', min: 1, max: 16},
    lastname: {type: String, label: 'Nom', min: 2, max: 256},
    firstname: {type: String, label: 'Prénom', min: 2, max: 256},
    postalcode: {type: String, label: 'Code postal', optional: true, min: 5, max: 5},
    city: {type: String, label: 'Ville', optional: true, min: 2, max: 128},
    email: {type: String, regEx: SimpleSchema.RegEx.Email, label: 'E-mail', optional: true},
  },
  // Available subscriptions and publications
  // @TODO Restrict the list on subscription for the admin only
  subs: {
    All: {}
  }
};

// Client only
if (Meteor.isClient) {
  class Subscribers extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.subscribers = new Subscribers(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  const log = Logger.createLogger('Collection Subscribers');
  // Get programs as CSV
  const subscribersCsv = Assets.getText('subscribers.csv');
  let defaults = [];
  subscribersCsv.split('\n').slice(1).map((subscriberLine, idx) => {
    log.info('Analyzing line', idx, 'with content', subscriberLine);
    if (subscriberLine !== '') {
      const tokens = subscriberLine.split(',');
      defaults.push({
        status: tokens[0].trim(),
        avef: tokens[1].trim(),
        snvel: tokens[2].trim(),
        lastname: _.chain(s(tokens[3]).words())
          .map((element) => s.capitalize(element, true))
          .value().join(' '),
        firstname: _.chain(s(tokens[4]).words())
          .map((element) => s.capitalize(element, true))
          .value().join(' '),
        postalcode: tokens[5].trim(),
        city: _.chain(s(tokens[6]).words())
          .map((element) => s.capitalize(element, true))
          .value().join(' '),
        email: tokens[7].trim().toLowerCase()
      });
    }
  });
  // Options used only on the server
  const serverOptions = {
    defaults,
    // Set indexes on collection
    indexes: { lastname: 1, firstname: 1, email: 1, city: 1, postalcode: 1 }
  };
  class Subscribers extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.subscribers = new Subscribers(sharedOptions, serverOptions);
}
