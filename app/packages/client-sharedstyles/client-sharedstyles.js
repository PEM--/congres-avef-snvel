// Color theme
SD.Views.Client.ColorTheme = {
  brandColor: '#FF7100',
  secondaryColor: '#007E5F',
  transBrandColor: 'rgba(255, 113, 0, .2)',
  bgBrandColor: '#7bb4ab',
  textColor: '#000000',
  invertedTextColor: '#FFF9E1',
  bgColor: '#7bb4ab',
  waterColor: '#008DDA',
  highwayColor: '#FF7100',
  roadColor: '#FCA94F',
  grassColor: '#007E5F'
};

// Fonts
SD.Views.Client.Fonts = {
  header: '"Impact", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  body: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
};

// Link modifier
SD.Utils.prettyLink = function(text) {
  return text
    .replace(/AVEF/g,
      '<a class="animated" href="http://www.avef.fr" target="_blank">AVEF</a>')
    .replace(/SNVEL/g,
      '<a class="animated" href="http://www.snvel.fr" target="_blank">SNVEL</a>');
};
