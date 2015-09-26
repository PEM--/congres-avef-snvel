// Loader animation using SpinKit

// Create a logger
const log = Logger.createLogger('Admin Home');

// Create the component
class Spinkit extends React.Component {
  render() {
    log.debug('Rendering');
    // let nodes = [];
    // for (let idx = 0; idx < 9; idx++) {
    //   nodes.push(<div />);
    // }
    // return (<div className="spinner spinner-cube-grid">{nodes}</div>);
    //return (<div className="spinner spinner-double-bounce"></div>);
    let nodes = [];
    for (let idx = 0; idx < 3; idx++) {
      nodes.push(<div key={`spinner${idx}`} />);
    }
    return (<div className="spinner spinner-three-bounce">{nodes}</div>);
  }
}

Rc.Client.Spinkit = Spinkit;
