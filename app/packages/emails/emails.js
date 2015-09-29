// Email accounting and templating
// * Article: https://atmospherejs.com/yogiben/pretty-email
// * Article: http://themeteorchef.com/recipes/adding-a-beta-invitation-system-to-your-meteor-application/

// Create a logger
log = Logger.createLogger('Emails');

// Define Meteor's SMTP
Meteor.startup(() => {
  const settings = Meteor.settings.mailjet;
  process.env.MAIL_URL = `smtp://${settings.apiKey}:${settings.secretKey}@in-v3.mailjet.com:587/`;
  log.info('SMTP declared');
});

sendEmail = function() {
  Email.send({
    from: 'pemarchandet@gmail.com',
    to: 'pemarchandet@gmail.com',
    subject: 'Nouveau test en HTML, cette fois',
    text: `<h1>Test HTML</h1>
    <p>Petit test d\'émission directement de chez Mailjet.</p>`
  });
};
