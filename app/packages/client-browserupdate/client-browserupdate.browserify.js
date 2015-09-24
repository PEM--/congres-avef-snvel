const outdatedBrowserRework = require("outdated-browser-rework");

outdatedBrowserRework({
  browserSupport: {
    Chrome: 45, // Includes Chrome for mobile devices
    IE: 11,
    Safari: 8,
    'Mobile Safari': 8,
    Firefox: 41
  }
});
