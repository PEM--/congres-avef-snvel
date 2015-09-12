// Namespace flatteinng
const { PropTypes, createClass } = React;

Rc.Admin.Layout = createClass({
  displayName: 'Rc.Admin.Layout',
  propTypes: {
    content: PropTypes.string.isRequired
  },
  render() {
    console.log('Rc.AdminLayout rendering');
    const { content } = this.props;
    return <div>{content}</div>;
  }
});

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

FlowRouter.notFound = {
  action() {
    ReactLayout.render(Rc.MainLayout, {
      url: '/notfound',
      content: <Rc.BasicPages url='notfound' />
    });
  }
};
