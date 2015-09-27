// Display Not found

// Create a logger
const log = Logger.createLogger('Client NotFound');

// Not found is based on BasicPages
FlowRouter.notFound = {
  action() {
    Meteor.startup(() => {
      log.info('Routing to global notfound');
      ReactLayout.render(SD.Views.MainLayout, {
        url: '/notfound',
        content: <SD.Views.Client.BasicPages url='notfound' />
      });
    });
  }
};
log.info('Route nofound declared');
