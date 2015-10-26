AccountsTemplates.configure({
  confirmPassword: false,
  enablePasswordChange: false,
  forbidClientAccountCreation: true,
  sendVerificationEmail: false,
  homeRoutePath: '/admin',
  redirectTimeout: 2000,
});

AdminConfig = {
  name: 'My App',
  adminEmails: ['pemarchandet@gmail.com'],
  collections: {
  }
};

if (Meteor.isClient) {
  Accounts.onLogin(() => FlowRouter.go('/admin'));
  FlowRouter.route('/', {
    action() {
      BlazeLayout.render('login');
    }
  });
}
