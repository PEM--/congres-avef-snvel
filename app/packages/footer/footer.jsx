// Extrnal and internal links in the apps
Links = new Mongo.Collection('links');

// Server only
if (Meteor.isServer) {
  console.log('Checking default links');
  // @TODO Set a SimpleSchema
  // @TODO Set DB versionning
  // Fill the links collection with a minimal set of links
  if (Links.find().count() === 0) {
    console.log('Inserting default Links');
    Links.insert({title: 'Mentions légales', url: '/legal'});
    Links.insert({title: 'Confidentialité', url: '/cookie'});
  } else {
    console.log('Links collection filled');
  }
  // Publish all links
  console.log('Publish links');
  Meteor.publish('links', function() {
    return Links.find();
  });
}

let Spring = ReactMotion.Spring,
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
  // Subscribe to Links (reactive methods)
  getMeteorData() {
    var handle = globalSubs.subscribe('links');
    return {
      // Use handle to show loading state
      linksLoading: !handle.ready(),
      // Expose the list as an array
      linksData: Links.find().fetch()
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
            { this.data.linksLoading ?
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
