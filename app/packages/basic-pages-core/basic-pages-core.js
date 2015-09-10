// Basic pages
BasicPages = new Mongo.Collection('basicPages');

// Server only
if (Meteor.isServer) {
  console.log('Checking default BasicPages');
  // @TODO Set a SimpleSchema
  // @TODO Add marked for easing bage edition
  // Fill the links collection with a minimal set of links
  if (BasicPages.find().count() !== 0) {
    console.log('BasicPages filled');
  } else {
    console.log('Inserting default BasicPages');
    BasicPages.insert({
      title: 'Mentions légales', url: '/legal', order: 1,
      content: marked('Les mentions légales, personne ne les lit...')
    });
    BasicPages.insert({
      title: 'Confidentialité', url: '/cookie', order: 2,
      content: marked('La confidentialité est un mythe...')
    });
  }
  console.log('Publish BasicPages');
  // Publish all BasicPages without their content
  Meteor.publish('basic pages titles', function() {
    return BasicPages.find({}, {sort: {order: 1}, fields: {content: 0}});
  });
  // Publish one BasicPage with its content
  Meteor.publish('single basic page', function(_id) {
    return BasicPages.find(_id, {fields: {content: 1}});
  });
}
