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
      <footer className='client'>
        <div className='ui container'>
          <section className='ui stackable three column grid'>
            <div className='column'>&nbsp;</div>
            <article className='basic-pages-links column'>
              <BasicPagesLinkList />
            </article>
            <article className='social-links column'>
              <SocialLinkList />
            </article>
          </section>
        </div>
      </footer>
    );
  }
});
