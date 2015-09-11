var bodyParser = Npm.require('body-parser');
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({extended: false}));

var data = [
  {id: 1, author: 'Pete Hunt', text: 'This is one comment'},
  {id: 2, author: 'Jordan Walke', text: 'This is *another* comment'}
];

Picker.route('/comments.json', function(params, req, res, next) {
  if (req.method === 'GET') {
    res.end(JSON.stringify(data));
  } else if (req.method === 'POST') {
    data.push({
      id: data.length + 1,
      author: req.body.author,
      text: req.body.text
    });
    res.end(JSON.stringify(data));
  } else {
    res.status(404).send('Not found');
  }
});
