// Namespace flatteinng
const { Component, findDOMNode } = React;
const { ReactDictionary, Client } = SD.Views;
const { ErrorMessage, AnimatedButton } = Client;
const { Cookie } = SD.Utils;

class SubscriptionStep1 extends ReactDictionary {
  constructor(props) {
    super(props);
    this.state = { error: '' };
    this.handleSubmit = (e) => {
      e.preventDefault();
      // Reset former error
      this.setState({error: ''});
      const email = findDOMNode(this.refs.email).value.trim().toLowerCase();
      const password = findDOMNode(this.refs.password).value.trim();
      const repassword = findDOMNode(this.refs.repassword).value.trim();
      const lastName = textInputFormatter(findDOMNode(this.refs.lastName).value.trim());
      const firstName = textInputFormatter(findDOMNode(this.refs.firstName).value.trim());
      log.debug('Submit with value', email);
      try {
        let accountInfo = {
          login: {email, password},
          repassword,
          userInfo: {firstName, lastName}
        };
        // Check user's imputs
        check(accountInfo, SD.Structure.AccountCreationSchema);
        log.info('Correct transmitted user\'s value');
        // Reset potential former error
        this.setState({error: ''});
        // Create account
        Meteor.call('createAccount', accountInfo, (error) => {
          if (error) {
            log.debug('Error while checking SubscriptionStep1 values', error);
            this.setState({error});
            return;
          }
          log.info('Account creation success');
          Cookie.get(this.data.dict).subscribe();
          FlowRouter.go('/subscription?step=2');
        });
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
    const { loading, dict } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    const isCookieAccepted = Meteor.isClient ? Cookie.get(dict).isAccepted() : false;
    const segments = [
      {
        name: 'Authentification', fields: [
          {icon: 'envelope', type: 'text', name: 'email', text: 'Votre e-mail'},
          {icon: 'unlock', type: 'password', name: 'password', text: 'Choisissez votre mot de passe'},
          {icon: 'unlock', type: 'password', name: 'repassword', text: 'Confirmez votre mot de passe'}
        ]
      },
      {
        name: 'Identification', fields: [
          {icon: 'user', type: 'text', name: 'lastName', text: 'Votre nom'},
          {icon: 'user', type: 'text', name: 'firstName', text: 'Votre prénom'}
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
                <div
                    key={`${segment.name}-${field.name}`}
                    className={`field ${isCookieAccepted ? '' : 'disabled'}`}
                  >
                  <div className='ui left icon input'>
                    <input type={field.type} name={field.name} ref={field.name} placeholder={field.text} />
                    <i className={`fa fa-${field.icon} icon`}></i>
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
        <h2>Créez votre compte</h2>
        <form className='ui large form' onSubmit={this.handleSubmit}>
          <div className='ui stacked segment'>
            {nodes}
            <AnimatedButton disabled={!isCookieAccepted} anim='fade' icon='pencil' text="Je m'inscris" />
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
