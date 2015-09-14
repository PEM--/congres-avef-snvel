// Footer

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Footer component
Rc.Client.Footer = createClass({
  displayName: 'Footer',
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
                <BasicPagesLinkList />
              </nav>
              <nav className='yellow column'>
                <SocialLinkList />
              </nav>
            </aside>
          </div>
        </div>
      </footer>
    );
  }
});
