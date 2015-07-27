// mongo setup
var config = require('../config'),
    db = require('monk')(config.database);
    
module.exports = db;

// create unique indexes for username and email
var users = db.get('users');
users.index('user', {unique : true});