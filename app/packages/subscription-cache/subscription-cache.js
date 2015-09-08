console.log('Setting Subscription cache');
globalSubs = new SubsManager({
  // Maximum number of cached subscriptions
  cacheLimit: 10,
  // Expiration in minutes
  expireIn: 5
});
