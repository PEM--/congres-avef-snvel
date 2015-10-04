// Programs selection page

// Create a logger
const log = Logger.createLogger('Client Program');

// Namespace flatteinng
const { Component } = React;
const { MainLayout, BaseReactMeteor, Client } = SD.Views;
const { SocialSharers } = Client;
const { programs } = SD.Structure;

const REGION_CODES = [
  {room: 'Pays-Bas', region: 'NL'},
  {room: 'Amphithéatre', region: 'EU'},
  {room: 'Italie', region: 'IT'},
  {room: 'Espagne', region: 'ES'},
  {room: 'Grèce', region: 'GR'},
  {room: 'Genève', region: 'CH'},
  {room: 'Liège', region: 'BE'},
  {room: 'Rome', region: 'IT'},
  {room: 'Expo commerciale', region: 'UM'},
  {room: 'Dock Haussman', region: 'CN'},
  {room: 'Terrasse Hotel', region: 'BR'},
  {room: 'NA', region: 'CN'}
];

class Selector extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, type, unselectedValue, options } = this.props;
    log.debug('Rendering Selector', type, value);
    const nodes = options.map(
      (option) => <option
        key={option} value={option}>{option}
      </option>
    );
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
        log.debug('Received', value, text, $choice, this.props);
        this.props.handleChange(this.props.type, value);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    log.debug('Received props change', this.props.type, this.props.value, nextProps);
    // Force reset when parent changes the props
    if (nextProps.value === '') {
      $(`.dropdown.${this.props.type}`).dropdown('restore defaults');
    }
  }
}

class ProgramList extends Component {
  render() {
    const { selectedItems } = this.props;
    log.debug('selectedItems', selectedItems);
    const nodes = selectedItems.map((item, idx) => {
      return (
        <div className='item' key={idx}>
          <div className='ui image'>
            <div className='flags'>
              {
                item.rooms.map((room) => {
                  return (
                    <div key={room} className='svg-container'>
                      <img
                        src={`/img/${_.findWhere(REGION_CODES, {room}).region}.svg`}
                        alt={room} />
                    </div>
                    );
                })
              }
            </div>
          </div>
          <div className='content'>
            <h2>{item.session}</h2>
            <div className='description'>
              {
                item.conference === 'NA' ? '' :
                  <h3>{item.conference}</h3>
              }
              <p>
                <b>Horaires</b> : <time>{item.begin}</time>-<time>{item.end}</time>
              </p>
              <p>
                <b>Salle(s)</b> : <ul>
                  {
                    item.rooms.map((room) => <li key={room}>{room}</li>)
                  }
                </ul>
              </p>
              {
                item.moderator === 'NA' ? '' :
                  <p>
                    <b>Modérateur</b> : {item.moderator}
                  </p>
              }
              <p>
                <b>Intervenant(s)</b> : <ul>
                  {
                    item.speakers.map((speaker) => <li key={speaker}>{speaker}</li>)
                  }
                </ul>
              </p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <section className='row program-list'>
        <div className='sixteen wide column'>
          <div className="ui relaxed divided list">
            {nodes}
          </div>
        </div>
      </section>
    );
  }
}

// Program page component
class Program extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.handleChange = (type, value) => {
      log.debug('Received child change', type, value);
      switch (type) {
      case 'program':
        FlowRouter.setQueryParams({program: value, day: null, hour: null});
        break;
      case 'day':
        FlowRouter.setQueryParams({day: value, hour: null});
        break;
      case 'hour':
        FlowRouter.setQueryParams({hour: value});
        break;
      default:
        console.warn('Unknown type', type);
      }
    };
  }
  getMeteorData() {
    const handle = programs.subAll();
    const loading = !handle.ready();
    const items = loading ? [] : programs.collection.find().fetch();
    return { loading, items };
  }
  setRouterParams() {
    const { items } = this.data;
    this.programsOptions = _.chain(items)
      .pluck('programs').flatten().uniq()
      .value();
    const { program, day, hour } = this.props;
    if (program && this.programsOptions.find((item) => program === item)) {
      const reducedItemsOnProgram = _.filter(items,
        (item) => _.contains(item.programs, program));
      this.daysOptions = _.chain(reducedItemsOnProgram)
        .pluck('day').uniq().value();
      if (day && this.daysOptions.find((item) => day === item)) {
        const reducedItemsOnDays = _.where(reducedItemsOnProgram, {day});
        this.hoursOptions = _.chain(reducedItemsOnDays)
          .pluck('begin').uniq().value();
        if (hour && this.hoursOptions.find((item) => hour === item)) {
          this.selectedItems = _.where(reducedItemsOnDays, {begin: hour});
          log.debug('Selected items', this.selectedItems);
        } else if (Meteor.icClient) {
          FlowRouter.setQueryParams({hour: null});
        }
      } else if (Meteor.isClient) {
        FlowRouter.setQueryParams({day: null, hour: null});
      }
    } else if (Meteor.isClient) {
      FlowRouter.setQueryParams({program: null, day: null, hour: null});
    }
  }
  render() {
    log.debug('Rendering Program');
    const { loading, items } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    this.setRouterParams();
    const { program, day, hour } = this.props;
    return (
      <div className='client main-content ui grid program'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <h1>Programme</h1>
              <section className='row selectors'>
                <div className='sixteen wide column'>
                  <Selector
                    type='program'
                    value={program}
                    unselectedValue='Sélectionner un programme'
                    options={this.programsOptions}
                    handleChange={this.handleChange}
                  />
                  {
                    !program ? '' :
                      <Selector
                        type= 'day'
                        value={day}
                        unselectedValue='Sélectionner un jour'
                        options={this.daysOptions}
                        handleChange={this.handleChange}
                      />
                  }
                  {
                    !day ? '' :
                      <Selector
                        type='hour'
                        value={hour}
                        unselectedValue='Sélectionner un horraire de début'
                        options={this.hoursOptions}
                        handleChange={this.handleChange}
                      />
                  }
                </div>
              </section>
              {
                !hour ? '' :
                  <ProgramList selectedItems={this.selectedItems} />
              }
              {
                !hour ? '' :
                  <SocialSharers />
              }
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
  action(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <Program
          program={queryParams.program}
          day={queryParams.day}
          hour={queryParams.hour}
        />
    });
  }
});
if (Meteor.isServer) {
  log.info(`Route ${ROUTE_NAME} declared`);
}
