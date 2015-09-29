// Main layout of the client and admin applications

// Metatags: http://www.metatags.org
// Twitter cards:
// * Specs: https://dev.twitter.com/cards/types
// * Validator: https://cards-dev.twitter.com/validator
// Open Graph:
// * Specs: http://ogp.me/
// * FaceBook validator: https://developers.facebook.com/tools/debug/
// * Google validator: https://developers.google.com/structured-data/testing-tool/
// Rich snippets v2:
// * https://developers.google.com/structured-data/rich-snippets/
// * Validator + Example: https://developers.google.com/structured-data/testing-tool/
//
// Needs additional socials for:
// * Pinterest
// * LinkedIn
//   * https://developer.linkedin.com/docs/share-on-linkedin
// * G+

// Namespace flatteinng
const { Component } = React;

// Create a logger
const log = Logger.createLogger('MainLayout');

// MainLayout component
class MainLayout extends SD.Views.BaseReactMeteor {
  getMeteorData() {
    // Subscribe to get the dictionary content
    const handle = SD.Structure.dictionary.subAll();
    return {
      // Use handle to show loading state
      loading: !handle.ready(),
      // Get the content of the basic page
      dict: handle.ready() ? SD.Structure.dictionary.collection.findOne() : ''
    };
  }
  render() {
    const { loading, dict } = this.data;
    if (!loading) {
      // Title
      DocHead.setTitle(dict.title);
      // Title for mobile bookmarks and shortcuts
      DocHead.addMeta({name: 'apple-mobile-web-app-title', content: dict.title});
      DocHead.addMeta({name: 'application-name', content: dict.title});
      // Colors for Windows phone and desktop
      DocHead.addMeta({name: 'msapplication-TileColor', content: dict.msTileColor});
      DocHead.addMeta({name: 'theme-color', content: dict.msTileColor});
      // Others meta tags
      [
        'description',
        'author',
        'copyright',
        'distribution',
        'language',
        'rating',
        'reply-to',
        'web-author'
      ].map(function (meta) {
        const obj = {name: meta, content: dict[meta]};
        log.debug('Meta', obj);
        DocHead.addMeta(obj);
      });
      log.info('Title, description and metatags added');
      // Social tags
      // Twitter card
      [
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@AVEF_'},
        {name: 'twitter:creator', content: '@AVEF_'},
        {name: 'twitter:title', content: 'Je me suis inscrit au congrès - Inscrivez-vous !'},
        {name: 'twitter:description', content: dict.description},
        // 499x350
        {name: 'twitter:image', content: `${Meteor.settings.public.proxy.url}img/twitter_card.jpg`}
      ].map(function(meta) {
        const obj = {name: meta.name, content: meta.content};
        log.debug('Meta', obj);
        DocHead.addMeta(obj);
      });
      log.info('Twitter card added');
      // Open graph
      [
        {name: 'og:title', content: dict.shortTitle},
        {name: 'og:type', content: 'website'},
        {name: 'og:site_name', content: Meteor.settings.public.proxy.url},
        {name: 'og:locale', content: 'fr_FR'},
        // 484x252
        {name: 'og:image', content: `${Meteor.settings.public.proxy.url}img/open_graph.jpg`}
      ].map(function(meta) {
        const obj = {name: meta.name, content: meta.content};
        log.debug('Meta', obj);
        DocHead.addMeta(obj);
      });
      log.info('Open graph added');
      // Rich snippets v2
      [
        // Contact, logo, social links
        {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          url: `${Meteor.settings.public.proxy.url}`,
          logo: `${Meteor.settings.public.proxy.url}img/logo.svg`,
          contactPoint: {
            '@type': 'ContactPoint',
            email: dict['reply-to'],
            contactType: 'Information et contact'
          }
        },
        // AVEF
        {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          url: 'http://www.avef.fr',
          logo: `${Meteor.settings.public.proxy.url}img/avef.svg`
        },
        // SNVEL
        {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          url: 'http://www.snvel.fr',
          logo: `${Meteor.settings.public.proxy.url}img/snvel.svg`
        },
      ].map(function(snippet) {
        DocHead.addLdJsonScript(snippet);
      });
    }
    log.debug('Rendering');
    return (
      <div>
        <SD.Views.Client.Menu />
        <div className='main-layout'>
          {this.props.content}
          <SD.Views.Client.Footer />
        </div>
      </div>
    );
  }
}

// Export class
SD.Views.MainLayout = MainLayout;
