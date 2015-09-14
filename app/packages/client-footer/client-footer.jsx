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
          <section className='ui grid'>
            <div className='four wide column'>&nbsp;</div>
            <article className='height wide column basic-pages-links'>
              <BasicPagesLinkList />
            </article>
            <article className='four wide column social-pages-links'>
              <SocialLinkList />
            </article>
          </section>
        </div>
      </footer>
    );
  }
});
