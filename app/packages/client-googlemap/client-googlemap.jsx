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
  Template.BlazeContainerMap.onCreated(() => {
    this.handle = SD.Structure.dictionary.subAll();
    // Add a marker at the middle of the map which is already centered on the event
    GoogleMaps.ready('map', (map) => {
      const marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance,
        // Animate the marker with a bounce effect
        animation: google.maps.Animation.BOUNCE,
        title: this.dict.name,
        icon: {
          url: '/img/pin.svg',
          size: new google.maps.Size(40, 55),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 55)
        }
      });
    });
  });
  Template.BlazeContainerMap.helpers({
    mapOptions: () => {
      if (this.handle.ready()) {
        if (GoogleMaps.loaded()) {
          this.dict = SD.Structure.dictionary.collection.findOne();
          log.info('Map informations', this.dict.location.map);
          return {
            center: new google.maps.LatLng(
              this.dict.location.map.lat,
              this.dict.location.map.long),
            zoom: this.dict.location.map.zoom
          };
        }
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
    this.componentDidMount = () => {
      this.view = Blaze.render(Template.BlazeContainerMap, findDOMNode(this.refs.googlemapContainer));
    };
    this.componentWillUnmount = () => {
      Blaze.remove(this.view);
    };
  }
}

SD.Views.Client.ReactGoogleMap = ReactGoogleMap;
