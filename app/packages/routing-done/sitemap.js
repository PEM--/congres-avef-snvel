// Sitempas: Server only

// Creating sitemaps for all routes
const allRoutes = _.filter(_.pluck(FlowRouter._routes, 'path'), function(route) {
  // Filter unwanted toutes in SEO
  return (
    // Remove all admin routes
    !s.include(route, 'admin') &&
    // Remove not found route
    !s.include(route, 'notfound') &&
    // Remove all login, logout routes
    !s.include(route, 'login'));
});
const pages = allRoutes.map(function(route) {
  log.info('Route', route, 'added to /sitemap.xml');
  return {page: route, lastmod: new Date()};
});
sitemaps.add('sitemap.xml', pages);
