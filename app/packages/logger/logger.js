Logger = {};

class InnerLogger {
  info(...vars) { console.log(...vars); }
  debug(...vars) { console.log(...vars); }
  warn(...vars) { console.warn(...vars); }
}

Logger = {
  createLogger() { return new InnerLogger(); }
};
