// Main layout of the client and admin applications

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Create a logger
const log = Tools.createLogger('MainLayout');

// MainLayout component
Rc.MainLayout = createClass({
  displayName: 'Rc.MainLayout',
  propTypes: { content: PropTypes.object.isRequired },
  render() {
    log.debug('Rendering');
    return (
      <div className='main-layout'>
        {this.props.content}
        <Rc.Client.Footer />
      </div>
    );
  }
});
