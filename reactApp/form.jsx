const { Component } = React;

class Selector extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { unselectedValue, options } = this.props;
    const nodes = options.map(
      (option) => <option
        key={option} value={option}>{option}
      </option>
    );
    return (
      <select value=''>
        <option value=''>{unselectedValue}</option>
        {nodes}
      </select>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProgram: ''
    };
  }
  onProgramChange(e) {
    console.log('Change', e.target.value);
    this.setState({selectedProgram: e.target.value});
  }
  render() {
    const options = ['AVEF', 'SNVEL', 'EBMS'];
    return (
      <form onChange={this.onProgramChange} className='ui form'>
        <Selector
          unselectedValue='Programme'
          options={options}
        />
        {
          this.state.selectedProgram === '' ? '' :
            <p>Program selected: {this.state.selectedProgram}</p>
        }
      </form>
    );
  }
}

Views.Form = Form;
