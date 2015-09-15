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
      <div className='ui grid'>
        <div className='one wide column'>
          <div className='red'>Menu</div>
          <div className='blue'>Contenu</div>
        </div>
      </div>
    );

  }
});
