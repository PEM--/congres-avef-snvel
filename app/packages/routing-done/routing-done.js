// Routing

// Create a logger
log = Tools.createLogger('Routing Done');

// Routing rules for client:
// Release router for routing once all routes are declared
if (Meteor.isClient) {
  FlowRouter.initialize();
  log.debug('Released');
}
