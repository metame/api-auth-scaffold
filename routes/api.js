var express = require('express'),
    router = express.Router(),
    config = require('../config'),
    jwt = require('jsonwebtoken'),
    db = require('../lib/mongodb'),
    verifyToken = require('../middleware/verifyToken.js'),
    users = db.get('users');
    
// route middleware to verify a token
router.use(verifyToken);

router.get('/', function(req, res){
    
    res.json({ message: "Some helpful message here" });
    
});

router.get('/users', function(req, res){
    users.find({}).on('complete', function(err, docs){
        if(err) throw err;

        res.json(docs);
    });
});

router.post('/authenticate', function(req, res){

    // find the user
    users.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            }   

        }

    });
});



module.exports = router;