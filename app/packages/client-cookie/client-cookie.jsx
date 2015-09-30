// Cookie disclaimer

// Create a logger
const log = Logger.createLogger('Cookie');

// Namespace flatteinng
const { Component } = React;

// Client only
// Create the component
class Cookie extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.acceptCookie = () => {
      log.info('Accepted');
      this.cookie.accept();
      this.setState({show: false});
    };
    this.render = () => {
      log.debug('Rendering');
      const { show } = this.state;
      const { dict } = this.data;
      return (
        <div className={`client cookie ${show ? 'show' : ''}`}>
          <div className='ui grid container'>
            <div className='row'>
              <div className='sixteen wide column'>
                <div className='ui centered grid container'>
                  <div className='row'>
                    <div className='one wide column'><i className='fa fa-bullhorn fa-lg red'></i></div>
                    <div className='fifteen wide column'>
                      <div className='rom'><span>{dict.cookie.text}</span></div>
                      <div className='row'>
                        <button onClick={this.acceptCookie} className='ui green tiny button'>
                          <div className='visible content'><i className='fa fa-check'></i>J'ai compris</div>
                        </button>
                        <a href='/cookie' className='animated'>En savoir plus...</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    this.componentDidMount = () => {
      if (Meteor.isClient) {
        Tracker.autorun((computation) => {
          const isRouterStarted = Session.get(SD.Utils.IS_ROUTER_STARTED);
          this.cookie = SD.Utils.Cookie.get(this.data.dict);
          let showCookieDisclaimer = false;
          if (isRouterStarted) {
            if (!this.cookie.isAccepted()) {
              showCookieDisclaimer = true;
            }
          }
          this.setState({show: showCookieDisclaimer});
        });
      }
    };
  }
}

SD.Views.Client.Cookie = Cookie;
