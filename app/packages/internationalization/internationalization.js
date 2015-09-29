// Internationalization

// Create a logger
const log = Logger.createLogger('Internationalization');

// Settings for global internationalization
getUserLanguage = function() {
  return 'fr';
};

if (Meteor.isClient) {
  TAPi18n.setLanguage(getUserLanguage);
  //TAPi18n.setLanguage(getUserLanguage());
}

// Settings for Accounts
T9n.setLanguage(getUserLanguage());

log.info('Declared with default', getUserLanguage());
