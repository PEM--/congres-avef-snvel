// Menu

// Namespace flatteinng
const { createClass } = React;

const BaseReactMeteor = createClass({
  // Handle connexion and admin access
  mixins: [ReactMeteorData],
  // Overide this
  render() { return null; },
  loadingRenderer() {
    return (
      <div>
        <p>Chargement en cours...</p>
        <SD.Views.Client.Spinkit />
      </div>
    );
  }
});

class ReactDictionary extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    // Subscribe to get the dictionary content
    const handle = SD.Structure.dictionary.subAll();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of dictionary
      dict: handle.ready() ? SD.Structure.dictionary.collection.findOne() : '',
    };
  }
}

SD.Views.BaseReactMeteor = BaseReactMeteor;
SD.Views.ReactDictionary = ReactDictionary;
