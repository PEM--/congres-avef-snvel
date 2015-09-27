// Main layout of the client and admin applications

// Namespace flatteinng
const { Component } = React;

// Create a logger
const log = Logger.createLogger('MainLayout');

// MainLayout component
class MainLayout extends Component {
  render() {
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
