// Admin home page

// Namespace flatteinng
const { Component } = React;

// Create a logger
const log = Logger.createLogger('Admin Home');

// Admin home component
class Home extends Component {
  render() {
    log.debug('Rendering');
    return (
      <div className='home'>
        <p>
          Welcome in the admin interface
        </p>
      </div>
    );
  }
}

// Routing
const ROUTE_NAME = 'admin';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action(params) {
    log.info('Routing to', this.name);
    ReactLayout.render(Rc.Admin.Layout, {
      content: <Home />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
