if (Meteor.isServer) {
  //ReactGoogleMap = Meteor.npmRequire('react-google-maps');
  //ReactMaps = Meteor.npmRequire('react-maps');
  //GoogleMapReact = Meteor.npmRequire('google-map-react');
}

//const { GoogleMap } = ReactGoogleMap;


if (Meteor.isClient) {

  Template.map.helpers({
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

MapWrapper = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Template.map,
      React.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    console.log('Render container');
    return (<div ref='container' />);
  }
});

if (Meteor.isClient) {
  Meteor.startup(() => {
    console.log('Load map');
    GoogleMaps.load();
  });
}
