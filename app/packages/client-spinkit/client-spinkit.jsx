// Loader animation using SpinKit

// Create a logger
const log = Logger.createLogger('Admin Home');

// Create the component
class Spinkit extends React.Component {
  render() {
    log.debug('Rendering');
    let nodes = [];
    for (let idx = 0; idx < 3; idx++) {
      nodes.push(<div key={`spinner${idx}`} />);
    }
    return (<div className='spinner spinner-three-bounce'>{nodes}</div>);
  }
}

SD.Views.Client.Spinkit = Spinkit;
