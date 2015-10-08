// Landing-page

// Namespace flatteinng
const { Component } = React;
const {
  SubscriptionStep1,
  SubscriptionStep2,
  SubscriptionStep3,
  SubscriptionStep4,
  SubscriptionReport,
  SocialSharers } = SD.Views.Client;

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
    const step = Number(this.props.step);
    const substep = this.props.substep;
    return (
      <div>
        <div className='ui four top attached steps'>
          {nodes}
        </div>
        <div className='ui attached segment'>
          {step === 1 ? <SubscriptionStep1 /> : ''}
          {step === 2 ? <SubscriptionStep2 /> : ''}
          {step === 3 ? <SubscriptionStep3 substep={substep} /> : ''}
          {step === 4 ? <SubscriptionStep4 /> : ''}
        </div>
      </div>
    );
  }
}

// Signup page component
class Subscription extends Component {
  render() {
    const { step, substep } = this.props;
    log.debug('Rendering Subscription', step, substep);
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
                </div>
              </section>
              <SocialSharers />
              <section className='row'>
                <div className='sixteen wide column'>
                  {
                    step === 'report' ?
                      <SubscriptionReport /> :
                      <Steps step={step} substep={substep} />
                  }
                </div>
              </section>
              <SocialSharers />
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
    log.debug(`Routing to ${ROUTE_NAME}`, params, queryParams);
    // Checking current step
    let step = queryParams.step;
    // Check provided step as URL
    if (!step || step < 1 || step > 4) {
      step = 1;
    }
    // Check user's connection
    const userId = Meteor.userId();
    if (userId) {
    // Check user's roles
      if (Roles.userIsInRole(userId, [
        'admin', 'subscribed'
      ])) {
        step = 'report';
      } else if (Roles.userIsInRole(userId, 'public')) {
        step = 3;
      } else if (Roles.userIsInRole(userId, 'step4')) {
        step = 4;
      }
    }
    // Redirect to the appropriate step
    if (Meteor.isClient) {
      FlowRouter.setQueryParams({step});
    }
    let substep = queryParams.substep;
    // Check send parameter
    if (substep && !(_.contains([
      'job',
      'subscriber',
      'program',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'product'
    ], substep))) {
      log.warn('Unrecognised substep', substep);
      substep = null;
    }
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Subscription step={step} substep={substep} />
    });
  }
});
if (Meteor.isServer) {
  log.info(`Route ${ROUTE_NAME} declared`);
}
