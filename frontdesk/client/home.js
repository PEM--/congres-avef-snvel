Template.home.events({
  'click button.photo': function(e, t) {
    $('body').css('background', 'yellow');
    MeteorCamera.getPicture(function(error, data) {
      if (error) {
        return $('body').css('background', 'red');
      }
      $('body').append(`<img src=${data}>`);
    });
  }
});
