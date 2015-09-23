// Admin layout

// Namespace flatteinng
const { PropTypes, Component } = React;

// Create a logger
const log = Logger.createLogger('Admin Layout');

// Admin layout component
class Layout extends Component {
  displayName: 'Layout'
  propTypes: {
    content: PropTypes.object.isRequired
  }
  render() {
    log.debug('Rendering');
    const { content } = this.props;
    return <div className='admin'>{content}</div>;
  }
}

// Export class
Rc.Admin.Layout = Layout;
