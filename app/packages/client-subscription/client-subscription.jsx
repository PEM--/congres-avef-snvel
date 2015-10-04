// Landing-page

// Create a logger
const log = Logger.createLogger('Client Subscription');

// Namespace flatteinng
const { Component } = React;

class SubscribedScreen extends Component {
  render() {
    return (
      <div>
        <h2>Voici le contenu de votre inscription</h2>
        <p>
          <ul>
            <li>Un message de bienvenu</li>
            <li>Le QR code en pleine page</li>
            <li>Les droits souscrits</li>
            <li>Les conférences disponibles pour ces droits</li>
          </ul>
        </p>
      </div>
    );
  }
}

class Steps extends Component {
  render() {
    return (
      <div>
        <div className='ui four top attached steps'>
          <div className='completed step'>
            <i className='icon fa fa-pencil fa-2x'></i>
            <div className='content'>
              <div className='title'>Inscription</div>
              <div className='description'>Inscrivez-vous</div>
            </div>
          </div>
          <div className='active step'>
            <i className='icon fa fa-envelope-o fa-2x'></i>
            <div className='content'>
              <div className='title'>Validation</div>
              <div className='description'>Validez votre email</div>
            </div>
          </div>
          <div className='disabled step'>
            <i className='icon fa fa-check-square-o fa-2x'></i>
            <div className='content'>
              <div className='title'>Sélection</div>
              <div className='description'>Sélectionnez vos options</div>
            </div>
          </div>
          <div className='disabled step'>
            <i className='icon fa fa-credit-card fa-2x'></i>
            <div className='content'>
              <div className='title'>Paiement</div>
              <div className='description'>Effectuez votre paiement</div>
            </div>
          </div>
        </div>
        <div className='ui attached segment'>
          <p>
            Step 1 content
          </p>
        </div>
      </div>
    );
  }
}


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
                    Meteor.user() ? '' :
                      <div className='ui message'>
                        Déjà inscrit ? <a className='animated' href='/login'>Connectez-vous</a>
                      </div>
                  }
                  {
                    Meteor.user() ?
                      <SubscribedScreen /> :
                      <Steps />
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
  action(params, queryParams) {
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Subscription step={queryParams.step} />
    });
  }
});
if (Meteor.isServer) {
  log.info(`Route ${ROUTE_NAME} declared`);
}
