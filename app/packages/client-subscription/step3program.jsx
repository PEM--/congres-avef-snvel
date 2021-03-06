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
    // Dummy handle (checkbox is handled by Semantic)
    this.handleChange = (e) => {};
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
        if (!profile.programs || profile.programs.length === 0) {
          throw new Meteor.Error('empty_program', 'Votre sélection de programme est vide.');
        }
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
        <div key={program.name} className='sixteen wide field'>
          <div className='ui toggle checkbox'>
            <input
              type='checkbox'
              ref={program.name}
              name={program.name}
              checked={this.state[program.name].checked}
              onChange={this.handleChange}
            />
            <label>{program.text}</label>
          </div>
        </div>
      );
    });
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Sélectionnez vos programmes</h3>
          <p>Le Congrès AVEF/SNVEL 2015 est composé de plusieurs programmes : un
            programme AVEF, un programme SNVEL, un programme commun AVEF/SNVEL et
            un programme EBMS. Pour faciliter la sélection, nous vous invitons à
            sélectionner le (ou les) programmes au(x)quel(s) vous souhaitez participez.<br/><br/>
            Ensuite vous seront proposés, par journée (du lundi (seulement l’EBMS) au jeudi),
            les sessions possibles dans votre(s) programme(s) choisi(s).<br/><br/>
            Certaines sessions (travaux pratiques, travaux dirigés et tables-rondes)
            sont en option avec coût supplémentaire. Les sessions incluses dans le
            tarif à la journée ou pour deux jours sont identifiés par la mention
            "Inclus dans Jour 1 » ou "Inclus dans Jour 2 ». Le diner « Soirée AVEF/SNVEL »
            du mercredi soir est également en option au tarif de 80 euros HT.
            De même les proceeding papiers sont en option.
          </p>
        </div>
        <div className='ui segment'>
          <p><SimpleText page='subscription_step3' text='usage_notice' /></p>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} onChange={this.handleChange}>
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
    $('.checkbox').checkbox();
  }
}

Client.InnerStepProgram = InnerStepProgram;
