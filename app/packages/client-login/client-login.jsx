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
            <div className='ui middle aligned center aligned grid container'>
              <div className="column">
                <h2 className="ui image header">
                  <div className="content">
                    Connectez-vous à votre compte
                  </div>
                </h2>
                <form className="ui large form">
                  <div className="ui stacked segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="email" placeholder="E-mail address"/>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="fa fa-lock icon"></i>
                        <input type="password" name="password" placeholder="Password"/>
                      </div>
                    </div>
                    <div className="ui fluid large teal submit button">Login</div>
                  </div>

                  <div className="ui error message"></div>

                </form>

                <div className="ui message">
                  New to us? <a href="#">Sign Up</a>
                </div>
              </div>
            </div>
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
