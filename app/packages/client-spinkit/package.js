Package.describe({
  name: 'pierreeric:client-spinkit',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:basereactmeteor'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-spinkit.jsx'
  ]);

// /
// ├── mixins
// │   ├── chasing-dots.less
// │   ├── circle.less
// │   ├── cube-grid.less
// │   ├── double-bounce.less
// │   ├── fading-circle.less
// │   ├── pulse.less
// │   ├── rotating-plane.less
// │   ├── three-bounce.less
// │   ├── trace-circle.less
// │   ├── wandering-cubes.less
// │   ├── wave.less
// │   └── wordpress.less
// ├── spinkit.less
// ├── standalone
// │   ├── chasing-dots.less
// │   ├── circle.less
// │   ├── cube-grid.less
// │   ├── double-bounce.less
// │   ├── fading-circle.less
// │   ├── pulse.less
// │   ├── rotating-plane.less
// │   ├── three-bounce.less
// │   ├── trace-circle.less
// │   ├── wandering-cubes.less
// │   ├── wave.less
// │   └── wordpress.less
// └── variables.less

});
