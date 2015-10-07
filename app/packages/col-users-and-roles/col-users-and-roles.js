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
  },
  profile: {
    type: SD.Structure.UserSubscriberSharedSchema,
    label: 'Information utilisateur',
    optional: true
  }
});

Meteor.users.attachSchema(SD.Structure.SchemaUser);
log.info('Schema defined');

// A reduced Schema for Login validation purpose
LoginSchema = new SimpleSchema({
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

SD.Structure.LoginSchema = LoginSchema;

// Enhanced Schema for Account creation
SimpleSchema.messages({
  passwordsDiffer: 'La confirmation de mot de passe n\'est pas égale au mot de passe.'
});

SD.Structure.AccountCreationSchema = new SimpleSchema({
  login: { type: SD.Structure.LoginSchema },
  repassword: {
    label: 'Confirmation du mot de passe',
    type: String, min: 7, max: 256,
    custom: function() {
      if (this.field('login.password').value !== this.value) {
        return 'passwordsDiffer';
      }
      return null;
    }
  },
  userInfo: { type: SD.Structure.UserSubscriberSharedSchema }
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
  Accounts.onEmailVerificationLink(function(token, done) {
    logger.info('Received confirmation', token);
    done();
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
  Meteor.methods({
    createAccount(accountInfo, cb) {
      check(accountInfo, SD.Structure.AccountCreationSchema);
      check(cb, Match.Any);
      const _id = Accounts.createUser({
        email: accountInfo.login.email,
        password: accountInfo.login.password,
        profile: accountInfo.userInfo
      });
      Roles.addUsersToRoles(_id, ['public']);
      //Meteor.users._collection.update({_id}, {$set: {userinfo: accountInfo.userInfo}});
      log.info('User created:', accountInfo.login.email);
      this.unblock();
      Accounts.sendVerificationEmail(_id);
      log.info('Verification email sent for:', accountInfo.login.email);
      return true;
    },
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
      // If not found, check fistname and lastname
      if (!subscriber) {
        subscriber = SD.Structure.subscribers.collection.findOne({
          $and: [
            {'userInfo.lastname': user.profile.lastname},
            {'userInfo.firstname': user.profile.firstname}
          ]
        });
      }
      if (subscriber) {
        log.info('Found subscriber', subscriber);
        return subscriber;
      }
      return subscriber;
    },
    updateCity(fullCity, cb) {
      if (!this.userId) {
        throw new Meteor.Error('User retrieval', '403: Non authorized');
      }
      check(fullCity, SD.Structure.CitySchema);
      check(cb, Match.Any);
      const user = Meteor.users.findOne(this.userId);
      log.info('User', user.emails[0].address, 'updates', fullCity.postalcode, fullCity.city);
      Meteor.users._collection.update({_id: this.userId}, {
        $set: {
          'profile.postalcode': fullCity.postalcode,
          'profile.city': fullCity.city
        }
      });
      return true;
    }
  });
}
