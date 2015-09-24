// Landing-page

// Create a logger
const log = Logger.createLogger('Client LandingPage');

// Namespace flatteinng
const { PropTypes, createClass } = React;

const Presentation = createClass({
  displayNme: 'Presentation',
  render() {
    log.debug('Rendering Presentation');
    return (
      <section className="client presentation row">
        <a href="/presentation" className="sixteen wide column">
          <div className="ui centered stackable grid container">
            <div className="intro row">
              <div className="height wide mobile only six wide tablet only six wide computer only column">
                <h1>Présentation</h1>
              </div>
              <div className="green height wide mobile only four wide tablet only four wide computer only column"><img src="img/dock_de_paris.svg" alt="Dock de Paris" className="dock-de-paris"/></div>
              <div className="six wide column tablet only computer only"></div>
            </div>
          </div>
        </a>
      </section>
    );
  }
});

const Program = createClass({
  displayNme: 'Program',
  render() {
    log.debug('Rendering Program');
    return (
      <section className="client program row">
        <a href="/program" className="sixteen wide column">
          <div className="ui centered stackable grid container">
            <div className="intro row">
              <div className="sixteen wide column">
                <h1>Programme</h1>
                <div className="timeline"><img src="img/program.svg" alt="Déroulement du congrès" className="svg"/></div>
              </div>
            </div>
          </div>
        </a>
      </section>
    );
  }
});

const Subscription = createClass({
  displayNme: 'Subscription',
  render() {
    log.debug('Rendering Subscription');
    return (
      <section className="client subscription row">
        <a href="/subscription" className="sixteen wide column">
          <div className="ui centered stackable grid container">
            <div className="intro row">
              <div className="sixteen wide column">
                <h1>Inscriptions</h1>
                <div className="subscription-types">
                  <div className="subscription-type"><img src="img/subscription_session.svg" alt="31 sessions" className="svg"/></div>
                  <div className="subscription-type"><img src="img/subscription_round_table.svg" alt="3 tables rondes" className="svg"/></div>
                  <div className="subscription-type"><img src="img/subscription_workshop.svg" alt="21 ateliers" className="svg"/></div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </section>
    );
  }
});

const Partner = createClass({
  displayNme: 'Partner',
  propTypes: {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  },
  render() {
    const { url, title, src } = this.props;
    return (
      <a href={url} target="_blank" className="logo">
        <img src={src} alt={title} className="svg"/>
      </a>
    );
  }
});

const PartnerList = createClass({
  displayNme: 'PartnerList',
  mixins: [ReactMeteorData],
  // Subscribe to Partners (reactive methods)
  getMeteorData() {
    const handle = Col.partners.subAll();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose the list as an array
      items: Col.partners.collection.find({},
        Col.partners.subs.All.options).fetch()
    };
  },
  render() {
    log.debug('Rendering PartnerList');
    const nodes = this.data.items.map(function(item) {
      return <Partner
        key={item._id}
        title={item.title}
        url={item.url}
        src={item.src} />;
    });
    return (
      <section className="client partners row">
        <div className="sixteen wide column">
          <div className="ui centered stackable grid container">
            <div className="intro row">
              <div className="sixteen wide column">
                <h1>Partenaires & exposants</h1>
                <div>
                  {nodes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

// Landing page component
const LandingPage = createClass({
  displayName: 'LandingPage',
  render() {
    log.debug('Rendering LandingPage');
    return (
      <div className="client main-content ui grid">
        <Presentation />
        <Program />
        <Subscription />
        <PartnerList />
      </div>
    );
  }
});

// Routing
Meteor.startup(() => {
  FlowRouter.route('/', {
    name: 'client-landingpage',
    action() {
      log.info('Routing to', this.name);
      ReactLayout.render(Rc.MainLayout, {
        url: '/',
        content: <LandingPage />
      });
    }
  });
  log.info('Route / declared');
});
