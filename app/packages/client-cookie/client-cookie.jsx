// Cookie disclaimer

// Create a logger
const log = Logger.createLogger('Cookie');

// Namespace flatteinng
const { Component } = React;

// Client only
// Create the component
class Cookie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.componentDidMount = () => {
      if (Meteor.isClient) {
        Tracker.autorun(() => {
          let isRouterStarted = Session.get(SD.Utils.IS_ROUTER_STARTED);
          if (isRouterStarted) {
            this.setState({show: true});
            log.debug('Router started');
          } else {
            this.setState({show: false});
            log.debug('Router stopped');
          }
        });
      }
    };
    this.render = () => {
      log.debug('Rendering');
      const { show } = this.state;
      return (
        <div className={`client cookie ${show ? 'show' : ''}`}>
          <div className="ui grid container">
            <div className="row">
              <div className="sixteen wide column">
                <div className="ui centered grid container">
                  <div className="row">
                    <div className="one wide column"><i className="fa fa-bullhorn fa-lg red"></i></div>
                    <div className="fifteen wide column">
                      <div className="rom"><span>En poursuivant votre navigation sur ce site, vous acceptez l'utilisation des cookies pour vous proposer des services et offres adaptés. </span></div>
                      <div className="row">
                        <button className="ui green tiny button">
                          <div className="visible content"><i className="fa fa-check"></i>J'ai compris</div>
                        </button><a href="/cookie" className="animated">En savoir plus...</a>
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
  }
}

SD.Views.Client.Cookie = Cookie;
