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

// Display landing page
Rc.Client.LandingPage = createClass({
  displayName: 'Rc.Client.LandingPage',
  render() {
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