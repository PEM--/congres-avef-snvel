// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const {
  InnerStepCity, InnerStepJob, InnerStepSubscriber,
  InnerStepProgram,
  AnimatedButton, BackButton, SimpleText, ErrorMessage
} = Client;

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
    let postalcode = null, city = null, avef = null, snvel = null, status = null;
    if (subscriber && subscriber.userInfo) {
      postalcode = subscriber.userInfo.postalcode;
      city = subscriber.userInfo.city;
      avef = subscriber.userInfo.avef;
      snvel = subscriber.userInfo.snvel;
      status = subscriber.userInfo.status;
    }
    if (user.profile) {
      postalcode = user.profile.postalcode;
      city = user.profile.city;
    }
    return (
      <div>
        <h2>Sélection des options</h2>
        {
          !this.props.substep ? <InnerStepCity
            postalcode={postalcode} city={city}
            avef={avef} snvel={snvel}
          /> : ''
        }
        {
          this.props.substep === 'job' ? <InnerStepJob /> : ''
        }
        {
          this.props.substep === 'subscriber' ? <InnerStepSubscriber
            avef={avef} snvel={snvel} status={status}
          /> : ''
        }
        {
          this.props.substep === 'program' ? <InnerStepProgram /> : ''
        }

      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep3 = SubscriptionStep3;
