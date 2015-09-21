// /!\ This currently doesn't work in Meteor as it required ES7 support for decorator.

// Technical articles :
// * https://www.youtube.com/watch?v=AfWYO8t7ed4


// High order function as a decorator for injecting a `optionsAsThis` method
// that can be used at class level.
// @optionsAsThis(params) with params :
// * no param: all options in the contructor are set in the instance (accessible by this)
// * a list of parameter names: only the named parameter are set in the instance
optionsAsThis = function(...filterArgs) {
  return function decorator(klass) {
    const innerInject = function() {
      Object.defineProperty(klass.prototype, 'optionsAsThis', {
        value: (options) => {
          // If no filter is argument provided, expose all properties and members
          let properties = filterArgs.length !== 0 ? filterArgs : Object.keys(options);
          for (prop of properties) {
            Object.defineProperty(klass.prototype, prop, {value: options[prop]});
          }
        }
      });
      return klass;
    };
    return innerInject();
  };
};
