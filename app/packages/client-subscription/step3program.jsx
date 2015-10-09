// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStepProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      AVEF: { checked: false },
      SNVEL: { checked: false },
      EBMS: { checked: false }
    };
    this.programs = [
      { name: 'AVEF', text: 'AVEF'},
      { name: 'SNVEL', text: 'SNVEL'},
      { name: 'EBMS', text: 'EBMS'}
    ];
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
          FlowRouter.go('/subscription?step=3&substep=Lundi');
        });
      } catch (error) {
        log.debug('Error while checking InnerStepProgram values', error);
        this.setState({error});
      }
    };
  }
  render() {
    const job = Meteor.user().profile.job;
    const backStep = (job === 'avef' || job === 'snvel' || job === 'snvelDelegate') ? 'subscriber' : 'job';
    log.info('Rendering InnerStepProgram');
    // Update selection if user has made one previously
    const userPrograms = Meteor.user().profile.programs;
    if (userPrograms) {
      userPrograms.forEach((prg) => {
        this.state[prg].checked = true;
      });
    }
    const nodes = this.programs.map((program) => {
      return (
        <div className='sixteen wide field'>
          <div className='ui toggle checkbox'>
            <input
              type='checkbox'
              key={program.name}
              ref={program.name}
              name={program.name}
              checked={this.state[program.name].checked}
            />
            <label>{program.text}</label>
          </div>
        </div>
      );
    });
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Sélectionner vos programmes</h3>
        </div>
        <div className='ui segment'>
          <p><SimpleText page='subscription_step3' text='usage_notice' /></p>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              {nodes}
            </div>
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url={`/subscription?step=3&substep=${backStep}`} text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text='Je valide ma sélection' />
              </div>
            </div>
          </form>
          <ErrorMessage
            title="Votre sélection de programmes n'est pas valide."
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

Client.InnerStepProgram = InnerStepProgram;
