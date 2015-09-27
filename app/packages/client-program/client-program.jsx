// Landing-page

// Create a logger
const log = Logger.createLogger('Client Program');

// Namespace flatteinng
const { Component } = React;

// Program page component
class Program extends Component {
  render() {
    log.debug('Rendering Program');
    return (
      <div className='client main-content ui grid program'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h1>Programme</h1>
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
const ROUTE_NAME = 'program';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Program />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
