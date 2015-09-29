// Landing-page

// Create a logger
const log = Logger.createLogger('Client LogIn');

// Namespace flatteinng
const { Component } = React;

// Already LoggedIn component
class AlreadyLoggedIn extends Component {
  render() {
    log.debug('Rendering AlreadyLoggedIn');
    return (
      <div className='column'>
        <h2>Déjà connecté</h2>
      </div>
    );
  }
}

// LogIn form component
class LogInForm extends Component {
  render() {
    log.debug('Rendering LogInForm');
    return (
      <div className='column'>
        <h2>Connectez-vous à votre compte</h2>
        <form className='ui large form'>
          <div className='ui stacked segment'>
            <div className='field'>
              <div className='ui left icon input'>
                <i className='fa fa-envelope icon'></i>
                <input type='text' name='email' placeholder='Votre e-mail'/>
              </div>
            </div>
            <div className='field'>
              <div className='ui left icon input'>
                <i className='fa fa-unlock icon'></i>
                <input type='password' name='password' placeholder="Votre mot de passe"/>
              </div>
            </div>
            <button className='ui fluid large submit button primary'>Connectez-vous</button>
          </div>
          <div className='ui error message'></div>
        </form>
        <div className='ui message'>
          Pas encore inscrit ? <a className='animated' href='/subscription'>Inscrivez-vous</a>
        </div>
      </div>
    );
  }
}

// LogIn page component
class LogIn extends SD.Views.BaseReactMeteor {
  getMeteorData() {
    return { currentUser: Meteor.user() };
  }
  render() {
    log.debug('Rendering LogIn');
    const content = this.data.currentUser ? <AlreadyLoggedIn /> : <LogInForm />;
    return (
      <div className='client main-content ui grid login'>
        <div className='row'>
          <div className='sixteen wide column'>
            <section className='ui grid container'>
              <div className='row'>
                {content}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

// Routing
const ROUTE_NAME = 'login';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(SD.Views.MainLayout, {
      content: <LogIn />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
