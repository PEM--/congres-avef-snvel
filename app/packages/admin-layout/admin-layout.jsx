// Admin layout

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Create a logger
const log = Logger.createLogger('Admin Layout');

// Admin layout component
Rc.Admin.Layout = createClass({
  displayName: 'Rc.Admin.Layout',
  propTypes: {
    content: PropTypes.string.isRequired
  },
  render() {
    log.debug('Rendering');
    const { content } = this.props;
    return <div className='admin'>{content}</div>;
  }
});
