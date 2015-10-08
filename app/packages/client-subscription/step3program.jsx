// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStepProgram extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
    this.programs = [
      { name: 'avef', text: 'AVEF'},
      { name: 'snvel', text: 'SNVEL'},
      { name: 'ebms', text: 'EBMS'}
    ];
    this.handleSubmit = (e) => {
      e.preventDefault();
      log.info('Valid forms');
      try {
        const {snvel, avef, status} = this.props;
        let job = '';
        if (status) {
          job = 'snvelDelegate';
        } else if (snvel) {
          job = 'snvel';
        } else {
          job = 'avef';
        }
        const profile = _.extend(_.clone(Meteor.user().profile), {
          snvel,
          avef,
          status,
          job
        });
        check(profile, SD.Structure.CitySchema);
        // Insert data on base if different from props
        if (this.props.postalcode !== this.state.postalcode ||
            this.props.postalcode !== this.state.postalcode) {
          Meteor.call('updateCity', fullCity, (error) => {
            if (error) {
              log.debug('Error while checking SubscriptionStep1 values', error);
              this.setState({error});
            }
          });
        }
        // Reset potential displayed error
        this.setState({error: ''});
        // Go to next inner step
        // @TODO Check program's availability on days
        //FlowRouter.go(`/subscription?step=3&substep=program`);
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
    const nodes = this.programs.map((program) => {
      return (
        <div className='sixteen wide field'>
          <div className='ui toggle checkbox'>
            <input type='checkbox' ref={program.name} name={program.name} />
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
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              {nodes}
            </div>
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url={`/subscription?step=3&substep=${backStep}`} text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text='Je confirme ces informations' />
              </div>
            </div>
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
          </form>
          <ErrorMessage
            title="Votre sélection de programmes n'est pas valide."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
      </div>
    );
  }
}

Client.InnerStepProgram = InnerStepProgram;
