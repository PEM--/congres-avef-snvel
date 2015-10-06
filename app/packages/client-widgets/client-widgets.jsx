// A set of small re-usable widgets

// Create a logger
const log = Logger.createLogger('Client Widgets');

// Namespace flatteinng
const { Component } = React;

// AnimatedButton component
class AnimatedButton extends Component {
  render() {
    log.debug('Rendering AnimatedButton');
    const { disabled, anim, icon, text } = this.props;
    const disabledClass = disabled ? 'disabled' : '';
    const animName = anim ? anim : '';
    return (
      <button
        type='submit'
        className={`ui fluid large submit animated ${animName} ${disabledClass} button primary`} tabindex="0">
        <div className='visible content'>{text}</div>
        <div className='hidden content'>
          <i className={`fa fa-lg fa-${icon} icon`}></i>
        </div>
      </button>
    );
  }
}

SD.Views.Client.AnimatedButton = AnimatedButton;
