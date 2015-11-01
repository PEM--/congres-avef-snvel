Template.home.events({
  'click button.photo': function(e, t) {
    $('body').css('background', 'yellow');
    MeteorCamera.getPicture(function(error, data) {
      if (error) {
        return $('body').css('background', 'red');
      }
      $('body').css('background', 'green')
        .append(`<img src=${data}>`);
    });
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
