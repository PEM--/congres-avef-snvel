// Landing-page

// Create a logger
const log = Logger.createLogger('Client LogIn');

// Namespace flatteinng
const { Component } = React;

// LogIn page component
class LogIn extends Component {
  render() {
    log.debug('Rendering LogIn');
    if (Meteor.userId()) {
      return (<h1>Déjà connecté</h1>);
    }
    return (
      <div className='client main-content ui grid login'>
        <div className='row'>
          <div className='sixteen wide column'>
            <section className='ui grid container'>
              <div className='row'>
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
