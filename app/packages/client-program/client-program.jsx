// Programs selection page

// Create a logger
const log = Logger.createLogger('Client Program');

// Namespace flatteinng
const { Component } = React;
const { MainLayout, BaseReactMeteor, Client } = SD.Views;
const { SocialSharers } = Client;
const { programs } = SD.Structure;

class Selector extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { type, unselectedValue, options } = this.props;
    const nodes = options.map(function(option) {
      return <option value={option}>{option}</option>;
    });
    return (
      <select name={type} className={`ui fluid search dropdown ${type}`} style={{opacity: 0}}>
        <option value=''>{unselectedValue}</option>
        {nodes}
      </select>
    );
  }
  componentDidMount() {
    $('.dropdown').velocity({opacity: 1}).dropdown();
  }
}

// Program page component
class Program extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    const handle = programs.subAll();
    const loading = !handle.ready();
    const items = loading ? [] : programs.collection.find().fetch();
    const programsSelector = loading ? [] : _.uniq(_.pluck(items, 'programs'));
    return { loading, items, programsSelector };
  }
  render() {
    log.debug('Rendering Program');
    const { loading, items, programsSelector } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    console.warn('*** Programs', programsSelector);
    return (
      <div className='client main-content ui grid program'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h1>Programme</h1>
                  <Selector
                    key='program'
                    type='program'
                    unselectedValue='Programme'
                    options={programsSelector}
                  />
                </div>
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
const ROUTE_NAME = 'program';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(MainLayout, {
      content: <Program />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
