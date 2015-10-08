const UserSubscriberSharedSchema = new SimpleSchema({
  status: { type: String, label: 'Statut', optional: true},
  avef: {type: String, label: 'N° adhérent AVEF', optional: true},
  snvel: {type: String, label: 'N° ordinal pour adhérent SNVEL', optional: true},
  lastname: {type: String, label: 'Nom', min: 2, max: 256},
  firstname: {type: String, label: 'Prénom', min: 2, max: 256},
  road: {type: String, label: 'Rue', optional: true, min: 2, max: 256},
  postalcode: {
    type: String, label: 'Code postal',
    regEx: /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
    optional: true, min: 5, max: 5
  },
  city: {type: String, label: 'Ville', optional: true, min: 2, max: 128},
  email: {type: String, regEx: SimpleSchema.RegEx.Email, label: 'E-mail', optional: true},
  job: {type: String, optional: true, label: 'Profession', allowedValues: ['basic', 'avef', 'snvel', 'snvelDelegate', 'seniorJuniorVetCcp', 'nurseDentistSmith', 'junior']},
  programs: {type: Array, optional: true, min: 1, label: 'Programmes sélectionnés'},
  'programs.$': {type: String, optional: true, label: 'Programme', allowedValues: ['AVEF', 'SNVEL', 'EBMS']},
  rigths: {type: Array, optional: true, label: 'Droits'},
  'rigths.$': {type: String, optional: true, label: 'Droit', allowedValues: ['AM1', 'GdC', 'Jour1', 'TR1', 'TD1', 'TD2', 'TP1', 'TP2', 'TR2', 'TD3', 'TD4', 'TP3', 'TP4', 'TR3', 'TD5', 'TD6', 'TP5', 'Exhib', 'Diner', 'Jour2', 'si Jour1+Jour2', 'TD7', 'TD8', 'TP6', 'TD9', 'TD10', 'TP7', 'TD11', 'TD12', 'TP8', 'EBMS1', 'EBMS2', 'EBMS3', 'EBMS3', 'EBMS4', 'EBMS5', 'EBMS6', 'proceeding paper avec inscription', 'proceeding paper sans jour 1 ou jour 2']},
  paymentType: {type: String, optional: true, label: 'Paiement par chèque', allowedValues: ['check', 'card']},
  paymentAccepted: {type: Boolean, label: 'Paiement validé', optional: true},
  paymentDate: {type: Date, label: 'Date du paiement', optional: true}
});

SD.Structure.UserSubscriberSharedSchema = UserSubscriberSharedSchema;

const CitySchema = new SimpleSchema({
  road: {type: String, label: 'Rue', optional: true, min: 2, max: 256},
  postalcode: {
    type: String, label: 'Code postal',
    regEx: /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
    optional: true, min: 5, max: 5
  },
  city: {type: String, label: 'Ville', optional: true, min: 2, max: 128}
});

SD.Structure.CitySchema = CitySchema;

// Options used on the server and the client
const sharedOptions = {
  name: 'Subscribers',
  schema: {
    userInfo: { type: SD.Structure.UserSubscriberSharedSchema },
    createdAt: {type: Date },
    modifiedAt: {type: Date }
  },
  // Available subscriptions and publications
  subs: {
    All: { roles: ['admin'] }
  }
};

// Client only
if (Meteor.isClient) {
  class Subscribers extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.subscribers = new Subscribers(sharedOptions);
}

textInputFormatter = (text) => _.chain(s(text).words()).map((element) => s.capitalize(element, true)).value().join(' ');

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
        userInfo: {
          status: tokens[0].trim(),
          avef: tokens[1].trim(),
          snvel: tokens[2].trim(),
          lastname: textInputFormatter(tokens[3]),
          firstname: textInputFormatter(tokens[4]),
          road: textInputFormatter(tokens[5]),
          postalcode: tokens[6].trim(),
          city: textInputFormatter(tokens[7]),
          email: tokens[8].trim().toLowerCase()
        },
        createdAt: new Date(),
        modifiedAt: new Date()
      });
    }
  });
  // Options used only on the server
  const serverOptions = {
    defaults,
    // Set indexes on collection
    indexes: {
      'userInfo.lastname': 1,
      'userInfo.firstname': 1,
      'userInfo.email': 1
    }
  };
  class Subscribers extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.subscribers = new Subscribers(sharedOptions, serverOptions);
}
