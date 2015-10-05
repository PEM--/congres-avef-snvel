// Namespace flatteinng
const { Component } = React;

class SubscriptionStep2 extends Component {
  render() {
    return (
      <div className='ui icon message step2'>
        <i className='fa fa-hourglass-half fa-4x'></i>
        <div className='content'>
          <h2 className='header'>Validation de votre email</h2>
          <p>Un email de vérification vous a été transmis.</p>
          <p>
            Une fois reçu, veuillez cliquer le lien contenu dans ce dernier
            pour passer à la prochaine étape de votre inscription.
          </p>
          <p>
            Si vous avez démarré votre inscription sur un navigateur
            ou appareil différent, il est nécessaire de
            &nbsp;<a className='animated' href='/login'>vous connecter</a>&nbsp;
            pour poursuivre.
          </p>
        </div>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionStep2 = SubscriptionStep2;
