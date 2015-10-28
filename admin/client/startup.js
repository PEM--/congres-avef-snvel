sAlert.config({
  effect: 'slide',
  position: 'top-right',
  timeout: 2000,
  html: false,
  onRouteClose: false,
  stack: true,
  offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
  beep: false
  // examples:
  // beep: '/beep.mp3'  // or you can pass an object:
  // beep: {
  //     info: '/beep-info.mp3',
  //     error: '/beep-error.mp3',
  //     success: '/beep-success.mp3',
  //     warning: '/beep-warning.mp3'
  // }
});

AutoForm.setDefaultTemplate('semanticUI');
