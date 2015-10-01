// Landing-page

// Create a logger
const log = Logger.createLogger('Client Presentation');

// Namespace flatteinng
const { Component } = React;

// Presentation page component
class Presentation extends Component {
  render() {
    log.debug('Rendering Presentation');
    return (
      <div className='client main-content ui grid presentation'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h1>Présentation</h1>
                </div>
              </section>
              <SD.Views.Client.SocialSharers />
            </div>
          </div>
        </div>
        <SD.Views.Client.GoogleMap />
      </div>
    );
  }
}

// Routing
const ROUTE_NAME = 'presentation';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Presentation />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
