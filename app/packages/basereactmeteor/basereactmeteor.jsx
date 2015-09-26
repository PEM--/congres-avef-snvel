// Menu

// Namespace flatteinng
const { createClass } = React;

const BaseReactMeteor = createClass({
  // Handle connexion and admin access
  mixins: [ReactMeteorData],
  // Overide this
  render() { return null; }
});

Rc.BaseReactMeteor = BaseReactMeteor;
