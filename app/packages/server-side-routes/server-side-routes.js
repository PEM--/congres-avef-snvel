// Create server side only routes

// Create a logger
const log = Logger.createLogger('Server Side Routes');

const bodyParser = Npm.require('body-parser');
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({extended: false}));

Meteor.startup(() => {
  // Create a route for all users with an un-verified email
  const users = Meteor.users._collection.find().fetch();
  users.forEach(function(user) {
    if (!Roles.userIsInRole(user._is, 'admin') && !user.emails[0].verified) {
      log.warn('Creating a server side route for', user.emails[0].address, user._id);
      // Picker.route(`confirm/${user._id}`, function(params, req, res, next) {
      //   Accounts
      // });
    }
  });
});

// Create route for newly created users
// Accounts.onCreateUser(function(options, user) {
//
// });


// Picker.route(SERVER_SIDE_ROUTE_COMMENTS, function(params, req, res, next) {
//   if (req.method === 'GET') {
//     res.end(JSON.stringify(data));
//   } else if (req.method === 'POST') {
//     data.push({
//       id: data.length + 1,
//       author: req.body.author,
//       text: req.body.text
//     });
//     res.end(JSON.stringify(data));
//   } else {
//     res.status(404).send('Not found');
//   }
// });
// log.info(SERVER_SIDE_ROUTE_COMMENTS, 'created');
