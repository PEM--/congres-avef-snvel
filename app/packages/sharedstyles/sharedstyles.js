const orange = '#FF7100';
const lightOrange = '#FCA94F';
const veryLightOrange = '#FFF9E1';
const green = '#007E5F';
const lightGreen = '#7bb4ab';
const blue = '#008DDA';
const red = '#FC3D00';
const white = '#FFFFFF';
const black = '#282828';
const lightGrey = '#f0f0f0';
const grey = '#bcbcbc';
const darkGrey = '#6b6b6b';

// Color theme
ColorTheme = {
  // Semantic Theme
  primary: orange,
  success: orange,
  info: blue,
  warning: orange,
  danger: red,
  textColor: black,
  invertedTextColor: veryLightOrange,
  brandColor: orange,
  secondaryColor: green,
  bgBrandColor: veryLightOrange,

  // Used for emails
  bg: veryLightOrange,
  header: green,
  border: orange,
  footer: green,
  bgFooter: veryLightOrange,

  // Used for invoices in emails
  invoiceBorder: grey,
  invoiceBg: lightGrey,
  invoiceText: darkGrey,

  // Used for Google Maps
  bgColor: lightGreen,
  waterColor: blue,
  highwayColor: orange,
  roadColor: lightOrange,
  grassColor: green
};

// Fonts
Fonts = {
  header: "Impact,sans-serif",
  body: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  invoice: "'Droid Sans Mono',monospace"
};

// Link modifier
SD.Utils.prettyLink = function(text) {
  return text
    .replace(/AVEF/g,
      '<a class="animated" href="http://www.avef.fr" target="_blank">AVEF</a>')
    .replace(/SNVEL/g,
      '<a class="animated" href="http://www.snvel.fr" target="_blank">SNVEL</a>');
};
