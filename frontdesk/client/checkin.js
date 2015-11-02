Template.checkin.helpers({
  isSessionSelected() {
    return Session.get('selectedSession') !== null;
  },
  sessionValue() {
    const selectedSession = Session.get('selectedSession');
    return SD.Structure.programs.collection.findOne(selectedSession);
  },
  hours() {
    const selectedSession = Session.get('selectedSession');
    const session = SD.Structure.programs.collection.findOne(selectedSession);
    return `${session.begin} - ${session.end}`;
  }
});

const scanError = (error) => {
  TTS.speak({
    text: 'Une erreur est survenue pendant le scanne.',
    locale: 'fr-FR'
  }, function() {}, function() {});
  sAlert.error('Erreur de scan: ' + error.toString());
  console.warn('Error during scan' + error.toString());
};

const scanWarning = (text) => {
  TTS.speak({
    text: text,
    locale: 'fr-FR'
  }, function() {}, function() {});
  sAlert.warning(text);
  console.warn('Error during scan' + error.toString());
};

const scanSuccess = (text) => {
  TTS.speak({
    text: text,
    locale: 'fr-FR'
  }, function() {}, function() {});
  sAlert.success(text);
};

Template.checkin.events({
  'click a.scan': function(e, t) {
    cordova.plugins.barcodeScanner.scan(
      function(result) {
        if (result.cancelled) {
          return scanError('Cancel');
        }
        if (result.format !== 'QR_CODE') {
          return scanError('Not a QR code');
        }
        // Find user
        const scannedUser = Meteor.users.findOne(result.text);
        if (!scannedUser) {
          return scanWarning('Votre inscription n\'est pas valide.');
        }
        // Check is user is an administrator
        if (Roles.userIsInRole(scannedUser._id, ['admin'])) {
          return scanSuccess('Utilisateur administrateur autorisé');
        }
        // Check if user owns the appropriate rights for this program
        const selectedSession = Session.get('selectedSession');
        const session = SD.Structure.programs.collection.findOne(selectedSession);
        if (!session) {
          return sAlert.error('La session ne peut-être retrouvée. Redémarrer et vérifier votre accès WiFi.');
        }
        const pricing = SD.Structure.pricings.collection.findOne({right: session.right});
        if (!pricing) {
          return sAlert.error('Le droit de cette session n\'est pas en base.');
        }
        const allUserSessions = SD.Structure.programs.collection.find({_id: {$in: scannedUser.profile.rights}}).fetch();
        const allUserRights = SD.Structure.pricings.collection.find({right: {$in: _.pluck(allUserSessions, 'right')}}).fetch();
        if (_.pluck(allUserRights, 'right').indexOf(pricing.right) === -1) {
          return scanWarning(scannedUser.profile.firstName + ' ' + scannedUser.profile.lastName + ', votre inscription ne vous permet pas l\'accès à cette session.');
        }
        scanSuccess(scannedUser.profile.firstName + ' ' + scannedUser.profile.lastName + ', bienvenu à la session : ' + session.session + '.');
        // Update user's presence
        Meteor.call('updatePresence', scannedUser, selectedSession, function(error) {
          if (error) {
            return sAlert.error('Une erreur en base est survenue.');
          }
        });
      },
      function(error) { scanError(error); }
    );
  }
});
