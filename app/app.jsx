// Namespace flatteinng
const { PropTypes, createClass } = React;

Rc.Admin.Home = createClass({
  displayName: 'Rc.Admin.Home',
  render() {
    console.log('Rc.Admin.Home rendering');
    return <p>Welcome in the admin interface</p>;
  }
});

FlowRouter.route('/admin', {
  action(params) {
    ReactLayout.render(Rc.Admin.Layout, {
      content: <Rc.Admin.Home />
    });
  }
});
