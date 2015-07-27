var request = require('superagent'),
    expect = require('expect.js'),
    host = 'localhost:8080';

describe('Authentication', function(){
    describe('/login', function(){
        it('should give correct route for authentication', function(done){
            request.get(host + '/users/login')
            .end(function(err, res){
                expect(err).to.not.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain('/users/authenticate');

                done();
            });
        });
    });

    describe.skip('/authenticate', function(){
        it('should accept POST request');
    });
});