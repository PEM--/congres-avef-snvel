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
          <section className='ui stackable grid'>
            <div className='column four wide '>&nbsp;</div>
            <article className='column height wide basic-pages-links'>
              <BasicPagesLinkList />
            </article>
            <article className='column four wide  social-pages-links'>
              <SocialLinkList />
            </article>
          </section>
        </div>
      </footer>
    );
  }
});
