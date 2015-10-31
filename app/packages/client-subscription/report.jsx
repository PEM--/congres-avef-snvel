// Namespace flatteinng
const { Component } = React;
const { LineText } = SD.Views.Client;

class SubscriptionReport extends Component {
  render() {
    const user = Meteor.user();
    const qr = user.profile.qrImage;
    return (
      <div>
        <LineText page='subscription_recap' text='congratulation' />
        <div className='qr-code-container'>
          <div className='qr-code' dangerouslySetInnerHTML={{__html: qr}} />
        </div>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionReport = SubscriptionReport;
