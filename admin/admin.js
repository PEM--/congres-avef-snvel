AccountsTemplates.configure({
  confirmPassword: false,
  enablePasswordChange: false,
  forbidClientAccountCreation: true,
  sendVerificationEmail: false,
  homeRoutePath: '/admin',
  redirectTimeout: 2000,
});

Users = Meteor.users;
basicPages = SD.Structure.basicPages.collection;
dictionary = SD.Structure.dictionary.collection;
discounts = SD.Structure.discounts.collection;
partners = SD.Structure.partners.collection;
products = SD.Structure.products.collection;
programs = SD.Structure.programs.collection;
socialLinks = SD.Structure.socialLinks.collection;
subscribers = SD.Structure.subscribers.collection;
texts = SD.Structure.texts.collection;

AdminConfig = {
  name: 'Congrès 2015',
  adminEmails: ['pemarchandet@gmail.com'],
  skin: 'purple',
  dashboard: {
    homeUrl: 'http://localhost:3000'
  },
  collections: {
    Users: {},
    basicPages: {
      icon: 'file-text-o',
      color: 'orange',
      tableColumns: [
        {label: 'Titre', name: 'title'}
      ]
    },
    dictionary: {},
    discounts: {},
    partners: {},
    products: {},
    programs: {},
    socialLinks: {},
    subscribers: {},
    texts: {
      icon: 'align-left',
      color: 'green'
    }
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
