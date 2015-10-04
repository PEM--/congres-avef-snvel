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
  getStepClass(templateStep) {
    const { step } = this.props;
    if (templateStep < step) {
      return 'completed';
    }
    if (templateStep > step) {
      return 'disabled';
    }
    return 'active';
  }
  render() {
    const templateSteps = [
      { icon: 'pencil', title: 'Inscription', description: 'Inscrivez-vous' },
      { icon: 'envelope-o', title: 'Validation', description: 'Validez votre email' },
      { icon: 'check-square-o', title: 'Sélection', description: 'Sélectionnez vos options' },
      { icon: 'credit-card', title: 'Paiement', description: 'Effectuez votre paiement' },
    ];
    const nodes = templateSteps.map((tplStep, idx) => {
      return (
        <div key={`step-${idx}`} className={`${this.getStepClass(idx + 1)} step`}>
          <i className={`icon fa fa-${tplStep.icon} fa-2x`}></i>
          <div className='content'>
            <div className='title'>{tplStep.title}</div>
            <div className='description'>{tplStep.description}</div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className='ui four top attached steps'>
          {nodes}
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
  _setParams() {
    // Check provided step as URL
    if (!this.props.step || this.props.step < 1 || this.props.step > 4) {
      FlowRouter.setQueryParams({step: 1});
    }
  }
  render() {
    log.debug('Rendering Subscription', this.props.step);
    this._setParams();
    const { step } = this.props;
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
                      <Steps step={step} />
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
