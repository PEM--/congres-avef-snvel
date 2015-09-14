// Display BasicPages for the client

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Create a logger
const log = Logger.createLogger('Client BasicPages');

// BasicPages component
Rc.Client.BasicPages = createClass({
  displayName: 'Rc.Client.BasicPages',
  propTypes: {
    url: PropTypes.string.isRequired
  },
  mixins: [ReactMeteorData],
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const { url } = this.props;
    // Subscribe to get the content of the page
    const handle = Col.BasicPages.subPage(url);
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of the basic page
      item: Col.BasicPages.findOne({url})
    };
  },
  render() {
    log.debug('Rendering');
    const item = this.data.item;
    return (
      <div key={item.url} className='client basicpages ui container'>
        <h1>{item.title}</h1>
        <div dangerouslySetInnerHTML={{__html: item.content}} />
        <p><a href={FlowRouter.path('client-landingpage')}>Accueil</a></p>
      </div>
    );
  }
});

// Routing
// Isomorhic function
var setBasicPageRoutes = function() {
  let basicPages = Col.BasicPages.find().fetch();
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
  Col.BasicPages.subAllLinks(function() {
    setBasicPageRoutes();
  });
} else {
  setBasicPageRoutes();
}
