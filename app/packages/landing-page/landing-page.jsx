let LandingPage = React.createClass({
  displayName: 'LandingPage',
  render() {
    return (
      <div className='landing-page'>
        <header>
          <section className='ui container'>
            <h1>Congrès AVEF - SNVEL</h1>
          </section>
        </header>
        <main>
          <section className='ui container'>
            <h1>Contenu</h1>
          </section>
        </main>
      </div>
    );
  }
});

// FlowRouter.route('/', {
//   action: function() {
//     ReactLayout.render(MainLayout, {
//       content() {
//         ReactLayout.render(ClientLayout, {
//           content: <LandingPage />
//         });
//       }
//     });
//   }
// });

FlowRouter.route('/', {
  action() {
    ReactLayout.render(ClientLayout, {
      content() {
        return ReactLayout.render(LandingPage);
      }
    });
  }
});

// FlowRouter.route('/', {
//   action() {
//     ReactLayout.render(LandingPage);
//   }
// });
