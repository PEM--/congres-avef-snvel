// Namespace flatteinng
const { Component, findDOMNode } = React;
const { Client, BaseReactMeteor } = SD.Views;
const { AnimatedButton, ErrorMessage, SimpleText, LineText } = Client;

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.dashLine = s.repeat('-', 30);
  }
  render() {
    log.info('Render Invoice');
    const { prices, discounts, total } = this.props;
    log.debug('Rendering invoice', total, prices, discounts);
    return (
      <div className='invoice'>
        <pre>{renderInvoice(prices, discounts, total)}</pre>
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
    const { prices, discounts, total } = this.props;
    return (
      <div className='fadeIn'>
        <h4>Paiement par chèque</h4>
        <Invoice prices={prices} discounts={discounts} total={total}/>
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
    const { prices, discounts, total } = this.props;
    return (
      <div className='fadeIn'>
        <h4>Paiement par carte</h4>
        <Invoice prices={prices} discounts={discounts} total={this.props.total}/>
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
      disabled: true,
      paymentByCheck: false,
      paymentByCard: false
    };
    // Dummy handle (checkbox is handled by Semantic)
    this.handleChange = (e) => {};
    this.handleSubmit = (e) => {
      e.preventDefault();
      let result;
      try {
        // Checking card number
        result = this.checkCardNumber(findDOMNode(this.refs.number).value);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        // Card's name
        result = this.checkCardName(findDOMNode(this.refs.name).value);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        // Checking card expiry
        result = this.checkCardExpiry(findDOMNode(this.refs.expiry).value);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        result = this.checkCardCvc(findDOMNode(this.refs.cvc).value);
        if (result !== '') {
          throw new Meteor.Error('card_validation_error', result);
        }
        log.debug('User validated form');
        log.info('Creating a Braintree token');





      } catch (error) {
        log.debug('Error while checking SubscriptionStep4 values', error);
        this.setState({error});
      }
    };
  }
  checkCardNumber(str) {
    if (str.length > 19) {
      return 'Votre n° de carte est trop long.';
    }
    if (str.length < 14) {
      return 'Votre n° de carte est incomplet.';
    }
    if (_.isNaN(s.toNumber(s.replaceAll(str, ' ', '')))) {
      return 'Votre n° de carte ne peut contenir de lettres.';
    }
    return '';
  }
  checkCardName(str) {
    if (str.length < 2) {
      return 'Entrez le nom inscrit sur votre carte.';
    }
    if (str.length > 26) {
      return 'Entrez uniquement le nom inscrit sur votre carte.';
    }
    return '';
  }
  checkCardExpiry(str) {
    log.warn(str);
    if (str.length !== 7) {
      return 'Entrez la date d\'expiration de votre carte.';
    }
    const [strMonth, strYear] = str.split(' / ');
    const month = s.toNumber(strMonth);
    if ((strMonth.length !== 2) || (_.isNaN(month)) ||
        (month < 1) || (month > 12)) {
      return 'Le mois d\'expiration est inconsistant.';
    }
    if ((_.isUndefined(strYear)) || (strYear.length !== 2)) {
      return 'L\'année d\'expiration est inconsistante.';
    }
    const year = s.toNumber(strYear);
    const currentYear = moment(new Date()).year() - 2000;
    if ((_.isNaN(year)) || (year < currentYear)) {
      return 'L\'année d\'expiration est inconsistante.';
    }
    return '';
  }
  checkCardCvc(str) {
    if (((str.length !== 3) && (str.length !== 4)) ||
        (_.isNaN(s.toNumber(str)))) {
      return 'Le cryptogramme doit comporter 3 ou 4 chiffres.';
    }
    return '';
  }
  setModifiedAmount(val) {
    return this.state.paymentByCheck ? 1.1 * val : val;
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
    let prices = [];
    rights.forEach((right) => {
      const pricing = _.findWhere(this.data.pricings, {right});
      if (pricing) {
        if (pricing.right && pricing[job] && pricing[job].amount) {
          prices.push({
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
            prices.push({
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
    let discounts = [];
    if ((rights.indexOf('Jour1') > -1) && (rights.indexOf('Jour2') > -1)) {
      discounts.push({
        designation: '2 journées',
        value: this.setModifiedAmount(this.data.discounts[0][job])
      });
    }
    if ((rights.indexOf('proceedingpaper') > -1) &&
      ((rights.indexOf('Jour1') > -1) || (rights.indexOf('Jour2') > -1))) {
      discounts.push({
        designation: 'Paper & inscription',
        value: this.setModifiedAmount(this.data.discounts[1][job])
      });
    }
    // Calculate total
    this.state.total = 0;
    prices.forEach((product) => { this.state.total += product.value; });
    discounts.forEach((discount) => {this.state.total -= discount.value; });
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
                    prices={prices}
                    discounts={discounts}
                    total={this.state.total}
                  />
                </div>
              ) : ''
            }
            {
              this.state.paymentByCard ? (
                <div className='paymentByCard'>
                  <PaymentByCard
                    prices={prices}
                    discounts={discounts}
                    total={this.state.total}
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
                      textHidden={numeralAmountFormat(this.state.total)}
                    />
                  </div>
                </div>
              ) : ''
            }
          </form>
          <ErrorMessage
            title="Votre paiment n'est pas valide."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
        <div className='ui segment'>
          <p><SimpleText page='subscription_step3' text='price_info' /></p>
        </div>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep4 = SubscriptionStep4;
