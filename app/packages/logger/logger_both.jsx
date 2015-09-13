// Expose a creation function
Tools.createLogger = function(
  name,
  level = Tools.LOG_LEVEL,
  stream = Tools.logFormatter
) {
  return bunyan.createLogger({name, stream, level});
};

// Instantiate logger
const log = Tools.createLogger('Logger');

log.info(`Activated in ${Tools.LOG_LEVEL} mode`);
