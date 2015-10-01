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

Home = React.createClass({
  render() {
    console.log('Render Home');
    return (
      <div>
        <h1>Home</h1>
        <MapWrapper />
      </div>
    );
    // return (
    //   <div>
    //     <h1>Home</h1>
    //     <GoogleMap
    //       containerProps={{
    //         ...this.props,
    //         style: {
    //           height: "100%",
    //         }
    //       }}
    //       ref="map"
    //       defaultZoom={3}
    //       defaultCenter={{lat: -25.363882, lng: 131.044922}}
    //     ></GoogleMap>
    //   </div>
    // );
  }
});

FlowRouter.route('/', {
  action: function() {
    ReactLayout.render(Home);
  }
});
