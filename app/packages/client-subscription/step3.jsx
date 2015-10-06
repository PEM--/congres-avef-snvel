// Namespace flatteinng
const { Component } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, SimpleText } = Client;

class InnerStep1 extends Component {
  render() {
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Identité complémentaire</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form'>
            <div className='fields'>
              <div className='six wide field'>
                <label>Code postal</label>
                <div className='ui left icon input'>
                  <i className='fa fa-home icon'></i>
                  <input type='text' name='postalcode' ref='postalcode' placeholder='Code postal' />
                </div>
              </div>
              <div className='ten wide field'>
                <label>Ville</label>
                <div className='ui left icon input'>
                  <i className='fa fa-home icon'></i>
                  <input type='text' name='city' ref='city' placeholder='Ville' />
                </div>
              </div>
            </div>
            <AnimatedButton icon='arrow-right' text='Je valide ces informations' />
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
          </form>
        </div>
      </div>
    );
  }
}

class SubscriptionStep3 extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = {
      availableSubscriberInfo: {}
    };
  }
  getMeteorData() {
    const user = Meteor.user();
    Meteor.call('availableSubscriberInfo', (error, availableSubscriberInfo) => {
      if (error) {
        log.warn('Error received', error);
      }
      log.info('User found as a registered subscriber', availableSubscriberInfo);
      this.setState({availableSubscriberInfo});
    });
    return { user };
  }
  render() {
    return (
      <div>
        <h2>Sélection des options</h2>
        <InnerStep1 />
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep3 = SubscriptionStep3;
