Footer = class Footer extends React.Component {
  render() {
    const settings = Meteor.settings.public;
    return (
      <footer>
        <section className='ui container'>
          <article>
            <ul>
              <li>Liens mentions légales</li>
              <li>Liens confidentialité</li>
            </ul>
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
};
