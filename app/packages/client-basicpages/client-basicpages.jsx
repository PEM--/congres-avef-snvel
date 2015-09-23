// Display BasicPages for the client

// Namespace flatteinng
const { PropTypes } = React;

// Create a logger
const log = Logger.createLogger('Client BasicPages');

// BasicPages component
class BasicPages extends Rc.MeteorReactBaseComponent {
  displayName: 'BasicPages'
  propTypes: {
    url: PropTypes.string.isRequired
  }
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const { url } = this.props;
    // Subscribe to get the content of the page
    const handle = Col.basicPages.subWithUrl(url);
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of the basic page
      item: Col.basicPages.collection.findOne({url})
    };
  }
  render() {
    log.debug('Rendering: loading status', this.data.loading);
    const item = this.data.item;
    return (
      <div key={item.url} className='client basicpages ui container'>
        <h1>{item.title}</h1>
        <div dangerouslySetInnerHTML={{__html: item.content}} />
        <p><a href={FlowRouter.path('client-landingpage')}>Accueil</a></p>
      </div>
    );
  }
}

// Export class
Rc.Client.BasicPages = BasicPages;

// Routing
// Isomorhic function
var setBasicPageRoutes = function() {
  let basicPages = Col.basicPages.collection.find().fetch();
  basicPages.forEach(function(page) {
    FlowRouter.route(`/${page.url}`, {
      name: page.url,
      action() {
        log.info('Routing to', this.name);
        ReactLayout.render(Rc.MainLayout, {
          content: <Rc.Client.BasicPages url={page.url} />
        });
      }
    });
    log.info(`Route ${page.url} declared`);
  });
};
// For the BasicPages, the route cannot be determined before Meteor has
// subscribed to all data, which leads to these differences on the client
// and on the server.
if (Meteor.isClient) {
  Col.basicPages.subAllPages(function() {
    setBasicPageRoutes();
  });
} else {
  setBasicPageRoutes();
}
