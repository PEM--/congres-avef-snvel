// List of social links links

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Social link
const SocialLink = createClass({
  displayName: 'SocialLink',
  propTypes: {
    url: PropTypes.string.isRequired,
    faIcon: PropTypes.string.isRequired
  },
  render() {
    log.debug('Rendering SocialLink');
    const { url, faIcon } = this.props;
    return <li><a className={`fa ${faIcon} fa-lg`} href={url} target='_blank'></a></li>;
  }
});

// List of social links
SocialLinkList = createClass({
  displayName: 'SocialLinkList',
  mixins: [ReactMeteorData],
  // Subscribe to SocialLinks (reactive methods)
  getMeteorData() {
    const handle = Col.SocialLinks.subAllLinks();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: Col.SocialLinks.find({}, {
        sort: {order: 1}
      }).fetch()
    };
  },
  render() {
    log.debug('Rendering SocialLinkList');
    // Display links as a list
    const nodes = this.data.items.map(function(item) {
      return <SocialLink
        key={item._id}
        url={item.url}
        faIcon={item.faIcon} />;
    });
    return <ul>{nodes}</ul>;
  }
});
