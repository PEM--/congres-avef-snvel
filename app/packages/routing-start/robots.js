// Robots.txt

// Allow indexing for all pages except admin's ones
const lines = [
  'User-agent: *',
  'Disallow: /admin/'
];
lines.forEach(function(line) {
  log.info('Robots.txt on', line);
  robots.addLine(line);
});
