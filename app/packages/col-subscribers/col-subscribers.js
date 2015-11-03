const UserSubscriberSharedSchema = new SimpleSchema({
  status: { type: String, label: 'Statut', optional: true},
  avef: {type: String, label: 'N° adhérent AVEF', optional: true},
  snvel: {type: String, label: 'N° ordinal pour adhérent SNVEL', optional: true},
  lastName: {type: String, label: 'Nom', min: 2, max: 256},
  firstName: {type: String, label: 'Prénom', min: 2, max: 256},
  streetAddress: {type: String, label: 'Rue', optional: true, min: 2, max: 256},
  // @NOTE Only for France
  // postalCode: {
  //   type: String, label: 'Code postal',
  //   regEx: /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
  //   optional: true, min: 5, max: 5
  // },
  postalCode: {type: String, label: 'Code postal', optional: true, min: 3, max: 8},
  city: {type: String, label: 'Ville', optional: true, min: 2, max: 128},
  email: {type: String, regEx: SimpleSchema.RegEx.Email, label: 'E-mail', optional: true},
  job: {type: String, optional: true, label: 'Profession', allowedValues: ['basic', 'avef', 'snvel', 'snvelDelegate', 'seniorJuniorVetCcp', 'nurseDentistSmith', 'junior']},
  programs: {type: [String], optional: true, min: 1, label: 'Programmes sélectionnés', allowedValues: ['AVEF', 'SNVEL', 'EBMS']},
  rights: {type: [String], optional: true, label: 'Droits'},
  products: {type: [String], optional: true, label: 'Produits'},
  paymentType: {type: String, optional: true, label: 'Type de paiement', allowedValues: ['check', 'card']},
  checkNumber: {type: String, label: 'N° de chèque', optional: true},
  paymentAccepted: {type: Boolean, label: 'Paiement validé', optional: true},
  paymentDate: {type: Date, label: 'Date du paiement', optional: true},
  braintreeCustomerId: {type: String, optional: true, label: 'Indentifiant de paiement Braintree'},
  invoice: {type: SD.Structure.InvoiceSchema, optional: true },
  qrImage: {type: String, optional: true, label: 'QR code'},
  presence: {type: [String], optional: true, label: 'Présence aux sessions'},
});

SD.Structure.UserSubscriberSharedSchema = UserSubscriberSharedSchema;

const CitySchema = new SimpleSchema({
  streetAddress: {type: String, label: 'Rue', min: 2, max: 256},
  postalCode: {
    type: String, label: 'Code postal',
    regEx: /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
    min: 5, max: 5
  },
  city: {type: String, label: 'Ville', min: 2, max: 128}
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
          lastName: textInputFormatter(tokens[3]),
          firstName: textInputFormatter(tokens[4]),
          streetAddress: textInputFormatter(tokens[5]),
          postalCode: tokens[6].trim(),
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
      'userInfo.lastName': 1,
      'userInfo.firstName': 1,
      'userInfo.email': 1
    }
  };
  class Subscribers extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.subscribers = new Subscribers(sharedOptions, serverOptions);

  // Methods for extracting subscriber info
  Meteor.methods({
    availableSubscriberInfo(cb) {
      if (!this.userId) {
        throw new Meteor.Error('User retrieval', '403: Non authorized');
      }
      check(cb, Match.Any);
      const user = Meteor.users.findOne(this.userId);
      log.info('User', user.emails[0].address, 'is requesting subscriber info');
      // Start by checking email
      let subscriber = SD.Structure.subscribers.collection.findOne({
        'userInfo.email': user.emails[0].address });
      // If not found, check fistname and lastName
      if (!subscriber) {
        subscriber = SD.Structure.subscribers.collection.findOne({
          $and: [
            {'userInfo.lastName': user.profile.lastName},
            {'userInfo.firstName': user.profile.firstName}
          ]
        });
      }
      if (subscriber) {
        log.info('Found subscriber', subscriber);
        return subscriber;
      }
      return subscriber;
    },
  });
}
