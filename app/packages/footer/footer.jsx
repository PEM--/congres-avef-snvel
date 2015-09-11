const { PropTypes, createClass } = React;

// Basic page links
const BasicPagesLinkItems = createClass({
  displayName: 'BasicPagesLinkItems',
  propTypes: {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  },
  render() { return <li><a href={this.props.url}>{this.props.title}</a></li>; }
});

// List of basic page links
const BasicPagesLinkList = createClass({
  displayName: 'BasicPagesLinkItems',
  mixins: [ReactMeteorData],
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const handle = globalSubs.subscribe('basic pages titles');
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: Col.BasicPages.find().fetch()
    };
  },
  render() {
    // Display links as a list
    let nodes = this.data.items.map(function(item) {
      return <BasicPagesLinkItems
        key={item._id}
        url={item.url}
        title={item.title} />;
    });
    return <ul>{nodes}</ul>;
  }
});

// Footer component
Footer = createClass({
  displayName: 'Footer',
  mixins: [ReactMeteorData],
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    let handle = globalSubs.subscribe('basic pages titles');
    return {
      // Use handle to show loading state
      basicPagesLoading: !handle.ready(),
      // Expose the list as an array
      basicPagesData: Col.BasicPages.find().fetch()
    };
  },
  // Render the component
  render() {
    // Ease access to settings
    const settings = Meteor.settings.public;
    return (
      <footer>
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
