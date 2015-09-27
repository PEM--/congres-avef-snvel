// Main layout of the client and admin applications

// Metatags: http://www.metatags.org

// Namespace flatteinng
const { Component } = React;

// Create a logger
const log = Logger.createLogger('MainLayout');

// MainLayout component
class MainLayout extends SD.Views.BaseReactMeteor {
  getMeteorData() {
    // Subscribe to get the dictionary content
    const handle = SD.Structure.dictionary.subAll();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of the basic page
      dict: handle.ready() ? SD.Structure.dictionary.collection.findOne() : ''
    };
  }
  render() {
    const { loading, dict } = this.data;
    if (!loading) {
      // Title
      DocHead.setTitle(dict.title);
      // Title for mobile bookmarks and shortcuts
      DocHead.addMeta({name: 'apple-mobile-web-app-title', content: dict.title});
      DocHead.addMeta({name: 'application-name', content: dict.title});
      // Colors for Windows phone and desktop
      DocHead.addMeta({name: 'msapplication-TileColor', content: dict.msTileColor});
      DocHead.addMeta({name: 'theme-color', content: dict.msTileColor});
      // Others meta tags
      for (const meta of [
        'description',
        'author',
        'copyright',
        'distribution',
        'language',
        'rating',
        'reply-to',
        'web-author'
      ]) {
        DocHead.addMeta({name: meta, content: dict[meta]});
      }
    }
    log.debug('Rendering');
    return (
      <div>
        <SD.Views.Client.Menu />
        <div className='main-layout'>
          {this.props.content}
          <SD.Views.Client.Footer />
        </div>
      </div>
    );
  }
}

// Export class
SD.Views.MainLayout = MainLayout;
