// Create server side only routes

// Create a logger
const log = Logger.createLogger('Server Side Routes');

const bodyParser = Npm.require('body-parser');
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({extended: false}));

const BRAINTREE_TOKEN_ROUTE = '/client_token';
Picker.route(BRAINTREE_TOKEN_ROUTE, function(params, req, res, next) {
  // Create a client token
  SD.Utils.braintreeGateway.clientToken.generate({}, (err, response) => {
    if (err) {
      log.warn('Error while creating client token', err);
      res.status(500).send('Internal server error');
      return;
    }
    log.info('Client token generated', response);
    // Send the client token
    res.send(response.clientToken);
  });
});
log.info(BRAINTREE_TOKEN_ROUTE, 'created');
