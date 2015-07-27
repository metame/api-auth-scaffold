// express setup
var express = require('express'),
    app = express();

// require dependencies
var bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    morgan = require('morgan'),
    db = require('./lib/mongodb'),
    config = require('./config');

// Use bodyParser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use morgan to log requests to console
app.use(morgan('dev'));

// set up routes
app.get('/', function(req, res){
    res.send('Hello! The API is at ' + config.host + ':' + config.port + '/api');
});

app.get('/setup', function(req, res) {

  // create a sample user
  var adminUser = { 
    name: 'Merlin', 
    password: 'password',
    admin: true 
  };

  db.get('users').insert(adminUser).on('complete', function(err, user){
    if(err) throw err;

    console.log("User created successfully!");
    res.json({ success: true });
  });
});

app.use('/api', require('./routes/api'));

// start server
app.listen(config.port, function(){
    console.log('Server listening on port ' + config.port);
});

