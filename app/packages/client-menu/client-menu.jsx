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
  constructor(props) {
    super(props);
    this.handleLogout = (e) => {
      if (e) {e.preventDefault(); }
      log.info('User logged out');
      Meteor.logout();
      this.props.closeMenu(e);
    };
    this.render = () => {
      const { isLoggedIn, closeMenu } = this.props;
      return (
        <a href={isLoggedIn ? '#' : '/login'}
          onClick={isLoggedIn ? this.handleLogout : closeMenu}
          className='item'>
          <i className={`fa ${isLoggedIn ? 'fa-unlock' : 'fa-user'}`}></i>
          <span className='readability-black'>{isLoggedIn ? 'Déconnexion' : 'Connexion'}</span>
        </a>
      );
    };
  }
}

// Admin access item
class AdminAccessIem extends Component {
  render() {
    const { closeMenu, isAdminUser } = this.props;
    const disableClass = isAdminUser ? '' : 'disabled';
    return (
      <a href='/admin' onClick={closeMenu} className={`item ${disableClass}`}>
        <i className='fa fa-cogs'></i>
        <span className='readability-black'>Administration</span>
      </a>
    );
  }
}

// Popup menu
class PopupMenu extends SD.Views.BaseReactMeteor {
  getMeteorData() {
    const user = Meteor.user();
    return {
      isLoggedIn: user ? true : false,
      isAdminUser: user ? Roles.userIsInRole(user._id, 'admin') : false
    };
  }
  // Render the component
  render() {
    log.debug('Rendering PopupMenu');
    const { menuState, closeMenu } = this.props,
      { isLoggedIn, isAdminUser } = this.data;
    return (
      <aside className={`client ui vertical menu${menuState ? ' open' : ''}`}>
        <i onClick={closeMenu} className='fa fa-close close fa-2x'></i>
        <SignonSignoffItem closeMenu={closeMenu} isLoggedIn={isLoggedIn} />
        <BasicMenuItem closeMenu={closeMenu} href='/' faIcon='fa-home' text='Accueil' />
        <BasicMenuItem closeMenu={closeMenu} href='/presentation' faIcon='fa-bullhorn' text='Présentation' />
        <BasicMenuItem closeMenu={closeMenu} href='/program' faIcon='fa-calendar' text='Programme' />
        <BasicMenuItem closeMenu={closeMenu} href='/subscription' faIcon='fa-ticket' text='Inscriptions' />
        <AdminAccessIem closeMenu={closeMenu} isAdminUser={isAdminUser} />
      </aside>
    );
  }
}

// Site title
class SiteTitle extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
  }
  render() {
    const { dict } = this.data;
    log.debug('Rendering Site title');
    return (
      <h1 className='readability-white'>
        <a href='/'>{dict.shortTitle}</a>
      </h1>
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
      if (e) {e.preventDefault(); }
      log.debug('Toggling PopupMenu');
      this.setState({popupMenuToggle: !this.state.popupMenuToggle});
    };
    this.render = () => {
      log.debug('Rendering Menu');
      // Ease access to settings
      return (
        <div className='client menu ui fixed'>
          <nav className='client item'>
            <div className='navgrid ui centered grid container'>
              <div className='navitems row'>
                <div className='congress-title fourteen wide mobile eight wide tablet eight wide computer column'>
                  <SiteTitle />
                </div>
                <div className='brand seven wide tablet only seven wide computer only column'><a href='http://www.avef.fr' target='_blank'><img src='/img/avef.svg' alt='AVEF' className='svg'/></a><a href='http://www.snvel.fr' target='_blank'><img src='/img/snvel.svg' alt='SNVEL' className='svg'/></a></div>
                <button onClick={this.menuToggle} className='hamburger right aligned two wide mobile one wide tablet one wide computer column'><i className='fa fa-bars'></i></button>
              </div>
            </div>
          </nav>
          <PopupMenu closeMenu={this.menuToggle} menuState={this.state.popupMenuToggle}/>
        </div>
      );
    };
  }
}

// Export class
SD.Views.Client.Menu = Menu;
