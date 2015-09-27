// Landing-page

// Create a logger
const log = Logger.createLogger('Client LogOut');

// Namespace flatteinng
const { Component } = React;

// LogOut page component
class LogOut extends Component {
  render() {
    log.debug('Rendering LogOut');
    return (
      <div className='client main-content ui grid logout'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h1>Déconnexion</h1>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Routing
const ROUTE_NAME = 'logout';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(SD.Views.MainLayout, {
      content: <LogOut />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
