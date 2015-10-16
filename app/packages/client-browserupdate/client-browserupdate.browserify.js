const outdatedBrowserRework = require("outdated-browser-rework");

outdatedBrowserRework({
  browserSupport: {
    Chrome: 46, // Includes Chrome for mobile devices
    IE: 11,
    Safari: 8,
    'Mobile Safari': 8,
    Firefox: 41
  },
  requireChromeOnAndroid: true,
  languagePath: '/outdatedbrowser/lang/fr.html'
});
