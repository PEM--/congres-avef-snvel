// Display BasicPages for the client

// Namespace flatteinng
const { Component } = React;

// Create a logger
const log = Logger.createLogger('Client BasicPages');

// BasicPages component
class BasicPages extends SD.Views.BaseReactMeteor {
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const { url } = this.props;
    // Subscribe to get the content of the page
    const handle = SD.Structure.basicPages.subWithUrl(url);
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of the basic page
      item: handle.ready() ? SD.Structure.basicPages.collection.findOne({url}) : ''
    };
  }
  render() {
    log.debug('Rendering BasicPages');
    const { loading, item } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    let nodes = (
      <div className='fadeIn'>
        <h1>{item.title}</h1>
        <div
          dangerouslySetInnerHTML={{__html: SD.Utils.prettyLink(marked(item.content))}}
        />
      </div>
    );
    return (
      <div key={this.props.url} className='client main-content ui grid basicpages'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  {nodes}
                </div>
              </section>
              <section className='row'>
                <nav className='sixteen wide column'>
                  <p>
                    Revenez à l'<a href={FlowRouter.path('client-landingpage')}>Accueil</a>.
                  </p>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Export class
SD.Views.Client.BasicPages = BasicPages;
