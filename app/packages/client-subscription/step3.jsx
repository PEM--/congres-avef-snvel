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
        if (this.props.postalcode) {
          substep = 'subscriber';
        }
        FlowRouter.go('/subscription?step=3&substep=job');
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

class InnerStepJob extends Component {
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
    log.info('Rendering InnerStepJob');
    const jobs = [
      {value: 'veterinary', text: 'Vétérinaire ou Etudiant'},
      {value: 'nurse', text: 'ASV ou TDE'},
      {value: 'smith', text: 'Maréchal Ferrant'}
    ];
    const choices = jobs.map((job) => {
      return (
        <div className='field'>
          <div className='ui radio checkbox'>
            <input type='radio' key={job.value} value={job.value} name='jobs' tabIndex='0' className='hidden' />
            <label>{job.text}</label>
          </div>
        </div>
      );
    });
    // const subscriberMessage =
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Votre profession</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <p><SimpleText page='subscription_step3' text='no_subscriber_info' /></p>
            <div className='grouped fields'>
              {choices}
            </div>
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url='/subscription?step=3'text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text='Je valide ma profession' />
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
  componentDidMount() {
    $('.ui.radio.checkbox').checkbox();
  }
}

class InnerStepSubscriber extends Component {
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
    log.info('Rendering InnerStepSubscriber');
    // const jobs = [
    //   {value: 'veterinary', text: 'Vétérinaire ou Etudiant'},
    //   {value: 'nurse', text: 'ASV ou TDE'},
    //   {value: 'smith', text: 'Maréchal Ferrant'}
    // ];
    // const choices = jobs.map((job) => {
    //   return (
    //     <div className='field'>
    //       <div className='ui radio checkbox'>
    //         <input type='radio' key={job.value} value={job.value} name='jobs' tabIndex='0' className='hidden' />
    //         <label>{job.text}</label>
    //       </div>
    //     </div>
    //   );
    // });
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Votre type d'adhésion</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url='/subscription?step=3'text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text='Je valide ma profession' />
              </div>
            </div>
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
          </form>
          <ErrorMessage
            title="Votre type d'adhésion n'est pas correct."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    $('.ui.radio.checkbox').checkbox();
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
          !this.props.substep ? <InnerStepCity postalcode={postalcode} city={city} /> : ''
        }
        {
          this.props.substep === 'job' ? <InnerStepJob /> : ''
        }
        {
          this.props.substep === 'subscriber' ? <InnerStepSubscriber /> : ''
        }
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep3 = SubscriptionStep3;
