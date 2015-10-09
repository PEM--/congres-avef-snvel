// Namespace flatteinng
const { Component } = React;
const { Client } = SD.Views;
const { AnimatedButton, ErrorMessage, SimpleText, LineText } = Client;

class Invoice extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='invoice'>
        <div>Facture</div>
        <div>Désignation, Montant</div>
        <div>Total: {numeral(1200).format('0.0,00 €')}</div>
      </div>
    );
  }
}

class PaymentByCheck extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='fadeIn'>
        <p>Vous avez sélectionné le paiement par chèque.</p>
        <Invoice />
        <p>Blabla sur l'ordre.</p>
      </div>
    );
  }
}

class PaymentByCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='fadeIn'>
        <p>Vous avez sélectionné le paiement par carte.</p>
        <Invoice />
        <div className='card-wrapper' />
      </div>
    );
  }
  componentDidMount() {
    // @TODO Set a Tracker for reactive sizes
    const viewportSize = Math.min(rwindow.$width(), rwindow.$height());
    const cardWidth = viewportSize < 400 ? 200 : 300;
    // Create card for displaying user's entries
    Meteor.setTimeout(() => {
      let card = new Card({
        width: cardWidth,
        form: 'form',
        container: '.card-wrapper',
        messages: {
          validDate: 'Date de\nvalidité',
          monthYear: 'Mois / Année'
        },
        values: {
          number: '•••• •••• •••• ••••',
          name: 'NOM COMPLET',
          expiry: '••/••',
          cvc: '•••'
        }
      });
    }, 32);
  }
}

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
          <form id='braintreeCard' autoComplete='off' className='ui large form' onSubmit={this.handleSubmit} onChange={this.handleChange}>
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
                {
                  this.state.paymentByCheck ? (
                    <div className='sixteen inline field'>
                      <PaymentByCheck />
                    </div>
                  ) : ''
                }
                {
                  this.state.paymentByCard ? (
                    <div className='sixteen inline field'>
                      <PaymentByCard />
                      <input type="text" placeholder="N° de carte" name="number" autoComplete="off" noValidate="novalidate" autofocus="autofocus"/>
                      <input type="text" placeholder="NOM COMPLET" name="name" autoComplete="off" noValidate="novalidate"/>
                      <input type="text" placeholder="MM/AA" name="expiry" autoComplete="off" noValidate="novalidate"/>
                      <input type="text" placeholder="CVC" name="cvc" autoComplete="off" noValidate="novalidate"/>
                    </div>
                  ) : ''
                }
              </div>
            </div>
            <div className='fields'>
              <div className='sixteen wide field'>
                <AnimatedButton anim='fade' icon='cart-arrow-down' text='Je valide mon paiement' />
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
