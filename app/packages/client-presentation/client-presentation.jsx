// Presentation-page

// Create a logger
const log = Logger.createLogger('Client Presentation');

// Namespace flatteinng
const { Component } = React;
const { LineText, SocialSharers, ReactGoogleMap } = SD.Views.Client;

// Presentation page component
class Presentation extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
  }
  render() {
    log.debug('Rendering Presentation');
    const { loading, dict } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    return (
      <div className='client main-content ui grid presentation'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <LineText key='presentation-introduction' page='presentation' text='introduction' />
              </section>
              <SocialSharers />
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
        <ReactGoogleMap />
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <LineText key='presentation-focus' page='presentation' text='focus' />
              </section>
              <SocialSharers />
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
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Presentation />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
