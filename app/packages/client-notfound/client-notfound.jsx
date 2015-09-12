// Display Not found
// Not found is based on BasicPages
FlowRouter.notFound = {
  action() {
    ReactLayout.render(Rc.MainLayout, {
      url: '/notfound',
      content: <Rc.Client.BasicPages url='notfound' />
    });
  }
};
