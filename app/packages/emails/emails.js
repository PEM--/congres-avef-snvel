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

// Flatten namespace
const { settings } = Meteor;
const { emailConfirmation } = settings.transactionalEmails;

let rawHtml = Assets.getText('templates/action.html');
rawHtml = s(rawHtml)
  .replaceAll('HTML_TEMPLATE_TITLE', emailConfirmation.title)
  .replaceAll('HTML_TEMPLATE_ACTION_MESSAGE', emailConfirmation.message)
  .replaceAll('HTML_TEMPLATE_ACTION_SUB_MESSAGE', emailConfirmation.subMessage)
  .replaceAll('HTML_TEMPLATE_ACTION_BUTTON', emailConfirmation.callToAction)
  .replaceAll('HTML_TEMPLATE_COMPANY', emailConfirmation.signature)
  .replaceAll('HTML_TEMPLATE_TWITTER_URL', emailConfirmation.twitterUrl)
  .replaceAll('HTML_TEMPLATE_TWITTER_ACCOUNT', emailConfirmation.twitterAccount)
  .replaceAll('HTML_TEMPLATE_FACEBOOK_URL', emailConfirmation.facebookUrl)
  .replaceAll('HTML_TEMPLATE_FACEBOOK_ACCOUNT', emailConfirmation.facebookAccount)
  .value();

let rawCss = Assets.getText('templates/styles.css');
rawCss = s(rawCss)
  .replaceAll('CSS_TEMPLATE_BACKGROUND_COLOR', SD.Views.Client.ColorTheme.invertedTextColor)
  .replaceAll('CSS_TEMPLATE_HEADER_COLOR', SD.Views.Client.ColorTheme.grassColor)
  .replaceAll('CSS_TEMPLATE_HEADER_FONT', SD.Views.Client.Fonts.header)
  .replaceAll('CSS_TEMPLATE_BORDER_COLOR', SD.Views.Client.Fonts.body)
  .replaceAll('CSS_TEMPLATE_PRIMARY_COLOR', SD.Views.Client.ColorTheme.brandColor)
  .replaceAll('CSS_TEMPLATE_FOOTER_COLOR', SD.Views.Client.ColorTheme.bgBrandColor)
  .value();

// Inlined template
const juice = Npm.require('juice');
const inlinedHtml = juice.inlineContent(rawHtml, rawCss);

// Configure accounts
Accounts.emailTemplates.from = Meteor.settings.mailjet.emailAccount;
Accounts.emailTemplates.verifyEmail.subject = () => Meteor.settings.transactionalEmails.emailConfirmation.title;
Accounts.emailTemplates.verifyEmail.html = (user, url) => {
  log.warn('Verify Email for', user, url);
  return s.replaceAll(
    inlinedHtml,
    'HTML_TEMPLATE_VALIDATE_URL',
    `${settings.public.proxy.url}confirm/${idx}`);
};

sendConfirmationEmail = function(to, idx) {
  Email.send({
    from: Meteor.settings.mailjet.emailAccount,
    to,
    subject: Meteor.settings.transactionalEmails.emailConfirmation.title,
    html: s.replaceAll(inlinedHtml, 'HTML_TEMPLATE_VALIDATE_URL', `${settings.public.proxy.url}confirm/${idx}`)
  });
};
