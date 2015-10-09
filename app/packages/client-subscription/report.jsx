// Namespace flatteinng
const { Component } = React;
const { LineText } = SD.Views.Client;

// @TODO <h2>Voici le contenu de votre inscription</h2>
// <p>
//   <ul>
//     <li>Un message de bienvenu</li>
//     <li>Le QR code en pleine page</li>
//     <li>Les droits souscrits</li>
//     <li>Les conférences disponibles pour ces droits</li>
//   </ul>
// </p>


class SubscriptionReport extends Component {
  render() {
    return (
      <div>
        <LineText page='subscription_recap' text='congratulation' />
      </div>
    );
  }
}

SD.Views.Client.SubscriptionReport = SubscriptionReport;
