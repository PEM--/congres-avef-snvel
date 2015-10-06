// A row with dynamic text from DB

// Create a logger
const log = Logger.createLogger('Client LineText');

// Namespace flatteinng
const { Component } = React;
const { BaseReactMeteor } = SD.Views;

class SimpleText extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
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
    log.debug('Rendering SimpleText', this.props.page, this.props.text);
    const { loading, item } = this.data;
    if (loading) {
      return this.loadingRenderer();
    }
    const content = SD.Utils.prettyLink(marked(item.content));
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: content
        }}/>
    );
  }
}

SD.Views.Client.SimpleText = SimpleText;

// LineText component
class LineText extends Component {
  render() {
    log.debug('Rendering LineText');
    const { page, text } = this.props;
    return (
      <div className='sixteen wide column'>
        <div className='fadeIn'>
          <SimpleText page={page} text={text} />
        </div>
      </div>
    );
  }
}

SD.Views.Client.LineText = LineText;
