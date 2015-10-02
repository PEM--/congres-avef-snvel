// List of basic page links

// Namespace flatteinng
const { Component } = React;

// Basic page link
class BasicPagesLink extends Component {
  render() {
    log.debug('Rendering BasicPagesLink');
    const { url, title } = this.props;
    return <li className='item'><a href={url} className='animated'>{title}</a></li>;
  }
}

// List of basic page links
class BasicPagesLinkList extends SD.Views.BaseReactMeteor {
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const handle = SD.Structure.basicPages.subFooterLinks();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: handle.ready() ? SD.Structure.basicPages.collection.find(
        SD.Structure.basicPages.subs.FooterLinks.filter,
        SD.Structure.basicPages.subs.FooterLinks.options).fetch() : ''
    };
  }
  render() {
    log.debug('Rendering BasicPagesLinkList');
    const { loading, items } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    // Display links as a list
    const nodes = items.map(function(item) {
      return <BasicPagesLink
        key={item._id}
        url={item.url}
        title={item.title} />;
    });
    return (
      <div className='basicpages-links center aligned twelve wide tablet height wide computer column'>
        <ul className='ui horizontal divided list readability-black'>
          {nodes}
        </ul>
      </div>
    );
  }
}

SD.Views.Client.BasicPagesLinkList = BasicPagesLinkList;
