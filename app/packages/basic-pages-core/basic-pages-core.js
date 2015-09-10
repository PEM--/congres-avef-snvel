// Basic pages
BasicPages = new Mongo.Collection('basicPages');

// Server only
if (Meteor.isServer) {
  console.log('Checking default BasicPages');
  // @TODO Set a SimpleSchema
  // @TODO Set DB versionning
  // @TODO Add marked for easing bage edition
  // Fill the links collection with a minimal set of links
  if (BasicPages.find().count() === 0) {
    console.log('Inserting default BasicPages');
    BasicPages.insert({
      title: 'Mentions légales', url: '/legal',
      content: '<p>Les mentions légales, personne ne les lit...</p>'
    });
    BasicPages.insert({
      title: 'Confidentialité', url: '/cookie',
      content: '<p>La confidentialité est un mythe...</p>'
    });
  } else {
    console.log('BasicPages filled');
  }
  // Publish all BasicPages
  console.log('Publish BasicPages');
  Meteor.publish('basicPages', function() {
    return BasicPages.find();
  });
}
