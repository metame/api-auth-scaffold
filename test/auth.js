var request = require('superagent'),
    expect = require('expect.js'),
    db = require('../lib/mongodb.js'),
    users = db.get('users');
    host = 'localhost:8080';

describe('Authentication', function(){
    var authUser = {
        username: "authUser",
        password: "authPassword",
        admin: false
    },
        authToken;

    before(function(done){
        // remove authUser from db if present
        users.remove({user: "authUser"});

        // insert authUser in db
        users.insert(authUser).on('complete', function(err, user){
            if(err) console.log(err.msg);

            // remove admin prop as it's unnecessary for login params
            delete authUser.admin;

            done();
        });
    });

    it('should reject request without auth', function(done){
        request.get(host + '/api')
        .set('Accept', 'application/json')
        .end(function(err, res){
            expect(err).to.exist;

            expect(res).to.not.exist;

            done();
        });
    });


    it('should accept valid auth credentials', function(done){
        request.post(host + '/api/authenticate')
        .send(authUser)
        .set('Accept', 'application/json')
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.body).to.not.be.empty();
            expect(res.body).to.only.have.keys('success', 'message', 'token');
            expect(res.body.success).to.equal(true);
            authToken = res.body.token;

            done();
        });
    });


    after(function(){
        // remove authUser from db
        users.remove({username: "authUser"});
    });
});