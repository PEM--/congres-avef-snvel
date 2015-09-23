// List of basic page links

// Namespace flatteinng
const { PropTypes, Component } = React;

// Basic page link
class BasicPagesLink extends Component {
  displayName: 'BasicPagesLink'
  propTypes: {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }
  render() {
    log.debug('Rendering BasicPagesLink');
    const { url, title } = this.props;
    return <li className="item"><a href={url} className="animated">{title}</a></li>;
  }
}

// List of basic page links
class BasicPagesLinkList extends Rc.MeteorReactBaseComponent {
  displayName: 'BasicPagesLinkList'
  mixins: [ReactMeteorData]
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const handle = Col.basicPages.subAllLinks();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: Col.basicPages.collection.find({
        display: {$in: ['Footer', 'Menu et Footer']}
      }, {
        sort: {order: 1}
      }).fetch()
    };
  }
  render() {
    log.debug('Rendering BasicPagesLinkList');
    // Display links as a list
    const nodes = this.data.items.map(function(item) {
      return <BasicPagesLink
        key={item._id}
        url={item.url}
        title={item.title} />;
    });
    return (
      <div className="basicpages-links center aligned twelve wide tablet height wide computer column">
        <ul className="ui horizontal divided list readability-black">
          {nodes}
        </ul>
      </div>
    );
  }
}

// Export class
Rc.Client.BasicPagesLinkList = BasicPagesLinkList;
