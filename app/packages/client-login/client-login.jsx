// Landing-page

// Create a logger
const log = Logger.createLogger('Client LogIn');

// Namespace flatteinng
const { Component, findDOMNode } = React;
const { ErrorMessage, AnimatedButton } = SD.Views.Client;

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
  constructor(props) {
    super(props);
    this.state = { error: '' };
    // Handle submit
    this.handleSubmit = (e) => {
      e.preventDefault();
      // Reset former error
      this.setState({error: ''});
      const email = findDOMNode(this.refs.email).value.trim().toLowerCase();
      const password = findDOMNode(this.refs.password).value.trim();
      log.debug('Submit with value', email);
      try {
        // Check user's imputs
        check({email, password}, SD.Structure.LoginSchema);
        log.info('Correct transmitted user\'s value');
        // Reset potential former error
        this.setState({error: ''});
        // Login
        Meteor.loginWithPassword(email, password, (error) => {
          if (error) {
            log.debug('Error while checking LogInForm values', error);
            this.setState({error: 'Email ou mot de passe incorrect'});
            return;
          }
          log.info('Logged In success');
          FlowRouter.go('/');
        });
      } catch (error) {
        log.debug('Error while checking LogInForm values', error);
        this.setState({error});
      } finally {
        // Empty password field in any case
        findDOMNode(this.refs.password).value = '';
      }
    };
    // Render the component
    this.render = () => {
      log.debug('Rendering LogInForm', this.state.error);
      return (
        <div className='column'>
          <h2>Connectez-vous à votre compte</h2>
          <form className='ui large form' onSubmit={this.handleSubmit}>
            <div className='ui stacked segment'>
              <div className='field'>
                <div className='ui left icon input'>
                  <i className='fa fa-envelope icon'></i>
                  <input type='text' name='email' ref='email' placeholder='Votre e-mail'/>
                </div>
              </div>
              <div className='field'>
                <div className='ui left icon input'>
                  <i className='fa fa-unlock icon'></i>
                  <input type='password' name='password' ref='password' placeholder="Votre mot de passe"/>
                </div>
              </div>
              <AnimatedButton anim='fade' icon='key' text='Je me connecte' />
            </div>
          </form>
          <ErrorMessage
            title='Votre authentification est incorrecte.'
            error={ErrorMessage.asProps(this.state.error)}
          />
          <div className='ui message'>
            Pas encore inscrit ? <a className='animated' href='/subscription'>Inscrivez-vous</a>
          </div>
        </div>
      );
    };
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
    ReactLayout.render(SD.Views.MainLayout, {
      content: <LogIn />
    });
  }
});

if (Meteor.isServer) {
  log.info(`Route ${ROUTE_NAME} declared`);
}
