// Routing

// Create a logger
log = Logger.createLogger('Routing Done');

// Release router for routing once all routes are declared
FlowRouter.initialize();
log.info('Released');

// Creating sitemaps for all routes
if (Meteor.isServer) {
  var allRoutes = _.filter(_.pluck(FlowRouter._routes, 'path'), function(route) {
    return !s.include(route, 'admin') && !s.include(route, 'notfound');
  });
  var pages = allRoutes.map(function(route) {
    log.info('Route', route, 'added to /sitemap.xml');
    return {page: route, lastmod: new Date()};
  });
  sitemaps.add('sitemap.xml', pages);
}
