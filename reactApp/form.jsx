const { Component } = React;

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
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = (type, value) => {
      console.log('Received child change', type, value);
      switch (type) {
      case 'program':
        FlowRouter.setQueryParams({
          program: value, day: null, hour: null
        });
        break;
      case 'day':
        FlowRouter.setQueryParams({
          day: value, hour: null
        });
        break;
      case 'hour':
        FlowRouter.setQueryParams({
          hour: value
        });
        break;
      default:
        console.warn('Unknown type', type);
      }
    };
  }
  _setParams() {
    const { program, day, hour } = this.props;
    if (program && this.programs.find((item) => program === item)) {
      if (day && this.days.find((item) => day === item)) {
        if (hour && this.hours.find((item) => hour === item)) {
          //selectedHour = hour;
          console.log('Router state', program, day, hour);
        } else if (Meteor.isClient) {
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
    this.programs = ['AVEF', 'SNVEL', 'EBMS'];
    this.days = ['Mardi', 'Mercredi', 'Jeudi'];
    this.hours = ['8h-9h', '9h-10h', '10h-11h', '11h-12h', '12h-13h', '14h-15h', '15h-16h', '16h-17h', '17h-18h', '18h-19h', '19h-20h', '21h-22h', '22h-23h', '23h-24h'];
    this._setParams();
    const { program, day, hour } = this.props;
    console.log('program', program, 'day', day, 'hour', hour);
    return (
      <div className='client main-content ui grid program'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <Selector
                    key={program}
                    type='program'
                    value={program}
                    unselectedValue='Sélectionner un programme'
                    options={this.programs}
                    handleChange={this.handleChange}
                  />
                  {
                    !program ? '' :
                      <Selector
                        key={day}
                        type= 'day'
                        value={day}
                        unselectedValue='Sélectionner un jour'
                        options={this.days}
                        handleChange={this.handleChange}
                      />
                  }
                  {
                    !day ? '' :
                      <Selector
                        key={hour}
                        type='hour'
                        value={hour}
                        unselectedValue='Sélectionner un horraire'
                        options={this.hours}
                        handleChange={this.handleChange}
                      />
                  }
                  {
                    !hour ? '' :
                    <p>Available program</p>
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Views.Form = Form;

class FormLayout extends Component {
  render() {
    return (
      <div>
      <h1>Form</h1>
      {this.props.content}
      </div>
    );
  }
}

FlowRouter.route('/form', {
  action(params, queryParams) {
    ReactLayout.render(FormLayout, {
      content: <Views.Form
        program={queryParams.program}
        day={queryParams.day}
        hour={queryParams.hour}
      />
    });
  }
});
