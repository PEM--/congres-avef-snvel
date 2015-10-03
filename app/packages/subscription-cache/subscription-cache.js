// Create a subscription cache

// ⚠️ https://github.com/kadirahq/subs-manager/issues/55

// Create a logger
const log = Logger.createLogger('Subscription cache');

// Subscription cache with a cache limit and an expiration
SD.Utils.globalSubs = new SubsManager({
  // Maximum number of cached subscriptions
  cacheLimit: 9999,
  // Expiration in minutes
  expireIn: 9999
});

log.info('Declared');
