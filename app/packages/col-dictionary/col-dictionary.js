// Create a logger
const log = Logger.createLogger('Collection Dictionary');

// Options used on the server and the client
let options = {
  name: 'Dictionary',
  logger: log,
  schema: {
    title: { type: String, label: 'Titre', max: 256 },
    shortTitle: { type: String, label: 'Titre court', max: 32 },
    msTileColor: { type: String, label: 'Couleur des tuiles Microsoft', min: 7, max: 7}
  }
};

// Client only
if (Meteor.isClient) {
  // Class Dictionnary
  class Dictionary extends Col.BaseCollection {}
  // Export class
  Col.dictionary = new Dictionary(options);
}

// Server only
if (Meteor.isServer) {
  // Extend option for the server
  options.default = [Meteor.settings.public.dictionary];
  // Class Dictionnary
  class Dictionary extends Col.ServerBaseCollection {}
  // Export class
  Col.dictionary = new Dictionary(options);
}



// // Collection helpers
// const METEOR_METHOD_NAME_SUB_ALL_LINKS = 'BasicPagesPageTitles';
// const METEOR_METHOD_NAME_SUB_PAGE = 'BasicPagesSingle';
// _.extend(Col.BasicPages, {
//   // Subscribe to all page's links
//   subAllLinks(cb) {
//     return globalSubs.subscribe(METEOR_METHOD_NAME_SUB_ALL_LINKS, cb);
//   },
//   // Subscribe to a single page
//   subPage(url, cb) {
//     return globalSubs.subscribe(METEOR_METHOD_NAME_SUB_PAGE, url, cb);
//   }
// });
//
// // Server only
// if (Meteor.isServer) {
//   // Fill the links collection with a minimal set of links
//   if (Col.BasicPages.find().count() !== 0) {
//     log.info('Already filled');
//   } else {
//     Col.BasicPages.insert({
//       title: 'Mentions légales', url: 'legal', order: 1, display: 'Footer',
//       content: marked('Les mentions légales, personne ne les lit...')
//     });
//     Col.BasicPages.insert({
//       title: 'Confidentialité', url: 'cookie', order: 2, display: 'Footer',
//       content: marked('La confidentialité est un mythe...')
//     });
//     Col.BasicPages.insert({
//       title: 'Not found', url: 'notfound', order: 3, display: 'Aucun',
//       content: marked('On ne trouve rien sans recherche...')
//     });
//     log.info('Filled with defaults');
//   }
//   // Publish all BasicPages without their content
//   Meteor.publish(METEOR_METHOD_NAME_SUB_ALL_LINKS, function(cb) {
//     check(cb, Match.Any);
//     return Col.BasicPages.find();
//   });
//   // Publish one BasicPage with its content
//   Meteor.publish(METEOR_METHOD_NAME_SUB_PAGE, function(url, cb) {
//     // check(url, String);
//     check(url, Col.SS.BasicPages.getDefinition('url').type);
//     check(cb, Match.Any);
//     return Col.BasicPages.find({url: url});
//   });
//   log.info('Published');
// }
