// Robots.txt
// Specs: http://www.robotstxt.org/robotstxt.html

// Allow indexing for all pages except admin's ones
const lines = [
  'User-agent: *',
  'Disallow: /admin/',
  'Disallow: /login/'
];
lines.forEach(function(line) {
  log.info('Robots.txt on', line);
  robots.addLine(line);
});
