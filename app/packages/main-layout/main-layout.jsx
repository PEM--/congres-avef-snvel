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
      <div>
        <div className="client menu ui fixed">
          <Rc.Client.Menu />
        </div>
        <div className="main-layout">
          <div className="client main-content ui grid">
            {this.props.content}
          </div>
          <Rc.Client.Footer />
        </div>
      </div>
    );
  }
}

// Export class
Rc.MainLayout = MainLayout;
