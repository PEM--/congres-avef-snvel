// Namespace flatteinng
const { Component } = React;
const { BaseReactMeteor } = SD.Views;

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
            <button
              type='submit'
              className='ui fluid large submit animated button primary' tabindex="0">
              <div className='visible content'>Je valide ces informations</div>
              <div className='hidden content'>
                <i className='right arrow icon'></i>
              </div>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

class SubscriptionStep3 extends Component {
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
