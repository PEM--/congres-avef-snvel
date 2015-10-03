Home = React.createClass({
  render() {
    console.log('Render Home');
    return (
      <div>
        <h1>Home</h1>
        <ul>
          <li><a href='/map'>Map</a></li>
          <li><a href='/form'>Form</a></li>
        </ul>
      </div>
    );
  }
});

FlowRouter.route('/', {
  action: function() { ReactLayout.render(Home); }
});

FlowRouter.route('/map', {
  action: function() { ReactLayout.render(MapWrapper); }
});

FlowRouter.route('/form', {
  action: function() { ReactLayout.render(Views.Form); }
});
