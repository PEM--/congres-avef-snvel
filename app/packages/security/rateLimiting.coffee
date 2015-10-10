# https://github.com/matteodem/meteor-easy-security
EasySecurity.config
  general: type: 'rateLimit', ms: 500
  # methods:
  #  createMethod: type: 'rateLimit', ms: 1000 * 10
  #  commentMethod: type: 'throttle', ms: 500
  # ignoredMethods: ['clientToken']
  maxQueueLength: 500
log.info 'Rate limiting to prevent brute force or server flood'
