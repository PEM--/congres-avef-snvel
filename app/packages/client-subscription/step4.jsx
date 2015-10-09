// Namespace flatteinng
const { Component } = React;
const { SimpleText, LineText } = SD.Views.Client;

class SubscriptionStep4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      paymentByCheck: false,
      paymentByCard: false
    };
    this.handleChange = (e) => {
      e.preventDefault();
      log.debug('User selected', e, name);
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
    };
  }
  render() {
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Paiement</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className='fields'>
              <div className='sixteen field'>
                <label>Sélectionnez votre moyen de paiement</label>
                <div className='field'>
                  <div className='ui radio checkbox'>
                    <input
                      type='radio'
                      ref='paymentByCheck'
                      value='paymentByCheck'
                      name='payment'
                      className='hidden'
                      checked={this.state.paymentByCheck}
                      onChange={this.handleChange}
                    />
                    <label>Chèque</label>
                  </div>
                </div>
                <div className='field'>
                  <div className='ui radio checkbox'>
                    <input
                      type='radio'
                      ref='paymentByCard'
                      value='paymentByCard'
                      name='payment'
                      className='hidden'
                      checked={this.state.paymentByCard}
                      onChange={this.handleChange}
                    />
                    <label>Carte bancaire</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='fields'>
              <div className='sixteen inline field'>
                <p>Chèques, Cartes</p>
              </div>
            </div>
          </form>
        </div>
        <div className='ui segment'>
          <p><SimpleText page='subscription_step3' text='price_info' /></p>
        </div>
      </div>
    );
  }
  componentDidMount() {
    $('.checkbox').checkbox();
  }
}

SD.Views.Client.SubscriptionStep4 = SubscriptionStep4;
