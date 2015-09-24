// Define base react components

// Namespace flatteinng
const { createClass } = React;

// @TODO Remove this unecessary package
Rc.MeteorReactBaseComponent = createClass({
  mixins: [ReactMeteorData],
  render() {}
});
