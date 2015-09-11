let MainLayout = React.createClass({
  displayName: 'MainLayout',
  render() {
    return (
      <div className='ui container main-layout'>
        <div>{this.props.content}</div>
        <Footer />
      </div>
    );
  }
});

let LandingPage = React.createClass({
  displayName: 'LandingPage',
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
    ReactLayout.render(MainLayout, {
      content: <LandingPage />
    });
  }
});

let BasicPages = React.createClass({
  displayName: 'BasicPages',
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

FlowRouter.route('/:basicPageId', {
  action(params) {
    console.log('Basic page route', params.basicPageId);
    ReactLayout.render(MainLayout, {
      content: <BasicPages content={params.basicPageId} />
    });
  }
});
