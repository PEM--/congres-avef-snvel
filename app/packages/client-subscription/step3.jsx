// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const {
  InnerStepCity, InnerStepJob, InnerStepSubscriber,
  InnerStepProgram, InnerStepDay, InnerStepProduct,
  AnimatedButton, BackButton, SimpleText, ErrorMessage
} = Client;

class SubscriptionStep3 extends Component {
  constructor(props) {
    super(props);
    log.info('Inner step', props.substep);
    this.state = { subscriber: {} };
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
    const { subscriber } = this.state;
    const user = Meteor.user();
    let firstName = null, lastName = null, streetAddress = null, postalCode = null, city = null, avef = null, snvel = null, status = null;
    if (subscriber && subscriber.userInfo) {
      firstName = subscriber.userInfo.firstName;
      lastName = subscriber.userInfo.lastName;
      streetAddress = subscriber.userInfo.streetAddress;
      postalCode = subscriber.userInfo.postalCode;
      city = subscriber.userInfo.city;
      avef = subscriber.userInfo.avef;
      snvel = subscriber.userInfo.snvel;
      status = subscriber.userInfo.status;
    }
    if (user.profile) {
      if (user.profile.firstName) {
        firstName = user.profile.firstName;
      }
      if (user.profile.lastName) {
        lastName = user.profile.lastName;
      }
      if (user.profile.streetAddress) {
        streetAddress = user.profile.streetAddress;
      }
      if (user.profile.postalCode) {
        postalCode = user.profile.postalCode;
      }
      if (user.profile.postalCode) {
        city = user.profile.city;
      }
    }
    return (
      <div>
        <h2>Sélection des options</h2>
        {
          !this.props.substep ? <InnerStepCity
            streetAddress={streetAddress} postalCode={postalCode} city={city}
            avef={avef} snvel={snvel}
          /> : ''
        }
        {
          this.props.substep === 'job' ? <InnerStepJob /> : ''
        }
        {
          this.props.substep === 'subscriber' ? <InnerStepSubscriber
            firstName={firstName} lastName={lastName}
            avef={avef} snvel={snvel} status={status}
          /> : ''
        }
        {
          this.props.substep === 'program' ? <InnerStepProgram /> : ''
        }
        {
          this.props.substep === 'Lundi' || this.props.substep === 'Mardi' ||
          this.props.substep === 'Mercredi' || this.props.substep === 'Jeudi'
            ? <InnerStepDay key={this.props.substep} substep={this.props.substep} /> : ''
        }
        {
          this.props.substep === 'product' ? <InnerStepProduct /> : ''
        }
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep3 = SubscriptionStep3;
