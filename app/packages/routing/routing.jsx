// Server side only
console.log('Setting SSR cache');
// Cache is set on 10s
const TIME_IN_MS = 1000 * 10;
FlowRouter.setPageCacheTimeout(TIME_IN_MS);
// Defer Script loading
FlowRouter .setDeferScriptLoading(true);
