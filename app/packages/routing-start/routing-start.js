// Routing

// Create a logger
log = Tools.createLogger('Routing Start');

// Routing rules for client:

FlowRouter.wait();


// Block the routing untill all routes are defined (see routing-defined)
if (Meteor.isClient) {
  log.debug('Blocked');
}

// Routing rules for SSR
if (Meteor.isServer) {
  // Cache is set on 10s
  const TIME_IN_MS = 1000 * 10;
  FlowRouter.setPageCacheTimeout(TIME_IN_MS);
  // Defer Script loading
  FlowRouter.setDeferScriptLoading(true);
  log.info('SSR cache set');
}
