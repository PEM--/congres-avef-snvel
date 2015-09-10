ClientLayout = React.createClass({
  displayName: 'ClientLayout',
  render() {
    return (
      <div className='client-layout'>
        {this.props.content}
        <Footer />
      </div>
    );
  }
});
