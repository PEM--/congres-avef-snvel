// Namespace flatteinng
const { Component } = React;
const { LineText } = SD.Views.Client;

class SubscriptionStep4 extends Component {
  render() {
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Sélectionner votre moyen de paiement</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              <p>Chéques, Cartes</p>
              <p><SimpleText page='subscription_step3' text='price_info' /></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep4 = SubscriptionStep4;
