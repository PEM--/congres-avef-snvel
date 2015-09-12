// Main layout of the client and admin applications

// Namespace flatteinng
const { PropTypes, createClass } = React;
const { log } = Tools;

// MainLayout component
Rc.MainLayout = createClass({
  displayName: 'Rc.MainLayout',
  propTypes: { content: PropTypes.object.isRequired },
  render() {
    log.debug('Rc.MainLayout rendering');
    return (
      <div className='main-layout'>
        {this.props.content}
        <Rc.Client.Footer />
      </div>
    );
  }
});
