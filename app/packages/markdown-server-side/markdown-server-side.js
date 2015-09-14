marked = Npm.require('marked');
const highlight = Npm.require('highlight.js');
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
