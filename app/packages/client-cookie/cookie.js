// Client only

// Base class for cookies
class BaseCookie {
  constructor(dict, path = '/') {
    this.dict = dict;
    this.path = path;
    this.expires = dict.cookie.expires;
    this.currentValue = null;
    this.getAll = () => {
      if (this.currentValue === null) {
        const currentCookie = Cookie.get(this.dict.cookie.name);
        if (currentCookie) {
          this.currentValue = JSON.parse(currentCookie);
        }
      }
      return this.currentValue;
    };
    this.isAccepted = () => {
      if (this.getAll()) {
        return true;
      }
      return false;
    };
    this.isSubscribed = () => {
      if (this.currentValue.subscribed) {
        return true;
      }
    };
    this.write = () => {
      const options = {
        path: this.path,
        expires: this.expires
      };
      log.info('Saving cookie: ', this.dict.cookie.name, ': Value:', this.currentValue, 'Options:', options);
      document.cookie = Cookie.set(this.dict.cookie.name, JSON.stringify(this.currentValue), options);
    };
    this.accept = () => {
      this.currentValue = {};
      this.write();
    };
    this.subscribe = () => {
      this.currentValue.subscribed = true;
      this.write();
    };
  }
  // get(name) {
  //   return Cookie.get(name, {})
  // }
}

BaseCookie.instance = null;
BaseCookie.get = (dict) => BaseCookie.instance === null ? new BaseCookie(dict) : BaseCookie.instance;

SD.Utils.Cookie = BaseCookie;
