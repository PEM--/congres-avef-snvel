// Robots.txt

// Allow indexing for all pages except admin's ones
[
  'User-agent: *',
  'Disallow: /admin/'
].forEach(function(line) {
  log.info('Robots.txt on', line);
  robots.addLine(line);
});
