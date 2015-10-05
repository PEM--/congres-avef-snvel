// Define users, their schema and their roles

// Create a logger
const log = Logger.createLogger('Collection Users and Roless');

const AvailableRoles = [
  'public',
  'payment_pending',
  'subscribed',
  'admin'
];

SD.Structure.AvailableRoles = AvailableRoles;

// Schema for client and server
SD.Structure.SchemaUser = new SimpleSchema({
  emails: {
    type: Array,
    label: 'Emails'
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    label: 'Email',
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean,
    label: 'Email vérifié'
  },
  createdAt: {
    type: Date,
    label: 'Créé le',
    defaultValue: new Date()
  },
  modifiedAt: {
    type: Date,
    label: 'Modifié le',
    defaultValue: new Date()
  },
  services: {
    type: Object,
    label: 'Services d\'authentification',
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    label: 'Rôles',
    optional: true,
    defaultValue: ['public']
  },
  lastConnection: {
    type: Date,
    label: 'Dernière connexion réalisée le',
    defaultValue: new Date()
  }
});

Meteor.users.attachSchema(SD.Structure.SchemaUser);
log.info('Schema defined');

// A reduced Schema for Login validation purpose
SD.Structure.LoginSchema = new SimpleSchema({
  email: {
    label: 'Email',
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: {
    label: 'Mot de passe',
    type: String,
    min: 7, max: 256
  }
});

// Enhanced Schema for Account creation
SimpleSchema.messages({
  passwordsDiffer: 'La confirmation de mot de passe n\'est pas égale au mot de passe.'
});

SD.Structure.AccountCreationSchema = new SimpleSchema({
  loginSchema: { type: SD.Structure.LoginSchema },
  repassword: {
    label: 'Confirmation du mot de passe',
    type: String, min: 7, max: 256,
    custom: () => {
      if (this.field('password').value !== this.value) {
        return 'passwordsDiffer';
      }
      return null;
    }
  },
  userSubscriberSharedSchema: { type: SD.Structure.UserSubscriberSharedSchema }
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
// Client only
if (Meteor.isClient) {
  // When user logged in, we go back to the previous URL, he was visiting.
  Accounts.onLogin(function() {
    const path = FlowRouter.current().path;
    log.debug('Historizing current URL before login', path);
    // If user was visiting the login page directly, we orient it on the home page
    if (path === '/login') {
      FlowRouter.go('/');
    }
  });
}
// Server only
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
  // Method for creating account
  // @TODO Meteor.method('createAccount', email, password, repassword, firstname, lastname)
}
