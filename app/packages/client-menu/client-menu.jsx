// Menu

// Namespace flatteinng
const { Component } = React;

// Create a logger
const log = Logger.createLogger('Client Menu');

// Basic menu item
class BasicMenuItem extends Component {
  // Handle menu closing
  render() {
    const { closeMenu, href, faIcon, text } = this.props;
    return (
      <a href={href} onClick={closeMenu} className='active item'>
        <i className={`fa ${faIcon}`}></i>
        <span className='readability-black'>{text}</span>
      </a>);
  }
}

// Signon-Signoff item
class SignonSignoffItem extends Component {
  render() {
    const { currentUser, closeMenu } = this.props;
    return (
      <a href={currentUser ? '/logout' : '/login'} onClick={closeMenu} className='item'>
        <i className={`fa ${currentUser ? 'fa-unlock' : 'fa-user'}`}></i>
        <span className='readability-black'>{currentUser ? 'Déconnexion' : 'Connexion'}</span>
      </a>
    );
  }
}

// Admin access item
class AdminAccessIem extends Component {
  render() {
    const { closeMenu, currentUser } = this.props;
    const disableClass = currentUser ? '' : 'disabled';
    return (
      <a href='/admin' onClick={closeMenu} className={`item ${disableClass}`}>
        <i className='fa fa-cogs'></i>
        <span className='readability-black'>Administration</span>
      </a>
    );
  }
}

// Popup menu
class PopupMenu extends Rc.BaseReactMeteor {
  getMeteorData() {
    return { currentUser: Meteor.user() };
  }
  // Render the component
  render() {
    log.debug('Rendering PopupMenu');
    const { menuState, closeMenu } = this.props, { currentUser } = this.data;
    return (
      <aside className={`client ui vertical menu ${menuState ? 'open' : ''}`}>
        <i onClick={closeMenu} className='fa fa-close close fa-2x'></i>
        <SignonSignoffItem closeMenu={closeMenu} currentUser={currentUser} />
        <BasicMenuItem closeMenu={closeMenu} href='/' faIcon='fa-home' text='Accueil' />
        <BasicMenuItem closeMenu={closeMenu} href='/presentation' faIcon='fa-bullhorn' text='Présentation' />
        <BasicMenuItem closeMenu={closeMenu} href='/program' faIcon='fa-calendar' text='Programme' />
        <BasicMenuItem closeMenu={closeMenu} href='/subscription' faIcon='fa-ticket' text='Inscriptions' />
        <AdminAccessIem closeMenu={closeMenu} currentUser={currentUser} />
      </aside>
    );
  }
}

// Menu component
class Menu extends Component {
  constructor() {
    super();
    this.state = { popupMenuToggle: false };
    // Bound functions
    this.menuToggle = (e) => {
      e.preventDefault();
      log.debug('Toggling PopupMenu');
      this.setState({popupMenuToggle: !this.state.popupMenuToggle});
    };
    this.render = () => {
      log.debug('Rendering Menu');
      // Ease access to settings
      return (
        <nav className='client item'>
          <div className='navgrid ui centered grid container'>
            <div className='navitems row'>
              <div className='congress-title fourteen wide mobile eight wide tablet eight wide computer column'>
                <h1 className='readability-white'>
                  <a href='/'>CONGRÈS 2015</a>
                </h1>
              </div>
              <div className='brand seven wide tablet only seven wide computer only column'><a href='http://www.avef.fr' target='_blank'><img src='/img/avef.svg' alt='AVEF' className='svg'/></a><a href='http://www.snvel.fr' target='_blank'><img src='/img/snvel.svg' alt='SNVEL' className='svg'/></a></div>
              <button onClick={this.menuToggle} className='hamburger right aligned two wide mobile one wide tablet one wide computer column'><i className='fa fa-bars'></i></button>
              <PopupMenu closeMenu={this.menuToggle} menuState={this.state.popupMenuToggle}/>
            </div>
          </div>
        </nav>
      );
    };
  }
}

// Export class
Rc.Client.Menu = Menu;
