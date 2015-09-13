// Footer

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Create a logger
const log = Tools.createLogger('Client Footer');

// Basic page links
const BasicPagesLinkItems = createClass({
  displayName: 'BasicPagesLinkItems',
  propTypes: {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  },
  render() {
    log.debug('Rendering BasicPagesLinkItems');
    const { url, title } = this.props;
    return <li><a href={url}>{title}</a></li>;
  }
});

// List of basic page links
const BasicPagesLinkList = createClass({
  displayName: 'BasicPagesLinkItems',
  mixins: [ReactMeteorData],
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const handle = Col.BasicPages.subAllLinks();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: Col.BasicPages.find().fetch()
    };
  },
  render() {
    log.debug('Rendering BasicPagesLinkList');
    // Display links as a list
    const nodes = this.data.items.map(function(item) {
      return <BasicPagesLinkItems
        key={item._id}
        url={item.url}
        title={item.title} />;
    });
    return <ul>{nodes}</ul>;
  }
});

// Footer component
Rc.Client.Footer = createClass({
  displayName: 'Footer',
  mixins: [ReactMeteorData],
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const handle = Col.BasicPages.subAllLinks();
    return {
      // Use handle to show loading state
      basicPagesLoading: !handle.ready(),
      // Expose the list as an array
      basicPagesData: Col.BasicPages.find().fetch()
    };
  },
  // Render the component
  render() {
    log.debug('Rendering Footer');
    // Ease access to settings
    const settings = Meteor.settings.public;
    return (
      <footer className='client'>
        <section className='ui container'>
          <article>
            <BasicPagesLinkList />
          </article>
          <article>
            <ul className='fa'>
              <li><a className='fa-facebook' href={settings.facebook.url} target='_blank'></a></li>
              <li><a className='fa-twitter' href={settings.twitter.url} target='_blank'></a></li>
              <li><a className='fa-envelope' href={settings.mailto.contact} target='_blank'></a></li>
            </ul>
          </article>
        </section>
      </footer>
    );
  }
});
