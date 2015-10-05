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


const HTML_TEMPLATE_TITLE = 'Veuillez confirmer votre email';
const HTML_TEMPLATE_ACTION_MESSAGE = "S'il vous plait, veuillez confirmer votre adresse en cliquant sur le lien ci-dessous.";
const HTML_TEMPLATE_ACTION_SUB_MESSAGE = "Nous avons besoin de vous envoyer des informations critiques sur le bon fonctionnement de notre service. Ce dernier ne peut fonctionner sans une adresse email valide.";
const HTML_TEMPLATE_ACTION_BUTTON = "Je confirme mon email";
// @TODO Add the specific server side route
const HTML_TEMPLATE_VALIDATE_URL = Meteor.settings.public.proxy.url;

let rawHtml = Assets.getText('templates/action.html');
s(rawHtml)
  .replaceAll('HTML_TEMPLATE_TITLE', HTML_TEMPLATE_TITLE)
  .replaceAll('HTML_TEMPLATE_ACTION_MESSAGE', HTML_TEMPLATE_ACTION_MESSAGE)
  .replaceAll('HTML_TEMPLATE_ACTION_SUB_MESSAGE', HTML_TEMPLATE_ACTION_SUB_MESSAGE)
  .replaceAll('HTML_TEMPLATE_ACTION_BUTTON', HTML_TEMPLATE_ACTION_BUTTON)
  .replaceAll('HTML_TEMPLATE_VALIDATE_URL', HTML_TEMPLATE_VALIDATE_URL)
  .value();


// SD.Views.Client.ColorTheme
//   brandColor: '#FF7100',
//   transBrandColor: 'rgba(255, 113, 0, .2)',
//   bgBrandColor: '#7bb4ab',
//   textColor: '#000000',
//   bgColor: '#7bb4ab',
//   waterColor: '#008DDA',
//   highwayColor: '#FF7100',
//   roadColor: '#FCA94F',
//   grassColor: '#007E5F'


const CSS_TEMPLATE_BACKGROUND_COLOR = '#FFF9E1';
const CSS_TEMPLATE_BORDER_COLOR = SD.Views.Client.ColorTheme.brandColor;

let rawCss = Assets.getText('templates/styles.css');
s(rawCss)
  .replaceAll('CSS_TEMPLATE_BACKGROUND_COLOR', CSS_TEMPLATE_BACKGROUND_COLOR)
  .replaceAll('CSS_TEMPLATE_BORDER_COLOR', CSS_TEMPLATE_BORDER_COLOR)
  .value();

// Inlined template
const juice = Npm.require('juice');
const inllinedHtml = juice.inlineContent(rawHtml, rawCss);

sendEmail = function() {
  Email.send({
    from: 'pemarchandet@gmail.com',
    to: 'pemarchandet@gmail.com',
    subject: 'Styled HTML',
    html: inllinedHtml
  });
};
