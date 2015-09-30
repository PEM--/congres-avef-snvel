// Client only

// Base class for cookies
class BaseCookie {
  constructor({ dict, domain, path, expires }) {
    // Assign arguments as class properties
    let [ args, dummy ] = [...arguments];
    for (let prop of Object.keys(args)) {
      this[prop] = args[prop];
    }
    // Set default if none provided
    if (!this.domain) {
      this.domain = Meteor.settings.public.proxy.url;
    }
    if (!this.path) {
      this.path = '/';
    }
    if (!this.expires) {
      this.expires = 45;
    }
    this.currentValue = {};
  }
  // isAccepted() {
  //   if (Cookie.get(dict.cookieName))
  // }
  // get(name) {
  //   return Cookie.get(name, {})
  // }
}

SD.Utils.Cookie = BaseCookie;
