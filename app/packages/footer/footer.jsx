const Spring = ReactMotion.Spring,
  TransitionSpring = ReactMotion.Spring;

// Footer component
Footer = React.createClass({
  displayName: 'Footer',
  // Get Meteor's methods
  mixins: [ReactMeteorData],
  getInitialState() {
    return {open: false};
  },
  handleMouseDown() {
    this.setState({open: !this.state.open});
  },
  // Subscribe to BasicPages (reactive methods)
  getMeteorData() {
    const handle = globalSubs.subscribe('basicPages');
    return {
      // Use handle to show loading state
      basicPagesLoading: !handle.ready(),
      // Expose the list as an array
      basicPagesData: BasicPages.find().fetch()
    };
  },
  // Render the component
  render() {
    // Ease access to settings
    const settings = Meteor.settings.public;
    return (
      <footer>
        <section className='ui container'>
          <article>
            { this.data.basicPagesLoading ?
              (<p>Loading</p>) :
              (<ul>
                <li>Liens mentions légales</li>
                <li>Liens confidentialité</li>
              </ul>)
            }
          </article>
          <article>
            <ul className='fa'>
              <li><a className='fa-facebook' href={settings.facebook.url} target='_blank'></a></li>
              <li><a className='fa-twitter' href={settings.twitter.url} target='_blank'></a></li>
              <li><a className='fa-envelope' href={settings.mailto.contact} target='_blank'></a></li>
            </ul>
          </article>
        </section>
      </footer>
    );
  }
});
