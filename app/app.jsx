// Namespace flatteinng
const { PropTypes, createClass } = React;
const { TransitionSpring } = ReactMotion;

const RouteTransition = React.createClass({
  displayName: 'RouteTransition',
  propTypes: {
    url: PropTypes.string.isRequired
  },
  willEnter() {
    const { children } = this.props;
    return {
      handler: children,
      opacity: { val: 0 },
      scale: { val: 0.95 }
    };
  },
  willLeave(key, value) {
    return {
      handler: value.handler,
      opacity: { val: 0 },
      scale: { val: 0.95 }
    };
  },
  getEndValue() {
    const { children, url } = this.props;
    return {
      [url]: {
        handler: children,
        opacity: { val: 1 },
        scale: { val: 1 }
      }
    };
  },
  render() {
    return (
      <TransitionSpring
        endValue={this.getEndValue}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolated =>
          <div>
            {Object.keys(interpolated).map(key =>
              <div
                key={`${key}-transition`}
                style={{
                  position: 'absolute',
                  opacity: interpolated[key].opacity.val,
                  transform: `scale(${interpolated[key].scale.val})`
                }}
              >
               {interpolated[key].handler}
              </div>
            )}
          </div>
        }
      </TransitionSpring>
    );
  }
});

Rc.MainLayout = createClass({
  displayName: 'Rc.MainLayout',
  propTypes: {
    url: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
  },
  render() {
    return (
      <div className='ui container main-layout'>
        <RouteTransition url='legal'>
          {this.props.content}
        </RouteTransition>
        <Footer />
      </div>
    );
  }
});


let Demo = React.createClass({
  getInitialState() {
    return {
      blocks: {
        a: 'I am a',
        b: 'I am b',
        c: 'I am c',
      },
    };
  },

  getEndValue() {
    let blocks = this.state.blocks;
    let configs = {};
    Object.keys(blocks).forEach(key => {
      configs[key] = {
        height: {val: 50},
        opacity: {val: 1},
        text: blocks[key], // interpolate the above 2 fields only
      };
    });
    return configs;
  },

  willEnter(key) {
    return {
      height: {val: 50},
      opacity: {val: 1},
      text: this.state.blocks[key],
    };
  },

  willLeave(key, endValue, currentValue, currentSpeed) {
    if (currentValue[key].opacity.val === 0 && currentSpeed[key].opacity.val === 0) {
      return null; // kill component when opacity reaches 0
    }
    return {
      height: {val: 0},
      opacity: {val: 0},
      text: currentValue[key].text,
    };
  },

  handleClick(key) {
    let {...newBlocks} = this.state.blocks;
    delete newBlocks[key];
    this.setState({blocks: newBlocks});
  },

  render() {
    return (
      <TransitionSpring
        endValue={this.getEndValue}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {currentValue =>
          <div>
            {Object.keys(currentValue).map((key, i) => {
              let style = {
                height: currentValue[key].height.val,
                opacity: currentValue[key].opacity.val,
              };
              return (
                <div key={i} onClick={this.handleClick.bind(null, key)} style={style}>
                  {currentValue[key].text}
                </div>
              );
            })}
          </div>
        }
      </TransitionSpring>
    );
  }
});

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
            <Demo />
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

Rc.BasicPages = createClass({
  displayName: 'Rc.BasicPages',
  propTypes: {
    url: PropTypes.string.isRequired
  },
  mixins: [ReactMeteorData],
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const { url } = this.props;
    const handle = globalSubs.subscribe('single basic page', url);
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of the basic page
      item: Col.BasicPages.findOne({url})
    };
  },
  render() {
    // @TODO Set a spinner here
    // if (this.data.loading) { return <p>Loading</p>; }
    const item = this.data.item;
    return (
      <div key={item.url}>
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

var setBasicPageRoutes = function() {
  let basicPages = Col.BasicPages.find().fetch();
  basicPages.forEach(function(page) {
    FlowRouter.route(`/${page.url}`, {
      name: page.url,
      action() {
        ReactLayout.render(Rc.MainLayout, {
          url: `/${page.url}`,
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
      url: '/notfound',
      content: <Rc.BasicPages url='notfound' />
    });
  }
};
