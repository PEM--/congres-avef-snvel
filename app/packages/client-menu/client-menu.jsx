// Menu

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Create a logger
const log = Logger.createLogger('Client Menu');

// Popup menu
//class PopupMenu extends Rc.MeteorReactBaseComponent {
const PopupMenu = createClass({
  displayName: 'PopupMenu',
  propTypes: {
    menuState: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      menuState: false
    };
  },
  // Handle menu closing
  handleClose(e) {
    log.debug('Closing PopupMenu');
    e.preventDefault();
    this.props.closeMenu();
  },
  // Render the component
  render() {
    log.debug('Rendering PopupMenu');
    return (
      <aside className={`client ui vertical menu ${this.props.menuState ? 'open' : ''}`}>
        <i onClick={this.props.closeMenu} className="fa fa-close close fa-2x"></i>
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
    );
  }
});

// Menu component
const Menu = createClass({
  displayName: 'Menu',
  getInitialState() {
    return {
      popupMenuToggle: false
    };
  },
  menuToggle(e) {
    e.preventDefault();
    log.debug('Toggling PopupMenu');
    this.setState({popupMenuToggle: !this.state.popupMenuToggle});
  },
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
            <button onClick={this.menuToggle} className="hamburger right aligned two wide mobile one wide tablet one wide computer column"><i className="fa fa-bars"></i></button>
            <PopupMenu closeMenu={this.menuToggle} menuState={this.state.popupMenuToggle}/>
          </div>
        </div>
      </nav>
    );
  }
});

// Export class
Rc.Client.Menu = Menu;
