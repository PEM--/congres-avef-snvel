// Namespace flatteinng
const { Component } = React;
const { Client } = SD.Views;
const { AnimatedButton, ErrorMessage, SimpleText, LineText } = Client;

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
                  <div id='paymentByCheck' className='ui radio checkbox'>
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
                  <div id='paymentByCard' className='ui radio checkbox'>
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
            <div className='fields'>
              <div className='sixteen wide field'>
                <AnimatedButton icon='cart-arrow-down' text='Je valide mon paiement' />
              </div>
            </div>
          </form>
          <ErrorMessage
            title="Votre sélection de sessions n'est pas valide."
            error={ErrorMessage.asProps(this.state.error)}
          />

        </div>
        <div className='ui segment'>
          <p><SimpleText page='subscription_step3' text='price_info' /></p>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let handleCheckbox = (name) => {
      log.debug('Checkbox checked', name);
      const other = name === 'paymentByCheck' ? 'paymentByCard' : 'paymentByCheck';
      this.setState({[name]: true, [other]: false});
    };
    $('#paymentByCheck').checkbox({
      onChecked: handleCheckbox.bind(this, 'paymentByCheck'),
    });
    $('#paymentByCard').checkbox({
      onChecked: handleCheckbox.bind(this, 'paymentByCard'),
    });
  }
}

SD.Views.Client.SubscriptionStep4 = SubscriptionStep4;
