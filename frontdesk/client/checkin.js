Template.checkin.events({
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
