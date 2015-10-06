// Namespace flatteinng
const { Component } = React;
const { BaseReactMeteor } = SD.Views;

class SubscriptionStep3 extends Component {
  render() {
    return (
      <div>
        <h2>Sélection des options</h2>
        <div className='ui segments'>
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
              <div className='ui stacked segment'>
                <button
                  type='submit'
                  className={`ui fluid large submit button primary`}
                >
                  Je valide ces informations
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep3 = SubscriptionStep3;
