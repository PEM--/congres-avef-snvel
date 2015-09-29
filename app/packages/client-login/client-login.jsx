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
  constructor(props) {
    super(props);
    this.state = { error: '' };
    // Handle submit
    this.handleSubmit = (e) => {
      e.preventDefault();
      // Reset former error
      this.setState({error: ''});
      const email = React.findDOMNode(this.refs.email).value.trim().toLowerCase();
      const password = React.findDOMNode(this.refs.password).value.trim();
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
            throw error;
          }
          log.info('Logged In success');
          FlowRouter.go('/');
        });
      } catch (error) {
        log.debug('Error while checking LogInForm values', error);
        this.setState({error: error.message});
      } finally {
        // Empty password field in any case
        React.findDOMNode(this.refs.password).value = '';
      }
    };
    // Render the component
    this.render = () => {
      log.debug('Rendering LogInForm', this.state.error);
      const errorMessage = this.state.error !== '' ? (
        <div className='ui error message'>
          <div className='error content'>
            <div className='header'><i className='fa fa-warning'></i>Votre identification n'est pas correcte.</div>
            <p>{this.state.error}</p>
          </div>
        </div>
      ) : '';
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
              <button type='submit' className='ui fluid large submit button primary'>Connectez-vous</button>
            </div>
          </form>
          {errorMessage}
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
    log.info('Routing to', this.name);
    ReactLayout.render(SD.Views.MainLayout, {
      content: <LogIn />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
