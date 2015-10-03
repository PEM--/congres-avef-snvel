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
    this.state = {
      selectedProgram: '',
      selectedDay: ''
    };
    this.onProgramChange = (e) => {
      console.log('Change', e.target.value, e.target);
      const $target = $(e.target);
      if ($target.hasClass('program')) {
        console.log('Changing program must invalidate day and hours');
        this.setState({
          selectedProgram: e.target.value,
          selectedDay: ''
        });
      } else if ($target.hasClass('day')) {
        console.log('Changing day must invalidate hours');
        this.setState({
          selectedDay: e.target.value
        });
      }
    };
    this.handleChange = (type, value) => {
      console.log('Received child change', type, value);
      switch (type) {
      case 'program':
        this.setState({selectedProgram: value, selectedDay: ''});
        break;
      case 'day':
        this.setState({selectedDay: value});
        break;
      default:
        console.warn('Unknown type', type);
      }
    };
  }
  render() {
    const programs = ['AVEF', 'SNVEL', 'EBMS'];
    const days = ['Mardi', 'Mercredi', 'Jeudi'];
    const { selectedProgram, selectedDay } = this.state;
    return (
      <div className='client main-content ui grid program'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <form onChange={this.onProgramChange} className='ui form'>
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
                  </form>
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
