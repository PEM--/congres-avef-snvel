// Namespace flatteinng
const { PropTypes, createClass } = React;

// Routing
FlowRouter.route('/admin', {
  action(params) {
    ReactLayout.render(Rc.Admin.Layout, {
      content: <Rc.Admin.Home />
    });
  }
});

// Admin home component
Rc.Admin.Home = createClass({
  displayName: 'Rc.Admin.Home',
  render() {
    Tools.log.debug('Rc.Admin.Home rendering');
    return (
      <div className='home'>
        <p>
          Welcome in the admin interface
        </p>
      </div>
    );
  }
});
