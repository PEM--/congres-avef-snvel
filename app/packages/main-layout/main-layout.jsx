// Main layout of the client and admin applications

// Namespace flatteinng
const { PropTypes, Component } = React;

// Create a logger
const log = Logger.createLogger('MainLayout');

// MainLayout component
class MainLayout extends Component {
  displayName: 'MainLayout'
  propTypes: { content: PropTypes.object.isRequired }
  render() {
    log.debug('Rendering');
    return (
      <div className='main-layout ui equal width stackable centered aligned padded grid'>
        <Rc.Client.Menu />
        <div className='red row'>
          <div className='column'>
            <div className='ui container'>
              {this.props.content}
            </div>
          </div>
        </div>
        <Rc.Client.Footer />
      </div>
    );
  }
}

// Export class
Rc.MainLayout = MainLayout;
