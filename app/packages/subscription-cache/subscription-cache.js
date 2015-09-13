// Create a subscription cache

// Create a logger
const log = Tools.createLogger('MainLayout');

// Subscription cache with a cache limit and an expiration
globalSubs = new SubsManager({
  // Maximum number of cached subscriptions
  cacheLimit: 10,
  // Expiration in minutes
  expireIn: 5
});

log.info('Declared');
