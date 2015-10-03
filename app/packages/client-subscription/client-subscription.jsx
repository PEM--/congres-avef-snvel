// Landing-page

// Create a logger
const log = Logger.createLogger('Client Subscription');

// Namespace flatteinng
const { Component } = React;

// Signup page component
class Subscription extends Component {
  render() {
    log.debug('Rendering Subscription');
    return (
      <div className='client main-content ui grid subscription'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h1>Inscription</h1>
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
const ROUTE_NAME = 'subscription';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Subscription />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
