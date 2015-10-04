// Namespace flatteinng
const { Component } = React;

class SubscriptionReport extends Component {
  render() {
    return (
      <div>
        <h2>Voici le contenu de votre inscription</h2>
        <p>
          <ul>
            <li>Un message de bienvenu</li>
            <li>Le QR code en pleine page</li>
            <li>Les droits souscrits</li>
            <li>Les conférences disponibles pour ces droits</li>
          </ul>
        </p>
      </div>
    );
  }
}

SD.Views.Client.SubscriptionReport = SubscriptionReport;
