// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStep1 extends Component {
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
        FlowRouter.go('/subscription?step=3&substep=2');
      } catch (error) {
        log.debug('Error while checking InnerStep1 values', error);
        this.setState({error});
      }
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

class InnerStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    this.goBack = (e) => {
      e.preventDefault();
      log.info('User is going back');
      FlowRouter.go('/subscription?step=3');
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      log.info('User select', e.target);
    };
  }
  render() {
    log.info('Rendering InnerStep2');
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Votre profession</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url='/subscription?step=3'text='Retour' />
              </div>
              <div className='twelve wide field'>
                <BackButton text='Je valide ma profession' />
              </div>
            </div>
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
          </form>
          <ErrorMessage
            title="Votre profession n'est pas correcte."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
      </div>

    );
  }
}

class SubscriptionStep3 extends Component {
  constructor(props) {
    super(props);
    log.info('Inner step', props.substep);
    const user = Meteor.user();
    this.state = {
      user,
      subscriber: {}
    };
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
    log.info('Rendering SubscriptionStep3', this.state.subscriber, this.props.substep);
    const { user, subscriber } = this.state;
    let postalcode = null, city = null;
    if (user.profile) {
      postalcode = user.profile.postalcode;
      city = user.profile.city;
    }
    if (subscriber && (!postalcode || !city)) {
      postalcode = subscriber.userInfo.postalcode;
      city = subscriber.userInfo.city;
    }
    return (
      <div>
        <h2>Sélection des options</h2>
        {
          !this.props.substep ? <InnerStep1 postalcode={postalcode} city={city} /> : ''
        }
        {
          this.props.substep === 2 ? <InnerStep2 postalcode={postalcode} city={city} /> : ''
        }
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep3 = SubscriptionStep3;
