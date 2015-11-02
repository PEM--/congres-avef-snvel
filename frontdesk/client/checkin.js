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
        sAlert.success('Result: ' + result.toString());
      },
      function(error) { scanError(error); }
    );
  }
});
