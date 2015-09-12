bunyan = Npm.require('bunyan');
bunyanFormat = Npm.require('bunyan-format');

// Formatter
Tools.logFormatter = bunyanFormat({outputMode: 'short', color: true});
