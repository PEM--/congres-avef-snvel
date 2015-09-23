// List of social links links

// Namespace flatteinng
const { PropTypes, Component } = React;

// Social link
class SocialLink extends Component {
  displayName: 'SocialLink'
  propTypes: {
    url: PropTypes.string.isRequired,
    faIcon: PropTypes.string.isRequired
  }
  render() {
    log.debug('Rendering SocialLink');
    const { url, faIcon } = this.props;
    return <li className="item"><a href={url}><i className={`fa ${faIcon}`} target='_blank'></i></a></li>;
  }
}

// List of social links
class SocialLinkList extends Rc.MeteorReactBaseComponent {
  displayName: 'SocialLinkList'
  // Subscribe to SocialLinks (reactive methods)
  getMeteorData() {
    const handle = Col.socialLinks.subAllLinks();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: Col.socialLinks.collection.find({}, {
        sort: {order: 1}
      }).fetch()
    };
  }
  render() {
    log.debug('Rendering SocialLinkList');
    // Display links as a list
    const nodes = this.data.items.map(function(item) {
      return <SocialLink
        key={item._id}
        url={item.url}
        faIcon={item.faIcon} />;
    });
    return (
      <div id="social-links" className="right aligned four wide column">
        <ul className="ui horizontal divided list readability-black">
          {nodes}
        </ul>
      </div>
    );
  }
}

// Export class
Rc.Client.SocialLinkList = SocialLinkList;
