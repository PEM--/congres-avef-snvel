HomeLayout = React.createClass({
  displayName: 'HomeLayout',
  render() {
    return (
      <div className='main-layout'>
        <header>
          <section className='ui container'>
            <h1>Congrès AVEF - SNVEL</h1>
            <p>Menu principal</p>
          </section>
        </header>
        <main>
          <section className='ui container'>
            <h1>Contenu</h1>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
});

FlowRouter.route('/', {
  action: function() {
    ReactLayout.render(HomeLayout);
  }
});
