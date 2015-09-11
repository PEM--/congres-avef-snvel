Rc = {};

if (Meteor.isServer) {
  console.log('Server checking', BasicPages.findOne());
}

Rc.MainLayout = React.createClass({
  displayName: 'Rc.MainLayout',
  render() {
    return (
      <div className='ui container main-layout'>
        <div>{this.props.content}</div>
        <Footer />
      </div>
    );
  }
});

Rc.LandingPage = React.createClass({
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

subscribeToBasiPages = function(context) {
  if (Meteor.isClient) {
    globalSubs.subscribe('basic pages titles');
  }
};

FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [subscribeToBasiPages],
  action() {
    console.log('Home route');
    ReactLayout.render(Rc.MainLayout, {
      content: <Rc.LandingPage />
    });
  }
});


Rc.BasicPages = React.createClass({
  displayName: 'Rc.BasicPages',
  propTypes: {
    content: React.PropTypes.string.isRequired,
  },
  render() {
    return (
      <div>
        <p>Basic Page: {this.props.content}</p>
        <p><a href={FlowRouter.path('home')}>Home</a></p>
        <p><a href='legal'>legal</a></p>
        <p><a href='cookie'>cookie</a></p>
        <p><a href='uknown'>unknow</a></p>
      </div>
    );
  }
});

Rc.AdminLayout = React.createClass({
  displayName: 'Rc.AdminLayout',
  render() {
    console.log('Rc.AdminLayout rendering');
    return (
      <div>{this.props.content}</div>
    );
  }
});

Rc.Admin = {};

Rc.Admin.Home = React.createClass({
  displayName: 'Rc.Admin.Home',
  render() {
    console.log('Rc.Admin.Home rendering');
    return (
      <p>Welcome in the admin interface</p>
    );
  }
});

FlowRouter.route('/admin', {
  action(params) {
    ReactLayout.render(Rc.AdminLayout, {
      content: <Rc.Admin.Home />
    });
  }
});

FlowRouter.route('/:slug', {
  action(params) {
    basicPage = BasicPages.findOne({url: params.slug});
    let content = basicPage ? params.slug : 'notfound';
    console.log('Basic page route', params.slug, content);
    ReactLayout.render(Rc.MainLayout, {
      content: <Rc.BasicPages content={content} />
    });
  }
});
