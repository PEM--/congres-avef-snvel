// Landing-page
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

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Landing page component
Rc.Client.LandingPage = createClass({
  displayName: 'Rc.Client.LandingPage',
  render() {
    Tools.log.debug('Rc.Client.Footer rendering');
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
