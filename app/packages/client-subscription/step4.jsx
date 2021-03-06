// Namespace flatteinng
const { Component, findDOMNode } = React;
const { Client, BaseReactMeteor } = SD.Views;
const { AnimatedButton, ErrorMessage, SimpleText, LineText } = Client;
const { CardValidation } = SD.Utils;

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.dashLine = s.repeat('-', 30);
  }
  render() {
    log.info('Render Invoice');
    const { prices, discounts, totalHT, totalTTC } = this.props;
    log.debug('Rendering invoice', totalHT, totalTTC, prices, discounts);
    return (
      <div className='invoice'>
        <pre>{SD.Utils.renderInvoice(prices, discounts, totalHT, totalTTC)}</pre>
      </div>
    );
  }
}

class PaymentByCheck extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    log.info('Render PaymentByCheck');
    const { prices, discounts, totalHT, totalTTC } = this.props;
    return (
      <div className='fadeIn'>
        <h4>Paiement par chèque</h4>
        <Invoice prices={prices} discounts={discounts} totalHT={totalHT} totalTTC={totalTTC} />
        <p><SimpleText page='subscription_step4' text='payment_by_check' /></p>
      </div>
    );
  }
}

class PaymentByCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    log.info('Render PaymentByCard');
    const { prices, discounts, totalHT, totalTTC } = this.props;
    return (
      <div className='fadeIn'>
        <h4>Paiement par carte</h4>
        <Invoice prices={prices} discounts={discounts} totalHT={totalHT} totalTTC={totalTTC} />
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

class SubscriptionStep4 extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      disabled: false,
      paymentByCheck: false,
      paymentByCard: false
    };
    // Dummy handle (checkbox is handled by Semantic)
    this.handleChange = (e) => {};
    this.goBack = (e) => {
      e.preventDefault();
      try {
        Meteor.call('removePaymentPending', (error) => {
          if (error) {
            log.warn('Received error from server', error);
            this.setState({error});
            // Reactivate form in 2 secs
            Meteor.setTimeout(() => this.setState({disabled: true}), 2000);
            return;
          }
          this.setState({disabled: true});
          // Wait for the roles to settle
          Meteor.setTimeout(() => FlowRouter.go('/subscription?step=3&substep=product'), 300);
        });
      } catch (error) {
        if (error) {
          log.warn('Received error from server', error);
          this.setState({error});
          // Reactivate form in 2 secs
          Meteor.setTimeout(() => this.setState({disabled: true}), 2000);
          return;
        }
      }
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      let result;
      try {
        // Checking card number
        const cardNumber = s.replaceAll(findDOMNode(this.refs.number).value.trim(), ' ', '');
        result = CardValidation.number(cardNumber);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        // Card's name
        const cardName = findDOMNode(this.refs.name).value.trim().toUpperCase();
        result = CardValidation.name(cardName);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        // Checking card expiry
        const cardExpiry = s.replaceAll(findDOMNode(this.refs.expiry).value.trim(), ' ', '');
        result = CardValidation.expiry(cardExpiry);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        const cardCvc = findDOMNode(this.refs.cvc).value.trim();
        result = CardValidation.cvc(cardCvc);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        log.debug('User validated form');
        log.info('Creating a Braintree token');
        // Prevent user from submitting the form
        this.setState({disabled: true});
        // Request a client token
        Meteor.call('clientToken', (error, braintreeCustomerAndToken) => {
          if (error) {
            log.warn('Received error from server side Braintree', error);
            this.setState({error});
            // Reactivate form in 2 secs
            Meteor.setTimeout(() => this.setState({disabled: true}), 2000);
            return;
          }
          log.info('You are now a registered Braintree customer', braintreeCustomerAndToken.braintreeCustomerId);
          const user = Meteor.user();
          // Creating a payment nonce
          client = new braintree.api.Client({
            clientToken: braintreeCustomerAndToken.token
          });
          client.tokenizeCard({
            number: cardNumber,
            cardholderName: cardName,
            expirationDate: cardExpiry,
            cvv: cardCvc,
            billingAddress: {
              streetAddress: user.profile.streetAddress,
              postalCode: user.profile.postalCode,
              locality: user.profile.city
            }
          }, (errorNounce, nonce) => {
            if (errorNounce) {
              log.warn('Received error from client side Braintree', errorNounce);
              this.setState({error: errorNounce});
              // Reactivate form in 2 secs
              Meteor.setTimeout(() => this.setState({disabled: false}), 2000);
              return;
            }
            // Perform the payment using the nonce
            Meteor.call('cardPayment', nonce, {
              prices: this.prices,
              discounts: this.discounts,
              totalHT: this.state.totalHT,
              totalTTC: this.state.totalTTC
            }, (errorPayment, resultPayment) => {
              if (errorPayment) {
                log.warn('Received error from server side payment', errorPayment);
                this.setState({error: errorPayment});
                // Reactivate form in 2 secs
                Meteor.setTimeout(() => this.setState({disabled: false}), 2000);
                return;
              }
              // Payment succeed wait few ms so that Roles are settled
              this.setState({error: ''});
              log.info('Payment succeed');
              Meteor.setTimeout(() => FlowRouter.go('/subscription?step=report'), 300);
            });
          });
        });
      } catch (error) {
        log.debug('Error while checking SubscriptionStep4 values', error);
        this.setState({error});
      }
    };
  }
  setModifiedAmount(val) {
    return this.state.paymentByCheck ? 1.02 * val : val;
  }
  getMeteorData() {
    const handlePricings = SD.Structure.pricings.subAll();
    const handlePrograms = SD.Structure.programs.subAll();
    const handleProducts = SD.Structure.products.subAll();
    const handleDiscounts = SD.Structure.discounts.subAll();
    return {
      loading: !handlePricings.ready() && !handlePrograms.ready() &&
        !handleProducts.ready() && !handleDiscounts.ready(),
      pricings: handlePricings.ready() ? SD.Structure.pricings.collection.find().fetch() : [],
      programs: handlePrograms.ready() ? SD.Structure.programs.collection.find().fetch() : [],
      products: handleProducts.ready() ? SD.Structure.products.collection.find().fetch() : [],
      discounts: handleDiscounts.ready() ? SD.Structure.discounts.collection.find().fetch() : []
    };
  }
  render() {
    log.info('Render SubscriptionStep4');
    if (this.data.loading) {
      return this.loadingRenderer();
    }
    // Activate radio button
    if (Meteor.isClient) {
      // Wait for 2 cycles
      Meteor.setTimeout(() => {
        let handleCheckbox = (name) => {
          log.debug('Checkbox checked', name);
          const other = name === 'paymentByCheck' ? 'paymentByCard' : 'paymentByCheck';
          this.setState({
            [name]: true, [other]: false,
            disabled: false
          });
        };
        $('#paymentByCheck').checkbox({
          onChecked: handleCheckbox.bind(this, 'paymentByCheck'),
        });
        $('#paymentByCard').checkbox({
          onChecked: handleCheckbox.bind(this, 'paymentByCard'),
        });
      }, 32);
    }
    // Caculate amounts
    const user = Meteor.user();
    const profile = user.profile;
    const job = profile.job;
    const userPrograms = profile.rights ? profile.rights : [];
    const userProducts = profile.products ? profile.products : [];
    // List of rights on programs
    let rights = [];
    userPrograms.forEach((prg) => {
      let realProgram = _.findWhere(this.data.programs, {_id: prg});
      if (realProgram) {
        if (realProgram.right) {
          rights.push(realProgram.right);
        } else {
          log.warn('Program has no right', realProgram.session);
        }
      } else {
        log.warn('Unknown program', prg);
      }
    });
    rights = _.chain(rights)
      // Reduce list of rights for uniqueness on session
      .unique()
       // Remove free programs
      .filter((right) => right !== 'gratuit')
      .value();
    // Converts rights to prices
    this.prices = [];
    rights.forEach((right) => {
      const pricing = _.findWhere(this.data.pricings, {right});
      if (pricing) {
        if (pricing.right && pricing[job] && pricing[job].amount) {
          this.prices.push({
            designation: pricing.right,
            value: this.setModifiedAmount(pricing[job].amount)
          });
        } else {
          log.warn('Pricing for', right, 'is inconsistent', job, pricing);
        }
      } else {
        log.warn('Right has no pricing', right);
      }
    });
    // List of prices and rights on products
    userProducts.forEach((prd) => {
      let realPrd = _.findWhere(this.data.products, {_id: prd});
      if (realPrd) {
        rights.push(realPrd.right);
        const pricing = _.findWhere(this.data.pricings, {right: realPrd.right});
        if (pricing) {
          if (realPrd.name && pricing[job] && pricing[job].amount) {
            this.prices.push({
              designation: realPrd.name,
              value: this.setModifiedAmount(pricing[job].amount)
            });
          } else {
            log.warn('Inconsistent product or price', realPrd, job, pricing);
          }
        } else {
          log.warn('Product has no price', prd);
        }
      } else {
        log.warn('Unknown product', prd);
      }
    });
    // @TODO Missing a real discounts set of rules: Use PEG.js
    this.discounts = [];
    if ((rights.indexOf('Jour1') > -1) && (rights.indexOf('Jour2') > -1)) {
      this.discounts.push({
        designation: '2 journées',
        value: this.setModifiedAmount(this.data.discounts[0][job])
      });
    }
    if ((rights.indexOf('proceedingpaper') > -1) &&
      ((rights.indexOf('Jour1') > -1) || (rights.indexOf('Jour2') > -1))) {
      this.discounts.push({
        designation: 'Paper & inscription',
        value: this.setModifiedAmount(this.data.discounts[1][job])
      });
    }
    // Calculate total
    this.state.totalHT = 0;
    this.prices.forEach((product) => { this.state.totalHT += product.value; });
    this.discounts.forEach((discount) => {this.state.totalHT -= discount.value; });
    this.state.totalTTC = this.state.totalHT * 1.2;
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
            {
              this.state.paymentByCheck ? (
                <div className='paymentByCheck'>
                  <PaymentByCheck
                    prices={this.prices}
                    discounts={this.discounts}
                    totalHT={this.state.totalHT}
                    totalTTC={this.state.totalTTC}
                  />
                </div>
              ) : ''
            }
            {
              this.state.paymentByCard ? (
                <div className='paymentByCard'>
                  <PaymentByCard
                    prices={this.prices}
                    discounts={this.discounts}
                    totalHT={this.state.totalHT}
                    totalTTC={this.state.totalTTC}
                  />
                  <div className='fields'>
                    <div className='five wide field'>
                      <div className='ui left icon input'>
                        <input type="text" placeholder="N° de carte" ref="number" name="number" autoComplete="off" noValidate="novalidate" autofocus="autofocus"/>
                        <i className='fa fa-credit-card icon'></i>
                      </div>
                    </div>
                    <div className='five wide field'>
                      <div className='ui left icon input'>
                        <input type="text" placeholder="NOM COMPLET" ref="name" name="name" autoComplete="off" noValidate="novalidate"/>
                        <i className='fa fa-user icon'></i>
                      </div>
                    </div>
                    <div className='three wide field'>
                      <div className='ui left icon input'>
                        <input type="text" placeholder="MM/AA" ref="expiry" name="expiry" autoComplete="off" noValidate="novalidate"/>
                        <i className='fa fa-calendar icon'></i>
                      </div>
                    </div>
                    <div className='three wide field'>
                      <div className='ui left icon input'>
                        <input type="text" placeholder="CVC" ref="cvc" name="cvc" autoComplete="off" noValidate="novalidate"/>
                        <i className='fa fa-credit-card icon'></i>
                      </div>
                    </div>
                  </div>
                </div>
              ) : ''
            }
            {
              this.state.paymentByCard ?
              (
                <div className='fields fadeIn'>
                  <div className='sixteen wide field'>
                    <AnimatedButton
                      anim='fade' icon='cart-arrow-down'
                      text='Je valide mon paiement'
                      disabled={this.state.disabled}
                      textHidden={numeralAmountFormat(this.state.totalTTC) + ' (TTC)'}
                    />
                  </div>
                </div>
              ) : ''
            }
          </form>
          <p><LineText page='subscription_step3' text='price_info' /></p>
          <ErrorMessage
            title="Votre paiment n'est pas valide."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
        <div className='ui segment'>
          <form id='backButton' autoComplete='off' className='ui large form' onSubmit={this.goBack}>
            <div className='fields'>
              <div className='sixteen field'>
                <AnimatedButton
                  icon='arrow-left' text='Je retourne à la sélection des options'
                  disabled={this.state.disabled}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep4 = SubscriptionStep4;
