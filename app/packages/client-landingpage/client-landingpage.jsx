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
      <div className='client landingpage'>
        <header>
          <section className='ui container'>
            <h1>Congrès AVEF - SNVEL</h1>
          </section>
        </header>
        <main>
          <section className='ui container'>
            <h1>Contenu</h1>
          </section>
        </main>
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
