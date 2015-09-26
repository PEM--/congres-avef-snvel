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
        <Rc.Client.Menu />
        <div className='main-layout'>
          {this.props.content}
          <Rc.Client.Footer />
        </div>
      </div>
    );
  }
}

// Export class
Rc.MainLayout = MainLayout;
