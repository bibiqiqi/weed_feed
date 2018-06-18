/*jshint esversion: 6*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const {Grow} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

const {testData} = require('./test-data');

function seedGrowData() {
  console.log('Seeding grow data');
  //console.log(testData);
  const seedData = [];
  seedData.push({
    name: 'Brain Melt',
    startDate: '2018-05-01',
    endDate: '2018-05-28',
    strain: 'indica'
  });
  seedData.push({
    name: "Dude Where's My Car",
    startDate: '2018-04-02',
    endDate: '2018-04-27',
    strain: 'indica'
  })
  return Grow.insertMany(seedData);
}

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

before(function() {
   return runServer(TEST_DATABASE_URL);
 });

 beforeEach(function() {
   return seedGrowData();

 });

 afterEach(function() {
   return tearDownDb();
 });

 after(function() {
   return closeServer();
 });


describe('GET endpoint', function() {
// strategy:
//    1. get back all grows returned by by GET request to `/grows`
//    2. prove res has right status, data type
//    3. prove the number of grows we got back is equal to number
//       in db.

  it('should return all existing grows', function() {
    let res;
    return chai.request(app)
      .get('/grows')
      .then(_res => {
        res = _res;
        //console.log({res})
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf.at.least(1);
        return Grow.count();
      })
      .then(count => {
          expect(res.body).to.have.lengthOf(count);
       });
    });

    it('should return grows with right fields', function() {
  // Strategy: Get back all grows, and ensure they have expected keys

//why are some of these assertions repeated?
//ie expect(res).to.have.status(200) and expect(res.body.grows).to.have.lengthOf.at.least(1) ?
//

  let resGrow;
  return chai.request(app)
    .get('/grows')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.grows).to.be.a('array');
      expect(res.body.grows).to.have.lengthOf.at.least(1);

//i don't understand where the body property of response comes from.
//response is a Express object? but there is no body property listed in the documentation

      res.body.grows.forEach(function(grow) {
        expect(grow).to.be.a('object');
        expect(grow).to.include.keys(
          'id', 'growName', 'startDate', 'endDate', 'strain', 'entries', 'notes');
      });
      resGrow = res.body.grows[0];
      return Grow.findById(resGrow.id);
    })
    .then(function(grow) {
      expect(resGrow.id).to.equal(grow.id);
      expect(resGrow.name).to.equal(grow.name);
      expect(resGrow.startDate).to.equal(grow.startDate);
      expect(resGrow.endDate).to.equal(grow.endDate);
      expect(resGrow.strain).to.contain(grow.strain);
      expect(resGrow.entries.number).to.equal(grow.entries.number);
      expect(resGrow.entries.date).to.equal(grow.entries.date);
      expect(resGrow.entries.week).to.equal(grow.entries.week);
      expect(resGrow.entries.phase).to.equal(grow.entries.phase);
      expect(resGrow.entries.wasWatered).to.equal(grow.entries.wasWatered);
      expect(resGrow.entries.wasFed).to.equal(grow.entries.wasFed);
      expect(resGrow.entries.nutrients.floraMicro).to.equal(grow.entries.nutrients.floraMicro);
      expect(resGrow.entries.nutrients.floraGrow).to.equal(grow.entries.nutrients.floraGrow);
      expect(resGrow.entries.nutrients.floraBloom).to.equal(grow.entries.nutrients.floraBloom);
      expect(resGrow.entries.nutrients.caliMagic).to.equal(grow.entries.nutrients.caliMagic);
      expect(resGrow.notes).to.equal(grow.notes);
    });
});
});
