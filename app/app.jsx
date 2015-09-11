Rc = {};

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
    // @TODO Set a spinner here
    // if (this.data.loading) { return <p>Loading</p>; }
    let item = this.data.item;
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

var setBasicPageRoutes = function() {
  let basicPages = BasicPages.find().fetch();
  basicPages.forEach(function(page) {
    console.log('Registering page:', page.title);
    FlowRouter.route(`/${page.url}`, {
      action() {
        ReactLayout.render(Rc.MainLayout, {
          content: <Rc.BasicPages url={page.url} />
        });
      }
    });
  });
};

if (Meteor.isClient) {
  FlowRouter.wait();
  globalSubs.subscribe('basic pages titles', function() {
    setBasicPageRoutes();
    FlowRouter.initialize();
  });
} else {
  setBasicPageRoutes();
}

FlowRouter.notFound = {
  action() {
    ReactLayout.render(Rc.MainLayout, {
      content: <Rc.BasicPages url='notfound' />
    });
  }
};

// if (Meteor.isServer) {
//   var bodyParser = Meteor.npmRequire('body-parser');
//   Picker.middleware(bodyParser.json());
//   Picker.middleware(bodyParser.urlencoded({extended: false}));
//
//   var data = [
//     {id: 1, author: 'Pete Hunt', text: 'This is one comment'},
//     {id: 2, author: 'Jordan Walke', text: 'This is *another* comment'}
//   ];
//
//   Picker.route('/comments.json', function(params, req, res, next) {
//     if (req.method === 'GET') {
//       res.end(JSON.stringify(data));
//     } else if (req.method === 'POST') {
//       data.push({
//         id: data.length + 1,
//         author: req.body.author,
//         text: req.body.text
//       });
//       res.end(JSON.stringify(data));
//     } else {
//       res.status(404).send('Not found');
//     }
//   });
// }
