// Admin home page

// Namespace flatteinng
const { createClass } = React;

// Create a logger
const log = Logger.createLogger('Admin Home');

// Admin home component
Rc.Admin.Home = createClass({
  displayName: 'Rc.Admin.Home',
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
});

// Routing
const ROUTE_NAME = 'admin';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: 'admin',
  action(params) {
    log.info('Routing to', this.name);
    ReactLayout.render(Rc.Admin.Layout, {
      content: <Rc.Admin.Home />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
