// Loader animation using SpinKit

// Create a logger
const log = Logger.createLogger('Admin Home');

//
const Spinkit = React.createClass({
  displayName: 'Spinkit',
  render() {
    log.debug('Rendering');
    let nodes = [];
    for (let idx = 0; idx < 9; idx++) {
      nodes.push(<div />);
    }
    return (<div className="spinner spinner-cube-grid">{nodes}</div>);
  }
});

Rc.Client.Spinkit = Spinkit;
