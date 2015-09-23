// Landing-page

// Create a logger
const log = Logger.createLogger('Client LandingPage');

// Namespace flatteinng
const { PropTypes, Component } = React;

// Landing page component
class LandingPage extends Component {
  displayName: 'LandingPage'
  render() {
    log.debug('Rendering');
    return (
      <div className="client main-content ui grid">
        <section className="client presentation row"><a href="#" className="sixteen wide column">
            <div className="ui centered stackable grid container">
              <div className="intro row">
                <div className="height wide mobile only six wide tablet only six wide computer only column">
                  <h1>Présentation</h1>
                </div>
                <div className="green height wide mobile only four wide tablet only four wide computer only column"><img src="img/dock_de_paris.svg" alt="Dock de Paris" className="dock-de-paris"/></div>
                <div className="six wide column tablet only computer only"></div>
              </div>
            </div>
          </a>
        </section>
        <section className="client program row">
          <a href="#" className="sixteen wide column">
            <div className="ui centered stackable grid container">
              <div className="intro row">
                <div className="sixteen wide column">
                  <h1>Programme</h1>
                  <div className="timeline"><img src="img/program.svg" alt="Déroulement du congrès" className="svg"/></div>
                </div>
              </div>
            </div>
          </a>
        </section>
        <section className="client subscription row"><a href="#" className="sixteen wide column">
            <div className="ui centered stackable grid container">
              <div className="intro row">
                <div className="sixteen wide column">
                  <h1>Inscriptions</h1>
                  <div className="subscription-types">
                    <div className="subscription-type"><img src="img/subscription_session.svg" alt="31 sessions" className="svg"/></div>
                    <div className="subscription-type"><img src="img/subscription_round_table.svg" alt="3 tables rondes" className="svg"/></div>
                    <div className="subscription-type"><img src="img/subscription_workshop.svg" alt="21 ateliers" className="svg"/></div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </section>
        <section className="client partners row"><a href="#" className="sixteen wide column">
            <div className="ui centered stackable grid container">
              <div className="intro row">
                <div className="sixteen wide column">
                  <h1>Partenaires &amp; exposants</h1>
                  <div href="http://www.avef.fr" target="_blank" className="logo"><img src="img/avef.svg" alt="AVEF" className="svg"/></div>
                  <div href="http://www.snvel.fr" target="_blank" className="logo"><img src="img/snvel.svg" alt="SNVEL" className="svg"/></div>
                </div>
              </div>
            </div>
          </a>
        </section>
      </div>
    );
  }
}

// Routing
FlowRouter.route('/', {
  name: 'client-landingpage',
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(Rc.MainLayout, {
      url: '/',
      content: <LandingPage />
    });
  }
});
log.info('Route / declared');
