// test-reviews.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

const sampleReview = {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie."
}

chai.use(chaiHttp);

describe('Reviews', () => {

    after(() => {
        Review.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews) => {
            console.log(reviews);
            reviews.remove();
        })
    })
    // TEST INDEX
    it('should index ALL reviews on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })

    // TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server).get('/reviews/new').end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        })
    })

    // TEST SHOW
    it('should show a SINGLE review on /reviews/<id> GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server).get(`/reviews/${data._id}`).end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
        })
    })

    // TEST EDIT
    it('should show a SINGLE review on /reviews/<id>/edit GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server).get(`/reviews/${data._id}/edit`).end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
        })
    })

    // TEST CREATE
    it('should create a SINGLE review on /reviews POST', (done) => {
        chai.request(server)
            .post('/reviews')
            .send(sampleReview)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })

    // TEST DELETE
    it('shold delete a SINGLE review on /reviews/<id> DELETE', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server).delete(`/reviews/${data.id}?_method=DELETE`).end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
        })
    })


})
