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

FlowRouter.route('/', { action: () => ReactLayout.render(Home) });

FlowRouter.route('/map', { action: () => ReactLayout.render(MapWrapper) });

FlowRouter.route('/form', {
  action: (params, queryParams) => ReactLayout.render(Views.Form, queryParams)
});
