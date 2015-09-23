// Menu

// Namespace flatteinng
const { PropTypes, Component } = React;

// Menu component
class Menu extends Component {
  displayName: 'Menu'
  // Render the component
  render() {
    log.debug('Rendering Menu');
    // Ease access to settings
    return (
      <nav className="client item">
        <div className="navgrid ui centered grid container">
          <div className="navitems row">
            <div className="congress-title fourteen wide mobile eight wide tablet eight wide computer column">
              <h1 className="readability-white">
                <a href="/">CONGRÈS 2015</a>
              </h1>
            </div>
            <div className="brand seven wide tablet only seven wide computer only column"><a href="http://www.avef.fr" target="_blank"><img src="/img/avef.svg" alt="AVEF" className="svg"/></a><a href="http://www.snvel.fr" target="_blank"><img src="/img/snvel.svg" alt="SNVEL" className="svg"/></a></div>
            <div className="hamburger right aligned two wide mobile one wide tablet one wide computer column"><i className="fa fa-bars"></i>
              <aside className="client ui vertical menu">
                <i className="fa fa-close close fa-2x"></i>
                <a href="#" className="item">
                  <i className="fa fa-user"></i>
                  <span className="readability-black">Connexion</span>
                </a>
                <a href="#" className="item">
                  <i className="fa fa-unlock"></i>
                  <span className="readability-black">Déconnexion</span>
                </a>
                <a href="#" className="active item">
                  <i className="fa fa-home"></i>
                  <span className="readability-black">Accueil</span>
                </a>
                <a href="#" className="item">
                  <i className="fa fa-bullhorn"></i>
                  <span className="readability-black">Présentation</span>
                </a>
                <a href="#" className="item">
                  <i className="fa fa-calendar"></i>
                  <span className="readability-black">Programme</span>
                </a>
                <a href="#" className="item">
                  <i className="fa fa-ticket"></i>
                  <span className="readability-black">Inscriptions</span>
                </a>
                <a href="#" className="item">
                  <i className="fa fa-thumbs-o-up"></i>
                  <span className="readability-black">Partenaires &amp; exposants</span>
                </a>
              </aside>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

// Export class
Rc.Client.Menu = Menu;
