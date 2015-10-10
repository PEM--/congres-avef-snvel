// Internationalization

// Create a logger
const log = Logger.createLogger('Internationalization');

// Settings for global internationalization
getUserLanguage = () => 'fr';
if (Meteor.isClient) {
  Meteor.startup(() => {
    TAPi18n.setLanguage(getUserLanguage());
  });
}

// Simple Schema
SimpleSchema.messages({
  required: 'Le champ [label] est obligatoire.',
  minString: 'Le champ [label] doit comporter au moins [min] caractères.',
  maxString: "Le champ [label] doit comporter au plus [max] caractères.",
  minNumber: "Le champ [label] doit être superieur ou égal à [min].",
  maxNumber: "Le champ [label] doit être inferieur ou égal à [max].",
  minNumberExclusive: "Le champ [label] doit être superieur à [min].",
  maxNumberExclusive: "Le champ [label] doit être inferieur à [max].",
  minDate: "Le champ [label] ne peut pas être avant [min].",
  maxDate: "Le champ [label] ne peut pas être apres [max].",
  badDate: "Le champ [label] n'est pas une date valide.",
  minCount: "Vous devez saisir plus de [minCount] valeurs.",
  maxCount: "Vous devez saisir moins de [maxCount] valeurs.",
  noDecimal: "Le champ [label] doit être un entier.",
  notAllowed: "[value] n'est pas une valeur acceptée.",
  expectedString: "Le champ [label] doit être une chaine de caractères.",
  expectedNumber: "Le champ [label] doit être un nombre.",
  expectedBoolean: "Le champ [label] doit être un booléen.",
  expectedArray: "Le champ [label] doit être un tableau.",
  expectedObject: "Le champ [label] doit être une objet.",
  expectedConstructor: "Le champ [label] doit être du type [type].",
  keyNotInSchema: "Le champ [key] n'est pas permis par le schéma.",
  regEx: [
    {
      msg: "Le champ [label] n'a pas un format reconnu."
    },
    {
      exp: SimpleSchema.RegEx.Email,
      msg: "Le champ [label] doit être une adresse e-mail valide."
    },
    {
      exp: SimpleSchema.RegEx.WeakEmail,
      msg: "Le champ [label] doit être une adresse e-mail valide."
    },
    {
      exp: SimpleSchema.RegEx.Domain,
      msg: "Le champ [label] doit être un domaine valide."
    },
    {
      exp: SimpleSchema.RegEx.WeakDomain,
      msg: "Le champ [label] doit être un domaine valide."
    },
    {
      exp: SimpleSchema.RegEx.IP,
      msg: "Le champ [label] doit être une adresse IPv4 ou IPv6 valide."
    },
    {
      exp: SimpleSchema.RegEx.IPv4,
      msg: "Le champ [label] doit être une adresse IPv4 valide."
    },
    {
      exp: SimpleSchema.RegEx.IPv6,
      msg: "Le champ [label] doit être une adresse IPv6 valide."
    },
    {
      exp: SimpleSchema.RegEx.Url,
      msg: "Le champ [label] doit être une URL valide."
    },
    {
      exp: SimpleSchema.RegEx.Id,
      msg: "Le champ [label] doit être un identifiant alphanumérique valide."
    }
  ]
});

// Set numeral to the default french language
numeral.language('fr', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: ((number) => number === 1 ? 'er' : 'ème'),
  currency: {
    symbol: '€'
  }
});
numeral.language('fr');
numeralAmountFormat = (val) => numeral(val).format('0,0.00$');

// Settings for Accounts
T9n.setLanguage(getUserLanguage());

log.info('Declared with default', getUserLanguage());
