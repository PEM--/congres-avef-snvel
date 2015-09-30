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
        <section className={`client cookie${show ? 'show' : ''}`}>
          <div className='content'>
            <i className='fa fa-bullhorn fa-lg red'></i>
            <p className='header'>Cookie</p>
            <button className='ui green button'>
              <i className='fa fa-check'></i>
              J'ai compris
            </button>
            <a href='/cookie' className='animated'>Je souhaite en savoir plus...</a>
          </div>
        </section>
      );
    };
  }
}

SD.Views.Client.Cookie = Cookie;
