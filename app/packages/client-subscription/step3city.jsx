// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStepCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '', postalcode: props.postalcode, city: props.city
    };
    this.onChange = (e) => {
      if (e.target) {
        console.log(e.target.value, e.target);
        this.setState({[e.target.getAttribute('name')]: e.target.value});
      }
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      log.info('Valid forms', this.state.city, this.state.postalcode);
      try {
        const fullCity = {
          postalcode: this.state.postalcode,
          city: this.state.city
        };
        check(fullCity, SD.Structure.CitySchema);
        // Insert data on base if different from props
        if (this.props.postalcode !== this.state.postalcode ||
            this.props.postalcode !== this.state.postalcode) {
          Meteor.call('updateCity', fullCity, (error) => {
            if (error) {
              log.debug('Error while checking SubscriptionStep1 values', error);
              this.setState({error});
            }
          });
        }
        // Reset potential displayed error
        this.setState({error: ''});
        // Go to next inner step
        let substep = 'job';
        // User was found as a subscriber
        if (this.props.avef || this.props.snvel) {
          substep = 'subscriber';
        }
        FlowRouter.go(`/subscription?step=3&substep=${substep}`);
      } catch (error) {
        log.debug('Error while checking InnerStepCity values', error);
        this.setState({error});
      }
    };
  }
  render() {
    log.info('Rendering InnerStepCity', this.state.postalcode, this.state.city);
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Identité complémentaire</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              <div className='six wide field'>
                <label>Code postal</label>
                <div className='ui left icon input'>
                  <i className='fa fa-home icon'></i>
                  <input
                    type='text'
                    ref='postalcode'
                    value={this.state.postalcode}
                    onChange={this.onChange}
                    name='postalcode'
                    ref='postalcode'
                    placeholder='Code postal'
                  />
                </div>
              </div>
              <div className='ten wide field'>
                <label>Ville</label>
                <div className='ui left icon input'>
                  <i className='fa fa-home icon'></i>
                  <input
                    type='text'
                    ref='city'
                    value={this.state.city}
                    onChange={this.onChange}
                    name='city'
                    ref='city'
                    placeholder='Ville'
                  />
                </div>
              </div>
            </div>
            <AnimatedButton icon='arrow-right' text='Je valide ces informations' />
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
          </form>
          <ErrorMessage
            title="Votre identité n'est pas correcte."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
      </div>
    );
  }
  componentWillReceiveProps(props) {
    this.setState({
      postalcode: props.postalcode,
      city: props.city
    });
  }
}

Client.InnerStepCity = InnerStepCity;
