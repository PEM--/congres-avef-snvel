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
    const { value, type, unselectedValue, options } = this.props;
    const nodes = options.map(
      (option) => <option
        key={option} value={option}>{option}
      </option>
    );
    console.log('Rendering Selector', type, value);
    return (
      <select value={value} className={`ui fluid search dropdown ${type}`} style={{opacity: 0}}>
        <option value=''>{unselectedValue}</option>
        {nodes}
      </select>
    );
  }
  componentDidMount() {
    $(`.dropdown.${this.props.type}`).velocity({opacity: 1}).dropdown({
      onChange: (value, text, $choice) => {
        console.log('Received', value, text, $choice, this.props);
        this.props.handleChange(this.props.type, value);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('Received props change', this.props.type, this.props.value, nextProps);
    // Force reset when parent changes the props
    if (nextProps.value === '') {
      $(`.dropdown.${this.props.type}`).dropdown('restore defaults');
    }
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
    ReactLayout.render(MainLayout, {
      content: <Program />
    });
  }
});
if (Meteor.isServer) {
  log.info(`Route ${ROUTE_NAME} declared`);
}
