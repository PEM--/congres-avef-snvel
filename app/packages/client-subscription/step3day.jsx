// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStepDay extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    // Add 64 states for handling choices (hacky solution...)
    for (let idx = 0; idx < 64; idx++) {
      this.state['choice' + idx] = true;
    }
    this.handleSubmit = (e) => {
      e.preventDefault();
      log.info('Valid forms');
      try {
        let selectedPrograms = [];
        this.programs.map((program) => {
          const checkbox = findDOMNode(this.refs[program.name]);
          log.debug(program.name, checkbox.checked);
          if (checkbox.checked) {
            selectedPrograms.push(program.name);
          }
        });
        log.debug('User\'s selection:', selectedPrograms);
        const profile = _.extend(_.clone(Meteor.user().profile), {
          programs: selectedPrograms
        });
        check(profile, SD.Structure.UserSubscriberSharedSchema);
        Meteor.call('updateProfile', profile, (error) => {
          if (error) {
            log.debug('Error while checking SubscriptionStep1 values', error);
            this.setState({error});
            return;
          }
          // Reset potential displayed error
          this.setState({error: ''});
          // Go to next inner step
          // @TODO Check program's availability FlowRouter.go(`/subscription?step=3&substep=program`);
        });
      } catch (error) {
        log.debug('Error while checking InnerStepDay values', error);
        this.setState({error});
      }
    };
  }
  getMeteorData() {
    const handlePricings = SD.Structure.pricings.subAll();
    const handlePrograms = SD.Structure.programs.subAll();
    return {
      loading: !handlePricings.ready() && !handlePrograms.ready(),
      pricings: handlePricings.ready() ? SD.Structure.pricings.collection.find().fetch() : [],
      programs: handlePrograms.ready() ? SD.Structure.programs.collection.find({
        day: this.props.substep
        // @TODO Filter on selectedPrograms
      }).fetch() : []
    };
  }
  render() {
    if (this.data.loading) {
      return this.loadingRenderer();
    }
    const job = Meteor.user().profile.job;
    log.info('Rendering InnerStepDay', this.props.substep, job);
    let programPrices = [];
    this.data.programs.map((program) => {
      const found = _.findWhere(programPrices, {session: program.session, right: program.right});
      if (!found) {
        let currentProgramPrice = {
          session: program.session,
          right: program.right
        };
        if (program.right !== 'gratuit') {
          const pricing = _.findWhere(this.data.pricings, {right: program.right});
          const pricingForJob = pricing[job];
          if (pricingForJob && pricingForJob.relevancy) {
            currentProgramPrice.amount = pricingForJob.amount;
          } else {
            currentProgramPrice = null;
          }
        } else {
          currentProgramPrice.amount = 0;
        }
        if (currentProgramPrice) {
          currentProgramPrice.hours = _.chain(this.data.programs)
            .where({session: program.session, right: program.right})
            .map((prg) => _.pick(prg, 'begin', 'end', 'conference'))
            .value();
          programPrices.push(currentProgramPrice);
        }
      }
    });
    log.debug('programPrices', programPrices);
    const nodes = programPrices.map((prgPrice, idx) => {
      const hours = prgPrice.hours.map((hour) => {
        const conference = hour.conference !== 'NA' ? ` :  ${hour.conference}` : '';
        return (
          <li>De <b>{hour.begin}</b> à <b>{hour.end}</b>{conference}</li>
        );
      });
      return (
        <li>
          <div className='ui toggle checkbox'>
            <input
              type='checkbox'
              key={prgPrice.right}
              ref={prgPrice.right}
              name={prgPrice.right}
              checked={this.state['choice' + idx]}
            />
          <label><h4>{prgPrice.session}</h4> - <code>{prgPrice.amount},00 €</code></label>
          </div>
          <ul>
            {hours}
          </ul>
        </li>
      );
    });
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Sélectionner vos sessions pour {this.props.substep}</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              <div className='sixteen wide field'>
                <ul>
                  {nodes}
                </ul>
            </div>
            </div>
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url='/subscription?step=3&substep=program' text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text={`Je valide ma sélection du ${this.props.substep}`} />
              </div>
            </div>
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
          </form>
          <ErrorMessage
            title="Votre sélection de sessions n'est pas valide."
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

Client.InnerStepDay = InnerStepDay;
