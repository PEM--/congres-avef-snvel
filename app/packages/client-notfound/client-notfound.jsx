// Display Not found

// Create a logger
const log = Logger.createLogger('Client NotFound');

// Not found is based on BasicPages
FlowRouter.notFound = {
  action() {
    ReactLayout.render(Rc.MainLayout, {
      url: '/notfound',
      content: <Rc.Client.BasicPages url='notfound' />
    });
  }
};
log.info('Route nofound declared');
