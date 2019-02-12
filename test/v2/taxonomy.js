const config = require('../../config');
const server = require('../../server');

process.env.NODE_ENV = config.test_env;
process.env.PORT = config.test_port;

const chai = require('chai');
const chaiHttp = require('chai-http');
const url = '/api/v2/taxonomy';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Taxonomy V2', () => {
    it('should GET taxonomies limit 100', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(100);
                done();
            });
    });

    it('should GET taxonomy with ID 10', (done) => {
        chai.request(server)
            .get(`${url}/10`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.id.should.be.eql('10');
                done();
            });
    });

    it('should GET taxonomy with under basic needs category', (done) => {
        chai.request(server)
            .get(`${url}/basic-needs`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach(tax => {
                    expect(tax.code).to.match(/^B.*$/);
                });
                done();
            });
    });

    it('should GET taxonomy subcategories for given category ID', (done) => {
        chai.request(server)
            .get(`${url}/10/children`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach(tax => {
                    expect(tax.parentCategoryId).to.eq('10');
                });
                done();
            });
    });
});