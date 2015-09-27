// List of social links links

// Namespace flatteinng
const { Component } = React;

// Social link
class SocialLink extends Component {
  render() {
    log.debug('Rendering SocialLink');
    const { url, faIcon } = this.props;
    return <li className='item'><a href={url} target='_blank'><i className={`fa ${faIcon}`} target='_blank'></i></a></li>;
  }
}

// List of social links
class SocialLinkList extends SD.Views.BaseReactMeteor {
  // Subscribe to SocialLinks (reactive methods)
  getMeteorData() {
    const handle = SD.Structure.socialLinks.subAllLinks();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: SD.Structure.socialLinks.collection.find({},
        SD.Structure.socialLinks.subs.AllLinks.options).fetch()
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
      <div id='social-links' className='right aligned four wide column'>
        <ul className='ui horizontal divided list readability-black'>
          {nodes}
        </ul>
      </div>
    );
  }
}

SD.Views.Client.SocialLinkList = SocialLinkList;
