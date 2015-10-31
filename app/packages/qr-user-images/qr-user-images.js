// Populate storage: create one image ofr each account
const QRimage = Npm.require('qr-image');
const addQrImage = user => {
  if (!user.profile || !user.profile.qrImage) {
    // Create a QR code that contains the unique user ID
    const qr = QRimage.imageSync(user._id, {
      'ec_level': 'H',
      type: 'svg',
      margin: 0,
      'parse_url': false
    });
    check(qr, String);
    // Store the image
    Meteor.users.update(user._id, {$set: {'profile.qrImage': qr}});
    console.log('QR code created for user', user.emails[0].address);
  }
};
// Check if one QR code is available for each user
let cursor = Meteor.users.find();
const users = cursor.fetch();
users.forEach(user => addQrImage(user));
// Observe collection for creating new QR code upon client creation
cursor.observe({
  added(user) {
    console.log('New user created', user.emails[0].address);
    addQrImage(user);
  }
});
