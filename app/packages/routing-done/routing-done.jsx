// Routing

// Create a logger
const log = Logger.createLogger('Routing Done');

// Routing bor BasicPages
// Isomorhic function
var setBasicPageRoutes = function() {
  let basicPages = Col.basicPages.collection.find().fetch();
  basicPages.forEach(function(page) {
    FlowRouter.route(`/${page.url}`, {
      name: page.url,
      action() {
        log.info('Routing to', this.name);
        ReactLayout.render(Rc.MainLayout, {
          content: <Rc.Client.BasicPages url={page.url} />
        });
      }
    });
    log.info(`Route ${page.url} declared`);
  });
};
// For the BasicPages, the route cannot be determined before Meteor has
// subscribed to all data, which leads to these differences on the client
// and on the server.
if (Meteor.isClient) {
  Col.basicPages.subAllPages(function() {
    setBasicPageRoutes();
    // Release router for routing once all routes are declared
    Meteor.startup(() => {
      FlowRouter.initialize();
      log.info('Released');
    });
  });
} else {
  setBasicPageRoutes();
}

// Creating sitemaps for all routes
if (Meteor.isServer) {
  const allRoutes = _.filter(_.pluck(FlowRouter._routes, 'path'), function(route) {
    return !s.include(route, 'admin') && !s.include(route, 'notfound');
  });
  const pages = allRoutes.map(function(route) {
    log.info('Route', route, 'added to /sitemap.xml');
    return {page: route, lastmod: new Date()};
  });
  sitemaps.add('sitemap.xml', pages);
}
