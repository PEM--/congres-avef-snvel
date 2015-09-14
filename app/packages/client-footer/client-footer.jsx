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
        <section className='ui container'>
          <article>
            <BasicPagesLinkList />
          </article>
          <article>
            <SocialLinkList />
          </article>
        </section>
      </footer>
    );
  }
});
