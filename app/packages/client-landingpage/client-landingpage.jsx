// Landing-page

// Create a logger
const log = Tools.createLogger('Client LandingPage');

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Landing page component
Rc.Client.LandingPage = createClass({
  displayName: 'Rc.Client.LandingPage',
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
});

// Routing
FlowRouter.route('/', {
  name: 'client-landingpage',
  action() {
    ReactLayout.render(Rc.MainLayout, {
      url: '/',
      content: <Rc.Client.LandingPage />
    });
  }
});
log.info('Route / declared');
