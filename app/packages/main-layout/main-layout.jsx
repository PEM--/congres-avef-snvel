// Main layout of the client and admin applications

// Namespace flatteinng
const { PropTypes, createClass } = React;

// Create a logger
const log = Logger.createLogger('MainLayout');

// MainLayout component
Rc.MainLayout = createClass({
  displayName: 'Rc.MainLayout',
  propTypes: { content: PropTypes.object.isRequired },
  render() {
    log.debug('Rendering');
    // return (
    //   <div className='main-layout ui equal width stackable centered aligned padded grid'>
    //     <div className='orange row'>
    //       <div className='column'>
    //         <div className='ui container'>
    //           <h1>Menu</h1>
    //         </div>
    //       </div>
    //     </div>
    //     <div className='red row'>
    //       <div className='column'>
    //         <div className='ui container'>
    //           {this.props.content}
    //         </div>
    //       </div>
    //     </div>
    //     <Rc.Client.Footer />
    //   </div>
    // );
    return (
      <div className='main-layout ui grid'>
        <header className='orange row'>
          <div className='red column'>
            <div className='ui centered grid container'>
              <div className='brown column'>
                <h1>Menu</h1>
              </div>
            </div>
          </div>
        </header>
        <div className='pink row'>
          <div className='violet column'>
            <div className='ui centered grid container'>
              <div className='purple column'>
                <h1>Contenu</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
});
