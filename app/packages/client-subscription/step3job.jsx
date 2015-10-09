// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStepJob extends Component {
  constructor(props) {
    super(props);
    this.jobs = ['basic', 'seniorJuniorVetCcp', 'nurseDentistSmith', 'junior'];
    this.state = {
      error: ''
    };
    // Dummy handle
    this.handleChange = (e) => {};
    this.handleSubmit = (e) => {
      e.preventDefault();
      let selectedJob = null;
      for (let job of this.jobs) {
        if (findDOMNode(this.refs['jobs' + job]).checked) {
          selectedJob = job;
        }
      }
      if (!selectedJob) {
        this.setState({error: 'Sélection de profession manquante'});
        return;
      }
      log.info('User selected job', selectedJob);
      try {
        const profile = _.extend(_.clone(Meteor.user().profile), { job: selectedJob });
        check(profile, SD.Structure.UserSubscriberSharedSchema);
        // Insert data on base if different from props
        Meteor.call('updateProfile', profile, (error) => {
          if (error) {
            log.debug('Error while checking InnerStepJob values', error);
            this.setState({error});
            return;
          }
          // Reset potential displayed error
          this.setState({error: ''});
          // Go to next inner step
          FlowRouter.go(`/subscription?step=3&substep=program`);
        });
      } catch (error) {
        log.debug('Error while checking InnerStepJob values', error);
        this.setState({error});
      }
    };
  }
  render() {
    log.info('Rendering InnerStepJob');
    const user = Meteor.user();
    const choices = this.jobs.map((job) => {
      let defaultValue = user.profile && user.profile.job && user.profile.job === job;
      return (
        <div className='field' key={job}>
          <div className='ui radio checkbox'>
            <input
              type='radio'
              ref={'jobs' + job}
              value={job}
              name='jobs'
              className='hidden'
              checked={defaultValue}
              onChange={this.handleChange}
            />
            <label>{SD.Structure.pricings.schema.getDefinition(job).label}</label>
          </div>
        </div>
      );
    });
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Votre profession</h3>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='grouped fields'>
              <label>Veuillez indiquer votre profession :</label>
              {choices}
            </div>
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url='/subscription?step=3'text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text='Je valide ma profession' />
              </div>
            </div>
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
            <p><SimpleText page='subscription_step3' text='no_subscriber_info' /></p>
          </form>
          <ErrorMessage
            title="Votre profession n'est pas correcte."
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

Client.InnerStepJob = InnerStepJob;
