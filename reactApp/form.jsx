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
  componentWillReceiveProps(nextProps) {
    console.log('Received props change', this.props.type, this.props.value, nextProps);
    // Force reset when parent changes the props
    if (nextProps.value === '') {
      $(`.dropdown.${this.props.type}`).dropdown('restore defaults');
    }
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProgram: '',
      selectedDay: '',
      selectedHour: ''
    };
    this.handleChange = (type, value) => {
      console.log('Received child change', type, value);
      switch (type) {
      case 'program':
        this.setState({selectedProgram: value, selectedDay: '', selectedHour: ''});
        break;
      case 'day':
        this.setState({selectedDay: value, selectedHour: ''});
        break;
      case 'hour':
        this.setState({selectedHour: value});
        break;
      default:
        console.warn('Unknown type', type);
      }
    };
  }
  render() {
    const programs = ['AVEF', 'SNVEL', 'EBMS'];
    const days = ['Mardi', 'Mercredi', 'Jeudi'];
    const hours = ['8h-9h', '9h-10h', '10h-11h', '11h-12h', '12h-13h', '14h-15h', '15h-16h', '16h-17h', '17h-18h', '18h-19h', '19h-20h', '21h-22h', '22h-23h', '23h-24h'];
    const { selectedProgram, selectedDay, selectedHour } = this.state;
    return (
      <div className='client main-content ui grid program'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <Selector
                    type='program'
                    value={selectedProgram}
                    unselectedValue='Sélectionner un programme'
                    options={programs}
                    handleChange={this.handleChange}
                  />
                  {
                    selectedProgram === '' ? '' :
                      <Selector
                        type= 'day'
                        value={selectedDay}
                        unselectedValue='Sélectionner un jour'
                        options={days}
                        handleChange={this.handleChange}
                      />
                  }
                  {
                    selectedDay === '' ? '' :
                      <Selector
                        type='hour'
                        value={selectedHour}
                        unselectedValue='Sélectionner un horraire'
                        options={hours}
                        handleChange={this.handleChange}
                      />
                  }
                  {
                    selectedHour === '' ? '' :
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
