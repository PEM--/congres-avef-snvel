// Namespace flatteinng
const { Component } = React;
const { SimpleText } = SD.Views.Client;

class SubscriptionStep2 extends Component {
  render() {
    return (
      <div className='ui icon message step2'>
        <i className='fa fa-hourglass-half fa-4x'></i>
        <div className='content'>
          <h2 className='header'><SimpleText page='subscription_step2' text='title' /></h2>
          <p><SimpleText page='subscription_step2' text='message' /></p>
          <p><SimpleText page='subscription_step2' text='submessage' /></p>
          <p><SimpleText page='subscription_step2' text='warning' /></p>
        </div>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep2 = SubscriptionStep2;
