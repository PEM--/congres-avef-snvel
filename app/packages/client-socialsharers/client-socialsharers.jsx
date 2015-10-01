// A line of social sharer buttons

// Create a logger
const log = Logger.createLogger('Client SocialSharer');

// Namespace flatteinng
const { Component } = React;

// Sharer button
class SharerButton extends Component {
  render() {
    log.debug('Rendering Social sharer');
    const { social } = this.props;
    return (
      <button className={`ui ${social} mini button sharerbutton`}>
        <i className={`fa fa-${social}`}></i>
        Partager
      </button>
    );
  }
}

// Social sharer compoment
class SocialSharers extends Component {
  render() {
    log.debug('Rendering Social sharer');
    return (
      <section className='row'>
        <div className='sixteen wide column socialsharers'>
          <SharerButton social='twitter' />
          <SharerButton social='facebook' />
          <SharerButton social='linkedin' />
        </div>
    </section>
    );
  }
}

SD.Views.Client.SocialSharers = SocialSharers;
