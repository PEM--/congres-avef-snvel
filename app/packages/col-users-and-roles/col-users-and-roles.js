// Define users, their schema and their roles

// Create a logger
const log = Logger.createLogger('Collection Users and Roless');

// Schema for client and server
SD.Structure.SchemaUser = new SimpleSchema({
  emails: {
    type: Array,
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    optional: true,
    defaultValue: ['public']
  },
  lastConnection: {
    type: Date,
    defaultValue: new Date()
  }
});
Meteor.users.attachSchema(SD.Structure.SchemaUser);
log.info('Schema defined');

// A reduced Schema for Login validation purpose
SD.Structure.LoginSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: {
    type: String,
    min: 7, max: 256
  }
});

// Create default accounts
if (Meteor.isServer) {
  // Only create accounts if none has been created before
  if (Meteor.users.find().count() === 0) {
    // Create admin users
    Meteor.settings.admins.map(function(admin) {
      const adminId = Accounts.createUser({
        email: admin.email,
        password: admin.password
      });
      Roles.addUsersToRoles(adminId, ['public', 'admin']);
      log.info('User created:', admin.email);
    });
    // Create a test account
    const { testAccount } = Meteor.settings;
    const testId = Accounts.createUser({
      email: testAccount.email,
      password: testAccount.password
    });
    Roles.addUsersToRoles(testId, ['public']);
    log.info('User created:', testAccount.email);
  }
}

// Accounts options
Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});
if (Meteor.isServer) {
  // On login, update last connection date
  Accounts.onLogin(function() {
    const user = Meteor.user();
    log.info('User logged-in: ', user.emails[0].address);
    Meteor.users.update(user._id, {$set: {lastConnection: new Date()}});
  });
  // When a failed login attempt is done, log information on origin and cause
  Accounts.onLoginFailure(function(obj) {
    log.warn('User log-in failed: ', obj.error.message);
    log.warn('IP:', obj.connection.clientAddress);
    if (obj.user) {
      log.warn('User:', obj.user.emails[0].address);
    } else {
      log.warn('No user information retrieved');
    }
  });
}
