globalSubs = new SubsManager({
  // Maximum number of cached subscriptions
  cacheLimit: 10,
  // Expiration in minutes
  expireIn: 5
});
Tools.log.info('SubscriptionCache set');
