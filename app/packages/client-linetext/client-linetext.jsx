// A row with dynamic text from DB

// Create a logger
const log = Logger.createLogger('Client LineText');

// Namespace flatteinng
const { Component } = React;

// LineText component
class LineText extends SD.Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    log.warn('*** getMeteorData');
    const { page, text } = this.props;
    const handle = SD.Structure.texts.subWithPageWithText(page, text);
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Expose text
      item: handle.ready() ? SD.Structure.texts.collection.findOne({page, text}) : ''
    };
  }
  render() {
    log.warn('*** render');
    log.debug('Rendering LineText', this.props.page, this.props.text);
    const { loading, item } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    const nodes = (
      <div className='fadeIn'>
        <div
          dangerouslySetInnerHTML={{__html: SD.Utils.prettyLink(marked(item.content))}}
        />
      </div>
    );
    return (<div className='sixteen wide column'>{nodes}</div>);
  }
}

SD.Views.Client.LineText = LineText;
