// Footer

// Namespace flatteinng
const { Component } = React;

// Footer component
class Footer extends Component {
  // Render the component
  render() {
    log.debug('Rendering Footer');
    // Ease access to settings
    return (
      <footer className="client row">
        <div className="sixteen wide column">
          <div className="footer-grid ui centered stackable grid container">
            <div className="four wide computer only column"></div>
            <Rc.Client.BasicPagesLinkList />
            <Rc.Client.SocialLinkList />
          </div>
        </div>
      </footer>
    );
  }
}

// Export class
Rc.Client.Footer = Footer;
