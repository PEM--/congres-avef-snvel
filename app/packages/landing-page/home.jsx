HomeLayout = React.createClass({
  render() {
    return (
      <div>
        <header>
          <h1>Congrès AVEF - SNVEL</h1>
          <p>Menu principal</p>
        </header>
        <main>
          <h1>Contenu</h1>
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
