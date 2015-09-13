// Expose a creation function
Tools.createLogger = function(
  name,
  level = Tools.LOG_LEVEL,
  stream = Tools.logFormatter
) {
  return bunyan.createLogger({name, stream, level});
};

// Instantiate logger
Tools.log = Tools.createLogger('Logger');

Tools.log.info(`Activated in ${Tools.LOG_LEVEL} mode`);
