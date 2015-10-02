// A full row including a GoogleMap

// Create a logger
const log = Logger.createLogger('Client GoogleMap');

// Namespace flatteinng
const { Component, findDOMNode } = React;
const { ColorTheme } = SD.Views.Client;

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
        animation: google.maps.Animation.DROP,
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
            zoom: this.dict.location.map.zoom,
            panControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            styles: [
              {
                featureType: 'all',
                elementType: 'all',
                stylers: [
                  {
                    saturation: 1
                  }, {
                    lightness: 1
                  }, {
                    gamma: 1
                  }
                ]
              }, {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'on'
                  }
                ]
              }, {
                featureType: 'all',
                elementType: 'labels',
                stylers: [
                  {
                    visibility: 'on'
                  }
                ]
              }, {
                featureType: 'all',
                elementType: 'labels.text',
                stylers: [
                  {
                    visibility: 'on'
                  }
                ]
              }, {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: ColorTheme.textColor
                  }, {
                    weight: 5.0
                  }
                ]
              }, {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [
                  {
                    color: ColorTheme.bgColor
                  }
                ]
              }, {
                featureType: 'all',
                elementType: 'labels.icon',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                  {
                    color: ColorTheme.bgColor
                  }
                ]
              }, {
                featureType: 'administrative.country',
                elementType: 'all',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'administrative.province',
                elementType: 'all',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'administrative.province',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'administrative.locality',
                elementType: 'all',
                stylers: [
                  {
                    visibility: 'on'
                  }, {
                    weight: 3.0
                  }
                ]
              }, {
                featureType: 'administrative.locality',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'administrative.neighborhood',
                elementType: 'all',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'administrative.neighborhood',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [
                  {
                    color: ColorTheme.bgColor
                  }
                ]
              }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                  {
                    color: ColorTheme.bgColor
                  }
                ]
              }, {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                  {
                    color: ColorTheme.grassColor
                  }
                ]
              }, {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: ColorTheme.highwayColor
                  }, {
                    lightness: 60
                  }, {
                    weight: 1.5
                  }
                ]
              }, {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: ColorTheme.highwayColor
                  }
                ]
              }, {
                featureType: 'road.arterial',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: ColorTheme.roadColor
                  }, {
                    lightness: 60
                  }, {
                    weight: 0.2
                  }
                ]
              }, {
                featureType: 'road.arterial',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: ColorTheme.roadColor
                  }, {
                    weight: 0.2
                  }
                ]
              }, {
                featureType: 'road.arterial',
                elementType: 'labels',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              }, {
                featureType: 'transit',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: ColorTheme.textColor
                  }, {
                    lightness: 40
                  }, {
                    weight: 2.0
                  }
                ]
              }, {
                featureType: 'transit',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: ColorTheme.textColor
                  }
                ]
              }, {
                featureType: 'transit.station.rail',
                elementType: 'all',
                stylers: [
                  {
                    visibility: 'on'
                  }, {
                    hue: ColorTheme.brandColor
                  }
                ]
              }, {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: ColorTheme.waterColor
                  }, {
                    lightness: 60
                  }
                ]
              }, {
                featureType: 'water',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: ColorTheme.waterColor
                  }
                ]
              }
            ]
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
