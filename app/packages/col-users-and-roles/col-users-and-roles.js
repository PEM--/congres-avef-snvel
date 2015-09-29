// Define users, their schema and their roles

// Create a logger
const log = Logger.createLogger('Collection Users and Roless');

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

// Schema for client and server
SD.Structure.SchemaUser = new SimpleSchema({
  emails: {
    type: Array,
    min: 1, max: 1
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    unique: true
  },
  'emails.$.verified': {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  roles: {
    type: [String],
    optional: true,
    default: ['public']
  }
});
Meteor.users.attachSchema(SD.Structure.SchemaUser);
