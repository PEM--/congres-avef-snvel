// Routing

// Routing bor BasicPages
// Isomorhic function
var setBasicPageRoutes = function() {
  let basicPages = SD.Structure.basicPages.collection.find().fetch();
  basicPages.forEach(function(page) {
    FlowRouter.route(`/${page.url}`, {
      name: page.url,
      action() {
        ReactLayout.render(SD.Views.MainLayout, {
          content: <SD.Views.Client.BasicPages url={page.url} />
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
  SD.Structure.basicPages.subAllPages(function() {
    setBasicPageRoutes();
    // Release router for routing once all routes are declared
    Meteor.startup(() => {
      FlowRouter.initialize();
      Session.set(SD.Utils.IS_ROUTER_STARTED, true);
      log.info('Released');
    });
  });
} else {
  setBasicPageRoutes();
}
