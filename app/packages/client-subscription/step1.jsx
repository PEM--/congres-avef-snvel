// Namespace flatteinng
const { Component, findDOMNode } = React;
const { ErrorMessage } = SD.Views.Client;

class SubscriptionStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      message: ''
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      // Reset former error
      this.setState({error: ''});
      const email = findDOMNode(this.refs.email).value.trim().toLowerCase();
      const password = findDOMNode(this.refs.password).value.trim();
      const repassword = findDOMNode(this.refs.repassword).value.trim();
      const lastname = findDOMNode(this.refs.lastname).value.trim();
      const firstname = findDOMNode(this.refs.firstname).value.trim();
      log.debug('Submit with value', email);
      try {
        // Check user's imputs
        check({
          login: {email, password},
          repassword,
          userInfo: {firstname, lastname}
        }, SD.Structure.AccountCreationSchema);
        log.info('Correct transmitted user\'s value');
        // Reset potential former error
        this.setState({error: ''});
        // Create account
        // @TODO Meteor.call('createAccount', email, password, repassword, firstname, lastname, (error) => {
        //   if (error) {
        //     log.debug('Error while checking SubscriptionStep1 values', error);
        //     this.setState({error});
        //     return;
        //   }
          log.info('Account creation success');
          FlowRouter.setQueryParams({step: 2});
        // });
      } catch (error) {
        log.debug('Error while checking SubscriptionStep1 values', error);
        this.setState({error});
      } finally {
        // Empty password field in any case
        findDOMNode(this.refs.password).value = '';
        findDOMNode(this.refs.repassword).value = '';
      }

    };
  }
  render() {
    log.debug('Rendering SubscriptionStep1');
    const segments = [
      {
        name: 'Authentification', fields: [
          {icon: 'envelope', type: 'text', name: 'email', text: 'Votre e-mail'},
          {icon: 'unlock', type: 'password', name: 'password', text: 'Votre mot de passe'},
          {icon: 'unlock', type: 'password', name: 'repassword', text: 'Confirmer votre mot de passe'}
        ]
      },
      {
        name: 'Identification', fields: [
          {icon: 'user', type: 'text', name: 'lastname', text: 'Votre nom'},
          {icon: 'user', type: 'text', name: 'firstname', text: 'Votre prénom'}
        ]
      }
    ];
    const nodes = segments.map((segment) => {
      return (
        <div key={segment.name} className='ui segment'>
          <h3>{segment.name}</h3>
          {
            segment.fields.map((field) => {
              return (
                <div key={`${segment.name}-${field.name}`} className='field'>
                  <div className='ui left icon input'>
                    <i className={`fa fa-${field.icon} icon`}></i>
                    <input type={field.type} name={field.name} ref={field.name} placeholder={field.text} />
                  </div>
                </div>
              );
            })
          }
        </div>
      );
    });
    return (
      <div>
        <h2>Créer votre compte</h2>
        <form className='ui large form' onSubmit={this.handleSubmit}>
          <div className='ui stacked segment'>
            {nodes}
            <button
              type='submit'
              className='ui fluid large submit button primary'
            >
              Je m'inscris
            </button>
          </div>
        </form>
        <ErrorMessage
          title="Votre inscription n'est pas correcte."
          error={ErrorMessage.asProps(this.state.error)}
        />
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep1 = SubscriptionStep1;
