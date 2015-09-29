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
})

// Create default admin users
if (Meteor.isServer) {
  // Only create admin users if none has been created before
  if (Meteor.users.find().count() === 0) {
    Meteor.settings.admins.map(function(admin) {
      adminId = Accounts.createUser({
        email: admin.email,
        password: admin.password
      });
      Roles.addUsersToRoles(adminId, ['public', 'admin']);
      log.info('User created:', admin.email);
    });
  }
}

// Accounts options
Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});
