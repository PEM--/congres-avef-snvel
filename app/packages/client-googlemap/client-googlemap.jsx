// A full row including a GoogleMap

// Create a logger
const log = Logger.createLogger('Client GoogleMap');

// Namespace flatteinng
const { Component, findDOMNode } = React;

// Client only
if (Meteor.isClient) {
  // Load GoogleMaps
  Meteor.startup(() => {
    GoogleMaps.load();
    log.info('Google map loaded');
  });

  // Customize GoogleMaps
  Template.BlazeContainerMap.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });
}

// GoogleMap compoment
class ReactGoogleMap extends SD.Views.ReactDictionary {
  constructor(props) {
    super(props);
    this.render = () => {
      log.debug('Rendering GoogleMap');
      const { dict } = this.data;
      return (
        <div className='row client googlemap'>
          <div ref='googlemapContainer' className='googlemapContainer' />
        </div>
      );
    };
    // this.componentDidMount = () => {
    //   this.view = Blaze.render(Template.BlazeContainerMap, findDOMNode(this.refs.googlemapContainer));
    // };
    // this.componentWillUnmount = () => {
    //   Blaze.remove(this.view);
    // };
  }
}

SD.Views.Client.ReactGoogleMap = ReactGoogleMap;
