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
                  {
                    !Meteor.user() ? '' :
                      <div className='ui message'>
                        Déjà inscrit ? <a className='animated' href='/login'>Connectez-vous</a>
                      </div>
                  }
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
if (Meteor.isServer) {
  log.info(`Route ${ROUTE_NAME} declared`);
}
