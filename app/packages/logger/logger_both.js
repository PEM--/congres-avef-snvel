// Default log informations
LOG_FRAMEWORK_NAME = 'Main';
LOG_LEVEL = 'info';

// Instantiate logger
Tools.log = bunyan.createLogger({
  name: LOG_FRAMEWORK_NAME,
  stream: Tools.logFormatter,
  level: LOG_LEVEL
});

Tools.log.info('Logger activated');
