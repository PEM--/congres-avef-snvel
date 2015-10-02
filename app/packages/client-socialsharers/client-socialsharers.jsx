// A line of social sharer buttons

// Create a logger
const log = Logger.createLogger('Client SocialSharer');

// Namespace flatteinng
const { Component } = React;

// Sharer button
class SharerButton extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
    this.render = () => {
      log.debug('Rendering Social sharer');
      const { social } = this.props;
      const { dict } = this.data;
      const settings = Meteor.settings.public;
      let href = '';
      const sharerDict = _.findWhere(dict.socialSharers, {social});
      switch (social) {
      case 'Twitter':
        href = 'https://twitter.com/intent/tweet' +
          '?text=' + encodeURIComponent(sharerDict.message + ' : ') +
          '&url=' + settings.proxy.url + FlowRouter.current().path.slice(1) +
          '&via=' + sharerDict.account +
          '&source=' + sharerDict.account +
          '&related=' + sharerDict.account;
        break;
      case 'Facebook':
        href = 'https://www.facebook.com/sharer/sharer.php' +
          '?u=' + encodeURIComponent(settings.proxy.url + FlowRouter.current().path.slice(1)) +
          '&t=' + encodeURIComponent(sharerDict.message);
        break;
      case 'LinkedIn':
        href = 'https://www.linkedin.com/shareArticle' +
          '?mini=true' +
          '&url=' + encodeURIComponent(settings.proxy.url + FlowRouter.current().path.slice(1)) +
          '&title=' + encodeURIComponent(sharerDict.message) +
          '&summary=' + encodeURIComponent(dict.meta.description) +
          '&source=';
        break;
      default:
        log.error('Unknown social network', social);
      }
      return (
        <a href={href}
          target='_blank'
          className={`ui ${social.toLowerCase()} mini button sharerbutton`}
          title={`Partager sur ${social}`}
        >
          <i className={`fa fa-${social.toLowerCase()}`}></i>
          Partager sur {social}
        </a>
      );
    };
  }
}

// Social sharer compoment
class SocialSharers extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
    this.render = () => {
      log.debug('Rendering Social sharer');
      const { dict } = this.data;
      const nodes = dict.socialSharers.map(
        (sharer) => <SharerButton key={sharer.social} social={sharer.social} message={sharer.message} />
      );
      return (
        <section className='row'>
          <div className='sixteen wide column socialsharers'>
            {nodes}
          </div>
      </section>
      );
    };
  }
}

SD.Views.Client.SocialSharers = SocialSharers;
