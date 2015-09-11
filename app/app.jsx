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
  //triggersEnter: [subscribeToBasiPages],
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
    url: React.PropTypes.string.isRequired
  },
  mixins: [ReactMeteorData],
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    let handle = globalSubs.subscribe('single basic page', this.props.url);
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of the basic page
      item: BasicPages.findOne({url: this.props.url})
    };
  },
  render() {
    if (Meteor.isServer) {
      Meteor.setTimeout(function() {
        console.log('Basic page defered data', this.data);
        console.log(BasicPages.findOne());
      }.bind(this), 100);
    }
    // @TODO Set a spinner here
    if (this.data.loading) { return <p>Loading</p>; }
    console.log('Basic page rendering', this.data);
    const item = this.data.item;
    return (
      <div>
        <h1>{item.title}</h1>
        <div dangerouslySetInnerHTML={{__html: item.content}} />
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

FlowRouter.route('/:url', {
  action(params) {
    basicPage = BasicPages.findOne({url: params.url});
    let url = basicPage ? params.url : 'notfound';
    console.log('Basic page route', params.url, url);
    ReactLayout.render(Rc.MainLayout, {
      content: <Rc.BasicPages url={url} />
    });
  }
});
