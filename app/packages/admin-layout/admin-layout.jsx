// Admin layout

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Admin layout component
Rc.Admin.Layout = createClass({
  displayName: 'Rc.Admin.Layout',
  propTypes: {
    content: PropTypes.string.isRequired
  },
  render() {
    console.log('Rc.Admin.Layout rendering');
    const { content } = this.props;
    return <div className='admin'>{content}</div>;
  }
});
