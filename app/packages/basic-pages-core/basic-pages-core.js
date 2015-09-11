// Basic pages
Col.BasicPages = new Mongo.Collection('basicPages');

// Server only
if (Meteor.isServer) {
  console.log('Checking default BasicPages');
  // @TODO Set a SimpleSchema
  // @TODO Add marked for easing bage edition
  // Fill the links collection with a minimal set of links
  if (Col.BasicPages.find().count() !== 0) {
    console.log('Col.BasicPages filled');
  } else {
    console.log('Inserting default Col.BasicPages');
    Col.BasicPages.insert({
      title: 'Mentions légales', url: 'legal', order: 1,
      content: marked('Les mentions légales, personne ne les lit...')
    });
    Col.BasicPages.insert({
      title: 'Confidentialité', url: 'cookie', order: 2,
      content: marked('La confidentialité est un mythe...')
    });
    Col.BasicPages.insert({
      title: 'Not found', url: 'notfound', order: 3,
      content: marked('On ne trouve rien sans recherche...')
    });

  }
  console.log('Publish Col.BasicPages');
  // Publish all BasicPages without their content
  Meteor.publish('basic pages titles', function() {
    return Col.BasicPages.find();
  });
  // Publish one BasicPage with its content
  Meteor.publish('single basic page', function(url) {
    // @TODO Add better checking once SimpleSchema is properly set
    check(url, String);
    return Col.BasicPages.find({url: url});
  });
}
