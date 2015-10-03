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
    this.onSelect = (e) => {
      log.debug('Selected', e);
      this.props.selectCb();
    };
    this.render = () => {
      const { type, unselectedValue, options } = this.props;
      const nodes = options.map(function(option) {
        return <option key={option} value={option}>{option}</option>;
      });
      return (
        <select value='' name={type} className={`ui fluid search dropdown ${type}`} style={{opacity: 0}}>
          <option value=''>{unselectedValue}</option>
          {nodes}
        </select>
      );
    };
  }
  componentDidMount() {
    $('.dropdown').velocity({opacity: 1}).dropdown();
  }
}

// Program page component
class Program extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = {showDaySelector: false};
    this.handleSelectedProgram = (e) => {
      log.debug('Program selected');
      this.setState({showDaySelector: true});
    };
    this.render = () => {
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
                      selectCb={this.handleSelectedProgram}
                    />
                    {
                      this.state.showDaySelector ?
                        <p>Select day</p> : ''
                    }
                  </div>
                </section>
                <SocialSharers />
              </div>
            </div>
          </div>
        </div>
      );
    };
  }
  getMeteorData() {
    const handle = programs.subAll();
    const loading = !handle.ready();
    const items = loading ? [] : programs.collection.find().fetch();
    const programsSelector = loading ? [] : _.uniq(_.flatten(_.pluck(items, 'programs')));
    return { loading, items, programsSelector };
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
