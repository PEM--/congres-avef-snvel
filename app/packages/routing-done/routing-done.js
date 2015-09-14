// Routing

// Create a logger
log = Tools.createLogger('Routing Done');

// Release router for routing once all routes are declared
FlowRouter.initialize();
log.info('Released');
