// Display Not found

// Not found is based on BasicPages
Tools.log.info('Router: global notfound');
FlowRouter.notFound = {
  action() {
    ReactLayout.render(Rc.MainLayout, {
      url: '/notfound',
      content: <Rc.Client.BasicPages url='notfound' />
    });
  }
};
