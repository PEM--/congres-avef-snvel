# https://github.com/matteodem/meteor-easy-security
EasySecurity.config
  general: type: 'rateLimit', ms: 1000
  #methods:
  #  createMethod: type: 'rateLimit', ms: 1000 * 10
  #  commentMethod: type: 'throttle', ms: 500
  #ignoredMethods: ['someOtherMethod']
  maxQueueLength: 200
log.info 'Rate limiting to prevent brute force or server flood'
