// Main layout of the client and admin applications

// Namespace flatteinng
const { PropTypes, createClass } = React;

Rc.MainLayout = createClass({
  displayName: 'Rc.MainLayout',
  propTypes: { content: PropTypes.object.isRequired },
  render() {
    return (
      <div className='main-layout'>
        {this.props.content}
        <Rc.Client.Footer />
      </div>
    );
  }
});
