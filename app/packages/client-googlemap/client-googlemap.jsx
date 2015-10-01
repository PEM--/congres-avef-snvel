// A full row including a GoogleMap

// Create a logger
const log = Logger.createLogger('Client GoogleMap');

// Namespace flatteinng
const { Component, findDOMNode } = React;

// Load GoogleMaps
if (Meteor.isClient) {
  Meteor.startup(() => {
    GoogleMaps.load();
  });
}

// GoogleMap compoment
class GoogleMap extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
    this.render = () => {
      log.debug('Rendering GoogleMap');
      const { dict } = this.data;
      return (
        <div className='row client googlemap'>
          <div ref='googlemapContainer' className='googlemapContainer'>
            La carte est en cours de chargement.
          </div>
        </div>
      );
    };
    this.componentDidMount = () => {
      this.view = Blaze.render(Template.googleMap, findDOMNode(this.refs.googlemapContainer));
    };
  }
}

SD.Views.Client.GoogleMap = GoogleMap;
