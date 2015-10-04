// Namespace flatteinng
const { Component } = React;

class SubscriptionStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      message: ''
    };
    this.infoEntered = (e) => {
      e.preventDefault();
      log.debug('User entered info:', e);
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      log.debug('User submit form:', e);
    };
  }
  render() {
    log.debug('Rendering SubscriptionStep1');
    const errorMessage = this.state.error !== '' ? (
      <div className='ui error message'>
        <div className='error content'>
          <div className='header'><i className='fa fa-warning'></i>Votre inscription n'est pas correcte.</div>
          <p>{this.state.error}</p>
        </div>
      </div>
    ) : '';
    const segments = [
      {
        name: 'Authentification', fields: [
          {icon: 'envelope', name: 'email', text: 'Votre e-mail'},
          {icon: 'unlock', name: 'password', text: 'Votre mot de passe'},
          {icon: 'unlock', name: 'repassword', text: 'Confirmer votre mot de passe'}
        ]
      },
      {
        name: 'Identification', fields: [
          {icon: 'user', name: 'lastname', text: 'Votre nom'},
          {icon: 'user', name: 'firstname', text: 'Votre prénom'},
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
                    <input type='text' name={field.name} ref={field.name} placeholder={field.text} />
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
        <form className='ui large form' onSubmit={this.handleSubmit} onChange={this.infoEntered}>
          <div className='ui stacked segment'>
            {nodes}
            <button type='submit' className='ui fluid large submit button primary'>Je m'inscris</button>
          </div>
        </form>
        {errorMessage}
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep1 = SubscriptionStep1;
