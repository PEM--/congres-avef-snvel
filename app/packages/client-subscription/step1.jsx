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
    return (
      <div>
        <h2>Créer votre compte</h2>
        <form className='ui large form' onSubmit={this.handleSubmit} onChange={this.infoEntered}>
          <div className='ui stacked segment'>
            <div className='field'>
              <div className='ui left icon input'>
                <i className='fa fa-envelope icon'></i>
                <input type='text' name='email' ref='email' placeholder='Votre e-mail'/>
              </div>
            </div>
            <div className='field'>
              <div className='ui left icon input'>
                <i className='fa fa-unlock icon'></i>
                <input type='password' name='password' ref='password' placeholder="Votre mot de passe"/>
              </div>
            </div>
            <div className='field'>
              <div className='ui left icon input'>
                <i className='fa fa-unlock icon'></i>
                <input type='password' name='repassword' ref='repassword' placeholder="Confirmez votre mot de passe"/>
              </div>
            </div>
            <button type='submit' className='ui fluid large submit button primary'>Je m'inscris</button>
          </div>
        </form>
        {errorMessage}
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep1 = SubscriptionStep1;
