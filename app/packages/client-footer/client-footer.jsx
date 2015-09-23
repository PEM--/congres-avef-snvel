// Footer

// Namespace flatteinng
const { PropTypes, Component } = React;

// Footer component
class Footer extends Component {
  displayName: 'Footer'
  // Render the component
  render() {
    log.debug('Rendering Footer');
    // Ease access to settings
    return (
      <footer className='violet row'>
        <div className='column'>
          <div className='ui container equal width stackable centered aligned grid'>
            <aside className='row'>
              <div className='grey column'>&nbsp;</div>
              <nav className='blue column'>
                <Rc.Client.BasicPagesLinkList />
              </nav>
              <nav className='yellow column'>
                <Rc.Client.SocialLinkList />
              </nav>
            </aside>
          </div>
        </div>
      </footer>
    );
  }
}

// Export class
Rc.Client.Footer = Footer;
