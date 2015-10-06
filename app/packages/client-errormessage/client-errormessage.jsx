// Error message

// Create a logger
const log = Logger.createLogger('Client Error message');

// Namespace flatteinng
const { Component } = React;

class ErrorMessage extends Component {
  // Render the component
  render() {
    const { title, error } = this.props;
    log.debug('Rendering ErrorMessage', error);
    const errorMessage = error !== '' ? (
      <div className='ui error message'>
        <div className='error content'>
          <div className='header'><i className='fa fa-warning'></i>&nbsp;
            {title}
          </div>
          <p>{error}</p>
        </div>
      </div>
    ) : <div style={{display: 'hidden'}} />;
    return errorMessage;
  }
}

ErrorMessage.asProps = (error) => {
  // SimpleSchema errors
  if (error.invalidKeys) {
    return error.invalidKeys[0].message;
  }
  // Classic exception errors
  if (error.message) {
    return error.message;
  }
  // Simple text error
  return error;
};

SD.Views.Client.ErrorMessage = ErrorMessage;
