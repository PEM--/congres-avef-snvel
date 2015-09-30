// Client only

// Base class for cookies
class BaseCookie {
  constructor(
    dict,
    domain = Meteor.settings.public.proxy.url,
    path = '/',
    expires = 45
  ) {
    // Assign arguments as class properties
    let [ args, dummy ] = [...arguments];
    for (let prop of Object.keys(args)) {
      this[prop] = args[prop];
    }
    this.currentValue = {};
  }
  isAccepted() {
    if (Cookie.get(dict.cookie.name)) {
      return true;
    }
    return false;
  }
  // get(name) {
  //   return Cookie.get(name, {})
  // }
}

BaseCookie.instance = null;
BaseCookie.get = (dict) => BaseCookie.instance === null ? new BaseCookie(dict) : BaseCookie.instance;

SD.Utils.Cookie = BaseCookie;
