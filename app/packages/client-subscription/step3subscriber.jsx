// Namespace flatteinng
const { Component, findDOMNode } = React;
const { BaseReactMeteor, Client } = SD.Views;
const { AnimatedButton, BackButton, SimpleText, ErrorMessage } = Client;

class InnerStepSubscriber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
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
        const profile = _.extend(_.clone(Meteor.user().profile), { snvel, avef, status, job });
        check(profile, SD.Structure.UserSubscriberSharedSchema);
        // Insert data on base if different from props
        Meteor.call('updateProfile', profile, (error) => {
          if (error) {
            log.debug('Error while checking InnerStepSubscriber values', error);
            this.setState({error});
          }
          // Reset potential displayed error
          this.setState({error: ''});
          // Go to next inner step
          FlowRouter.go(`/subscription?step=3&substep=program`);
        });
      } catch (error) {
        log.debug('Error while checking InnerStepSubscriber values', error);
        this.setState({error});
      }
    };
  }
  render() {
    log.info('Rendering InnerStepSubscriber');
    const {snvel, avef, status} = this.props;
    return (
      <div className='ui segments inner-step'>
        <div className='ui segment'>
          <h3>Votre type d'adhésion</h3>
        </div>
        <div className='ui segment'>
          <ul>
            { avef ? (<li>Vous êtes l'adhérent(e) AVEF n° <b>{avef}</b>.</li>) : (<li>Vous n'êtes pas adhérent(e) à l'AVEF.</li>) }
            { snvel ? (<li>Vous êtes l'adhérent(e) SNVEL n° <b>{snvel}</b>.</li>) : (<li>Vous n'êtes pas adhérent(e) au SNVEL.</li>) }
            { status ? (<li>Vous êtes délégué(e) ou administrateur(trice).</li>) : (<li>Vous n'êtes ni délégué, ni administrateur du SNVEL.</li>) }
          </ul>
        </div>
        <div className='ui segment'>
          <form className='ui large form' onSubmit={this.handleSubmit} >
            <div className='fields'>
              <div className='three wide field'>
                <BackButton url='/subscription?step=3'text='Retour' />
              </div>
              <div className='thirteen wide field'>
                <AnimatedButton icon='arrow-right' text='Je confirme ces informations' />
              </div>
            </div>
            <p><SimpleText page='subscription_step3' text='check_info' /></p>
          </form>
          <ErrorMessage
            title="Votre type d'adhésion n'est pas correct."
            error={ErrorMessage.asProps(this.state.error)}
          />
        </div>
      </div>
    );
  }
}

Client.InnerStepSubscriber = InnerStepSubscriber;
