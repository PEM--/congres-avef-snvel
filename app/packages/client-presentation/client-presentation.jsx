// Landing-page

// Create a logger
const log = Logger.createLogger('Client Presentation');

// Namespace flatteinng
const { Component } = React;

// Presentation page component
class Presentation extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
  }
  render() {
    log.debug('Rendering Presentation');
    const { dict } = this.data;
    return (
      <div className='client main-content ui grid presentation'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h1>Présentation</h1>
                  <h2>Introduction</h2>
                  <p>Le prochain Congrès <a href='http://www.avef.fr' className='animated'>AVEF</a> & <a href='http://www.avef.fr' className='animated'>SNVEL</a> aura lieu à Paris du 3 au 5 novembre 2015 et abordera des thématiques allant de la technique à l'actualité professionnelle.</p>
                  <p>Nous souhaitons faire de cet évènement un moment d’échanges fructueux permettant aux vétérinaires de s’informer sur les dernières innovations en matière de pratique équine mais également de faire le point sur les sujets politiques majeurs pour la Profession.</p>
                </div>
              </section>
              <SD.Views.Client.SocialSharers />
              <section className='row'>
                <div className='sixteen wide column'>
                  <h2>Dates</h2>
                  <p>
                    Du&nbsp;
                    <time dateTime={dict.startDate}>
                      {moment(dict.startDate).format('D MMMM YYYY')}
                    </time>
                    &nbsp;au&nbsp;
                    <time dateTime={dict.endDate}>
                      {moment(dict.endDate).format('D MMMM YYYY')}
                    </time>
                  </p>
                  <h2>Lieu</h2>
                  <p>
                    <address>
                      <a className='animated' href={dict.location.site} target='_blank'>{dict.location.name}</a><br/>
                      {dict.location.address.streetAddress} - {dict.location.address.postalCode} - {dict.location.address.addressLocality}
                    </address>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
        <SD.Views.Client.ReactGoogleMap />
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h2>Points forts</h2>
                </div>
              </section>
              <SD.Views.Client.SocialSharers />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Routing
const ROUTE_NAME = 'presentation';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Presentation />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
