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

Template.checkin.events({
  'click button.speech': function(e, t) {
    TTS.speak({
      text: 'Bonjour Monsieur',
      locale: 'fr-FR'
    }, function() {}, function() {});
  },
  'click button.scan': function(e, t) {
    $('body').css('background', 'violet');
    cordova.plugins.barcodeScanner.scan(
      function(result) {
        $('body').css('background', 'green')
          .append(`<p>Result: ${result.text}</p>`)
          .append(`<p>Format: ${result.format}</p>`)
          .append(`<p>Cancelled: ${result.cancelled}</p>`);
      },
      function(error) {
        return $('body').css('background', 'red');
      }
    );
  }
});
