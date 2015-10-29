// Options used on the server and the client
const sharedOptions = {
  name: 'Dictionary',
  schema: {
    title: { type: String, label: 'Titre', min: 5, max: 256 },
    shortTitle: { type: String, label: 'Titre court', min: 5, max: 32 },
    msTileColor: {
      type: String, label: 'Couleur des tuiles Microsoft', min: 7, max: 7,
      autoform: {afFieldInput: {type: 'color'}}
    },
    startDate: { type: Date, label: 'Date de démarrage de l\'événement', min: 10, max: 10,
      autoform: {afFieldInput: {type: 'date'}}
    },
    endDate: {
      type: Date, label: 'Date de fin de l\'événement', min: 10, max: 10,
      autoform: {afFieldInput: {type: 'date'}}
    },
    cookie: { type: Object, label: 'Définition du cookie' },
    'cookie.name': { type: String, label: 'Nom' },
    'cookie.text': { type: String, label: 'Texte d\'information', min: 10, max: 512 },
    'cookie.expires': { type: Number, label: 'Expiration (en J)', min: 1, max: 365 },
    meta: { type: Object, label: 'Métadonnées du site' },
    'meta.description': {
      type: String, label: 'Description', min: 10, max: 512,
      autoform: {afFieldInput: {type: 'textarea', row: 4}}
    },
    'meta.author': {type: String, label: 'Auteur', min: 1, max: 256 },
    'meta.contact': {
      type: String, regEx: SimpleSchema.RegEx.Email, label: 'Contact',
      autoform: {afFieldInput: {type: 'email'}}
    },
    'meta.copyright': {type: String, label: 'Propriétaire du copyright', min: 1, max: 256 },
    'meta.distribution': {type: String, label: 'Type de distribution', allowedValues: ['global', 'local', 'iu'] },
    'meta.language': {type: String, label: 'Langue du site', allowedValues: ['French', 'English'] },
    'meta.rating': {type: String, label: 'Publique du site (rating)', allowedValues: ['general', 'mature', 'restricted', '14 years', 'safe for kids'] },
    'meta.reply-to': {
      type: String, regEx: SimpleSchema.RegEx.Email, label: 'Adresse de réponse',
      autoform: {afFieldInput: {type: 'email'}}
    },
    'meta.web-author': {type: String, min: 1, max: 256, label: 'Développeur du site' },
    socialSharers: { type: [Object], label: 'Partage des réseaux sociaux' },
    'socialSharers.$.social': { type: String, label: 'Réseau social', allowedValues: ['Twitter', 'Facebook', 'LinkedIn'] },
    'socialSharers.$.message': { type: String, label: 'Message', min: 1, max: 140 },
    'socialSharers.$.account': { type: String, label: 'Compte', optional: true },
    location: { type: Object, label: 'Emplacement' },
    'location.map': { type: Object, label: 'Carte' },
    'location.map.lat': { type: Number, decimal: true, label: 'Lattitude' },
    'location.map.long': { type: Number, decimal: true, label: 'Longitude' },
    'location.map.zoom': { type: Number, min: 2, max: 21, label: 'Zoom (12 pour une ville)' },
    'location.name': { type: String, min: 2, max: 256, label: 'Nom' },
    'location.address': { type: Object, label: 'Adresse' },
    'location.address.streetAddress': { type: String, label: 'Rue', min: 5, max: 256 },
    'location.address.addressLocality': { type: String, label: 'Rue', min: 2, max: 256 },
    'location.address.postalCode': { type: String, label: 'Rue', min: 5, max: 128 },
    'location.site': { type: String, max: 256, optional: true, label: 'Site' }
  },
  // Available subscriptions and publications
  subs: {
    All: {}
  }
};

// Client only
if (Meteor.isClient) {
  class Dictionary extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.dictionary = new Dictionary(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  // Options used only on the server
  const serverOptions = {
    defaults: [Meteor.settings.public.dictionary]
  };
  class Dictionary extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.dictionary = new Dictionary(sharedOptions, serverOptions);
}
