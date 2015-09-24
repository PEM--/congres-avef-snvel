// Admin layout

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Create a logger
const log = Logger.createLogger('Admin Layout');

// Admin layout component
const Layout = createClass({
  displayName: 'Layout',
  propTypes: {
    content: PropTypes.object.isRequired
  },
  render() {
    log.debug('Rendering');
    const { content } = this.props;
    return <div className='admin'>{content}</div>;
  }
});

// Export class
Rc.Admin.Layout = Layout;
