// Namespace flatteinng
const { PropTypes, createClass } = React;

Rc.LandingPage = createClass({
  displayName: 'Rc.LandingPage',
  render() {
    return (
      <div className='landing-page'>
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

FlowRouter.route('/', {
  name: 'home',
  action() {
    console.log('Home route');
    ReactLayout.render(Rc.MainLayout, {
      url: '/',
      content: <Rc.LandingPage />
    });
  }
});

Rc.AdminLayout = createClass({
  displayName: 'Rc.AdminLayout',
  propTypes: {
    content: PropTypes.string.isRequired
  },
  render() {
    console.log('Rc.AdminLayout rendering');
    const { content } = this.props;
    return <div>{content}</div>;
  }
});

Rc.Admin = {};

Rc.Admin.Home = createClass({
  displayName: 'Rc.Admin.Home',
  render() {
    console.log('Rc.Admin.Home rendering');
    return <p>Welcome in the admin interface</p>;
  }
});

FlowRouter.route('/admin', {
  action(params) {
    ReactLayout.render(Rc.AdminLayout, {
      content: <Rc.Admin.Home />
    });
  }
});

FlowRouter.notFound = {
  action() {
    ReactLayout.render(Rc.MainLayout, {
      url: '/notfound',
      content: <Rc.BasicPages url='notfound' />
    });
  }
};
