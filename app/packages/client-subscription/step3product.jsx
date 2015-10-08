// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStepProduct extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = {error: ''};
    // Add 64 states for handling choices (hacky solution...)
    for (let idx = 0; idx < 64; idx++) {
      this.state['choice' + idx] = true;
    }
    this.handleChange = (e) => {};
    this.handleSubmit = (e) => {
      e.preventDefault();
      log.info('Valid forms');
      // try {
      //   let selectedPrograms = [];
      //   this.programs.map((program) => {
      //     const checkbox = findDOMNode(this.refs[program.name]);
      //     log.debug(program.name, checkbox.checked);
      //     if (checkbox.checked) {
      //       selectedPrograms.push(program.name);
      //     }
      //   });
      //   log.debug('User\'s selection:', selectedPrograms);
      //   const profile = _.extend(_.clone(Meteor.user().profile), {
      //     programs: selectedPrograms
      //   });
      //   check(profile, SD.Structure.UserSubscriberSharedSchema);
      //   Meteor.call('updateProfile', profile, (error) => {
      //     if (error) {
      //       log.debug('Error while checking SubscriptionStep1 values', error);
      //       this.setState({error});
      //       return;
      //     }
      //     // Reset potential displayed error
      //     this.setState({error: ''});
      //     // Go to next inner step
      //     // @TODO Check program's availability FlowRouter.go(`/subscription?step=3&substep=program`);
      //     FlowRouter.go('/subscription?step=3&substep=Lundi');
      //   });
      // } catch (error) {
      //   log.debug('Error while checking InnerStepProduct values', error);
      //   this.setState({error});
      // }
    };
  }
  getMeteorData() {
    const handlePricings = SD.Structure.pricings.subAll();
    const handleProducts = SD.Structure.products.subAll();
    return {
      loading: !handlePricings.ready() && !handleProducts.ready(),
      pricings: handlePricings.ready() ? SD.Structure.pricings.collection.find().fetch() : [],
      products: handleProducts.ready() ? SD.Structure.products.collection.find().fetch() : []
    };
  }
  render() {
    if (this.data.loading) {
      return this.loadingRenderer();
    }
    const job = Meteor.user().profile.job;
    this.productPrices = [];
    this.data.products.map((product) =>{
      let productPrice = {
        _id: product._id,
        name: product.name,
        right: product.right
      };
      // Check if product can be sold to current job
      const pricing = _.findWhere(this.data.pricings, {right: product.right});
      if (!pricing) {
        log.warn('No pricing for product:', product.name, 'right:', product.right, 'job:', job);
      } else {
        const pricingForJob = pricing[job];
        if (pricingForJob && pricingForJob.relevancy) {
          productPrice.amount = pricingForJob.amount;
          this.productPrices.push(productPrice);
        }
      }
    });
    log.info('Rendering InnerStepProduct', this.productPrices);
    const isPriceDisplayed = false;
    const nodes = this.productPrices.map((prdPrice, idx) => {
      return (
        <li key={String(idx)}>
          <div className='ui toggle checkbox'>
            <input
              type='checkbox'
              ref={idx}
              name={prdPrice.right}
              checked={this.state['choice' + idx]}
              onChange={this.handleChange}
            />
          <label>
            <span className='ui header'>{prdPrice.name}</span>
            {
              isPriceDisplayed ? <div>-&nbsp;<span className='price'>{prdPrice.amount},00&nbsp;€</span></div> : ''
            }
           </label>
          </div>
        </li>
      );
    });
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Sélectionner vos produits</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              {
                this.productPrices.length === 0 ?
                  (<div><p><i className='fa fa-bullhorn'></i>&nbsp;Aucune produit disponible.</p><br/></div>) :
                  (
                    <div className='sixteen wide field'>
                      <ul>
                        {nodes}
                      </ul>
                    </div>
                  )
              }
            </div>
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url='/subscription?step=3&substep=Jeudi' text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text='Je valide ma sélection' />
              </div>
            </div>
            <p><SimpleText page='subscription_step3' text='price_info' /></p>
          </form>
          <ErrorMessage
            title="Votre sélection de produits n'est pas valide."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    $('.ui.checkbox').checkbox();
  }
}

Client.InnerStepProduct = InnerStepProduct;