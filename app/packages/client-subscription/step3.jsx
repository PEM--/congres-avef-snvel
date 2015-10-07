// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, SimpleText, ErrorMessage } = Client;

class InnerStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '', postalcode: props.postalcode, city: props.city
    };
    this.onChange = (e) => {
      console.log(e.target.attr('name'));
      console.log(e.target.value);
      this.setState({[e.target.attr('name')]: e.target.value});
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      const postalcode = findDOMNode(this.refs.postalcode).value.trim();
      const city = textInputFormatter(findDOMNode(this.refs.city).value);
      log.info('Valid forms', city, postalcode);
      // try {
      //   // Insert data on base if different from props
      //   // Go to next step
      //
      // } catch(error) {
      //
      // }
    };
  }
  render() {
    log.info('Rendering InnerStep1', this.state.postalcode, this.state.city);
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
            <ErrorMessage
              title="Votre identité n'est pas correcte."
              error={ErrorMessage.asProps(this.state.error)}
            />
          </form>
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

class SubscriptionStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriber: {}
    };
    const user = Meteor.user();
    Meteor.call('availableSubscriberInfo', (error, subscriber) => {
      if (error) {
        log.warn('Error received', error);
      }
      log.info('Found a registered subscriber?', subscriber);
      if (Meteor.isClient) {
        // If subscriber is not null, the current user is a subscriber
        if (subscriber) {
          this.setState({subscriber});
        }
      }
    });
  }
  render() {
    log.info('Rendering SubscriptionStep3', this.state.subscriber);
    const { subscriber } = this.state;
    const postalcode = subscriber.userInfo ? subscriber.userInfo.postalcode : null;
    const city = subscriber.userInfo ? subscriber.userInfo.city : null;
    return (
      <div>
        <h2>Sélection des options</h2>
        <InnerStep1 postalcode={postalcode} city={city} />
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep3 = SubscriptionStep3;
