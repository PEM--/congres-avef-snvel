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
      this.state['choice' + idx] = false;
    }
    this.backStep = '';
    this.nextUrl = '/subscription?step=3&substep=';
    switch (props.substep) {
    case 'Lundi':
      this.backStep = 'program';
      this.nextUrl += 'Mardi';
      break;
    case 'Mardi':
      this.backStep = 'Lundi';
      this.nextUrl += 'Mercredi';
      break;
    case 'Mercredi':
      this.backStep = 'Mardi';
      this.nextUrl += 'Jeudi';
      break;
    case 'Jeudi':
      this.backStep = 'Mercredi';
      this.nextUrl += 'product';
      break;
    default:
      log.warn('Unknown substep', props.substep);
    }
    this.handleChange = (e) => {};
    this.handleSubmit = (e) => {
      e.preventDefault();
      log.info('Valid forms');
      try {
        let newRights = [], removedRights = [];
        this.programPrices.map((prgPrice, idx) => {
          const isSelected = findDOMNode(this.refs[String(idx)]).checked;
          if (isSelected) {
            newRights.push(prgPrice._id);
          } else {
            removedRights.push(prgPrice._id);
          }
        });
        check(newRights, [String]);
        check(removedRights, [String]);
        Meteor.call('updateRights', newRights, removedRights, (error) => {
          if (error) {
            log.debug('Error while checking InnerStepDay values', error);
            this.setState({error});
            return;
          }
          // Reset potential displayed error
          this.setState({error: ''});
          // Go to next inner step
          FlowRouter.go(this.nextUrl);
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
      programs: handlePrograms.ready() ? SD.Structure.programs.collection.find(
        {day: this.props.substep},
        {sort: {begin: 1}}
      ).fetch() : []
    };
  }
  render() {
    if (this.data.loading) {
      return this.loadingRenderer();
    }
    const profile = Meteor.user().profile;
    const job = profile.job;
    const selectedPrograms = profile.programs;
    log.info('Rendering InnerStepDay', this.props.substep, job);
    this.programPrices = [];
    this.data.programs.map((program) => {
      if (_.intersection(program.programs, selectedPrograms).length !== 0) {
        const found = _.findWhere(this.programPrices, {session: program.session, right: program.right});
        if (!found) {
          let currentProgramPrice = {
            _id: program._id,
            session: program.session,
            right: program.right
          };
          if (program.right !== 'gratuit') {
            const pricing = _.findWhere(this.data.pricings, {right: program.right});
            if (!pricing) {
              log.warn('No pricing for session:', program.session, 'right:', program.right, 'job:', job);
            } else {
              const pricingForJob = pricing[job];
              if (pricingForJob && pricingForJob.relevancy) {
                currentProgramPrice.amount = pricingForJob.amount;
              } else {
                currentProgramPrice = null;
              }
            }
          } else {
            currentProgramPrice.amount = 0;
          }
          if (currentProgramPrice) {
            currentProgramPrice.hours = _.chain(this.data.programs)
              .where({session: program.session, right: program.right})
              .map((prg) => _.pick(prg, 'begin', 'end', 'conference'))
              .value();
            this.programPrices.push(currentProgramPrice);
          }
        }
      }
    });
    log.debug('programPrices', this.programPrices);
    const nodes = this.programPrices.map((prgPrice, idx) => {
      const hours = prgPrice.hours.map((hour) => {
        const conference = hour.conference !== 'NA' ? ` :  ${hour.conference}` : '';
        return (
          <li key={hour.begin + '-' + hour.end}>De <b>{hour.begin}</b> à <b>{hour.end}</b>{conference}</li>
        );
      });
      let specialInfos = '';
      if (prgPrice.right === 'Jour1') {
        specialInfos = (<div>
          <p className='specialInfos'>Inclus dans Jour 1<br/>
          <i className='fa fa-bullhorn'></i> Une remise est accordée lorsque les droits Jour1 et Jour2 sont sélectionnés.</p>
        </div>);
      } else if (prgPrice.right === 'Jour2') {
        specialInfos = (<div>
          <p className='specialInfos'>Inclus dans Jour 2<br/>
          <i className='fa fa-bullhorn'></i> Une remise est accordée lorsque les droits Jour1 et Jour2 sont sélectionnés.</p>
        </div>);
      } else if (prgPrice.right === 'gratuit') {
        specialInfos = (<div>
          <p className='specialInfos'><i className='fa fa-bullhorn'></i> Gratuit pour toute personne inscrite, soit au Jour1, soit au Jour2.</p>
        </div>);
      }
      const isPriceDisplayed = false;
      return (
        <li key={String(idx)}>
          <div className='ui toggle checkbox'>
            <input
              type='checkbox'
              ref={idx}
              name={prgPrice.right}
              checked={this.state['choice' + idx]}
              onChange={this.handleChange}
            />
          <label>
            <span className='ui header'>{prgPrice.session}</span>
            {
              isPriceDisplayed ? <div>-&nbsp;<span className='price'>{prgPrice.amount},00&nbsp;€</span></div> : ''
            }
           </label>
          </div>
          {specialInfos}
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
        {
          this.programPrices.length !== 0 ?
            (<div className='ui segment'><p><SimpleText page='subscription_step3' text='usage_notice' /></p></div>) :
            ''
        }
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              {
                this.programPrices.length === 0 ?
                  (<div><p><i className='fa fa-bullhorn'></i>&nbsp;Aucune session disponible sur votre sélection de programme pour {this.props.substep}</p><br/></div>) :
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
                <BackButton url={`/subscription?step=3&substep=${this.backStep}`} text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text={`Je valide ma sélection du ${this.props.substep}`} />
              </div>
            </div>
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
