var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('./mongodb'),
    bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  function(username, password, done) {
    var users = db.get('users');
    users.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if(err) return done(err);
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  }
));

module.exports = passport;