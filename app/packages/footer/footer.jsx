Footer = React.createClass({
  render() {
    console.log('Footer', Meteor.settings.public);
    return (
      <footer>
        <div className='ui container'>
          <section>
            <ul>
              <li>Liens mentions légales</li>
              <li>Liens confidentialité</li>
            </ul>
          </section>
          <section>
            <ul>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Mail</li>
            </ul>
          </section>
        </div>
      </footer>
    );
  }
});
