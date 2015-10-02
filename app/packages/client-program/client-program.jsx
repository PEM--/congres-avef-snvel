// Programs selection page

// Create a logger
const log = Logger.createLogger('Client Program');

// Namespace flatteinng
const { Component } = React;

class Selector extends Component {
  render() {
    const { type } = this.props;
    return (
      <select name={type} className={`ui fluid search dropdown ${type}`} style={{opacity: 0}}>
        <option value=''>Skills</option>
        <option value='angular'>Angular</option>
        <option value='css'>CSS</option>
        <option value='design'>Graphic Design</option>
        <option value='ember'>Ember</option>
        <option value='html'>HTML</option>
      </select>
    );
  }
  componentDidMount() {
    $('.dropdown').velocity({opacity: 1}).dropdown();
  }
}

// Program page component
class Program extends Component {
  render() {
    log.debug('Rendering Program');
    return (
      <div className='client main-content ui grid program'>
        <div className='row'>
          <div className='sixteen wide column'>
            <div className='ui grid container'>
              <section className='row'>
                <div className='sixteen wide column'>
                  <h1>Programme</h1>
                  <Selector type='program' />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Routing
const ROUTE_NAME = 'program';
FlowRouter.route(`/${ROUTE_NAME}`, {
  name: ROUTE_NAME,
  action() {
    log.info('Routing to', this.name);
    ReactLayout.render(SD.Views.MainLayout, {
      content: <Program />
    });
  }
});
log.info(`Route ${ROUTE_NAME} declared`);
