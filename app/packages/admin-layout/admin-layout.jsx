// Admin layout

// Namespace flatteinng
const { Component } = React;

// Create a logger
const log = Logger.createLogger('Admin Layout');

// Admin layout component
class Layout extends SD.Views.BaseReactMeteor {
  getMeteorData() {
    const user = Meteor.user();
    return {
      isAdminUser: user ? Roles.userIsInRole(user._id, 'admin') : false
    };
  }
  render() {
    log.debug('Rendering');
    if (Meteor.isClient && !this.data.isAdminUser) {
      FlowRouter.redirect('/login');
      return null;
    }
    const { content } = this.props;
    return (<div className='admin'>{content}</div>);
  }
}

// Export class
SD.Views.Admin.Layout = Layout;
