const chai = require('chai'); 
const chaiHttp = require('chai-http'); 
const app = require('../riskrating'); 
// expect comes from the chai library
const expect = chai.expect; 
chai.use(chaiHttp); 


describe ('GET', function(){
    it('should return a status 200 code and a message', function(done){
        chai.request(app) 
            .get('/')
            .end(function(err, res){
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Hello from Homepage.'); 
                done(); 
            });
    });
});

describe ('POST /rating', function(){
    it('should return a rating from a string input', function(done){
        chai.request(app)
            .post('/rating')
            .send({claim_history: 'I had a car crash last week and my car got scratched.'})
            .end(function(err, res){
                expect(res).to.have.status(200); 
                expect(res.body).to.have.property('risk_rating'); 
                expect(res.body.risk_rating).to.have.a('number'); 
                expect(res.body.risk_rating).to.be.at.least(1); 
                expect(res.body.risk_rating).to.be.at.most(5); 
                done(); 
                
            });
    });

    
});

describe ('POST /rating', function(){
    it('should return an error if claim_history is not provided', function(done){
        chai.request(app)
            .post('/rating')
            .send({claim_history: ''})
            .end(function(err, res){ 
                expect(res).to.have.status(400); 
                expect(res.body).to.have.property('error').that.equals('Invalid input. A non-empty string is required in claim_history field')
                done(); 
            })
    })

    it('should return an error if claim_history is not provided', function(done){
        chai.request(app)
            .post('/rating')
            .send({claim_history: '123'})
            .end(function(err, res){ 
                expect(res).to.have.status(400); 
                expect(res.body).to.have.property('error').that.equals('Invalid input. A non-empty string is required in claim_history field')
                done(); 
            })
    })

})



