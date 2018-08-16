/*jshint esversion: 6*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const {Grow, Schedule} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

const {testDataOne, testDataTwo, nutrientSchedule} = require('./test-data');

//// TODO: make sure this is correct for new data scheme
function generateFakeGrow() {
  return {
    shortId: "D4PXJ5",
    name: "Brain Melt",
    startDate: "2018-05-20",
    endDate: null,
    strain: "indica",
    entries: []
  };
}

function generateFakeEntry() {
  return {
       number: 11,
       date: "2018-07-14",
       week: 8,
       phaseProgress: {
          phase: "flowering",
          phaseStartDate: "2018-06-06",
          week: 5,
          stage: "flush"
       },
       wasWatered: true,
       wasFed: false,
       nutrients:{
          floraMicro: "0",
          floraGrow: "0",
          floraBloom: "0",
          caliMagic: "0"
       },
       notes: ""
    };
}

function seedGrowData() {
  console.log('Seeding grow data');
  const seedData = [];
  seedData.push(testDataOne, testDataTwo);
  return Grow.insertMany(seedData);
}

function seedNutrientData() {
  console.log('Seeding nutrient schedule data');
  return Schedule.insertMany(nutrientSchedule);
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
  console.log(TEST_DATABASE_URL);
   return runServer(TEST_DATABASE_URL);
 });

 beforeEach(function() {
   return seedGrowData();
 });

 beforeEach(function() {
   return seedNutrientData();
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
//       in db, and that the values match those of the corresponding keys
  it('should return all existing grows', function() {
    let res;
    return chai.request(app)
      .get('/grows')
      .then(_res => {
        res = _res;
        expect(res).to.have.status(200);
        expect(res.body.grows).to.have.lengthOf.at.least(1);
        return Grow.count();
      })
      .then(count => {
          expect(res.body.grows).to.have.lengthOf(count);
       });
    });

    it('should return grows with right fields', function() {
      let resGrow;
      return chai.request(app)
        .get('/grows')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.grows).to.be.a('array');
          expect(res.body.grows).to.have.lengthOf.at.least(1);

          res.body.grows.forEach(function(grow) {
            expect(grow).to.be.a('object');
            expect(grow).to.include.keys(
              'id', 'name', 'startDate', 'endDate', 'strain', 'entries');
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
          expect(resGrow.entries[1].number).to.equal(grow.entries[1].number);
          expect(resGrow.entries[1].date).to.equal(grow.entries[1].date);
          expect(resGrow.entries[1].week).to.equal(grow.entries[1].week);
          expect(resGrow.entries[1].phase).to.equal(grow.entries[1].phase);
          expect(resGrow.entries[1].wasWatered).to.equal(grow.entries[1].wasWatered);
          expect(resGrow.entries[1].wasFed).to.equal(grow.entries[1].wasFed);
          expect(resGrow.entries[1].nutrients.floraMicro).to.equal(grow.entries[1].nutrients.floraMicro);
          expect(resGrow.entries[1].nutrients.floraGrow).to.equal(grow.entries[1].nutrients.floraGrow);
          expect(resGrow.entries[1].nutrients.floraBloom).to.equal(grow.entries[1].nutrients.floraBloom);
          expect(resGrow.entries[1].nutrients.caliMagic).to.equal(grow.entries[1].nutrients.caliMagic);
          expect(resGrow.entries[1].notes).to.equal(grow.entries[1].notes);
        });
    });
});

describe('GET endpoint', function() {
    it('should get the appropriate nutrient schedules', function() {
      let res;
      return chai.request(app)
      .get(`/nutrient-schedules`)
      .then(_res => {
        res = _res;
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys(
          'name', 'schedule');
      });
  });
});

describe('POST Grow endpoint', function() {
  // strategy:
  //    1. strategy: make a POST request with data for a fake 'Grow'
  //    2. then prove that the grow we get back has the right keys, and
  //       that the id was there, which means it was inserted into the db
  it('should add a new grow', function() {

    const newGrow = generateFakeGrow();

    return chai.request(app)
      .post('/grows')
      .send(newGrow)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys(
          'id', 'name', 'startDate', 'endDate', 'strain', 'entries');
        expect(res.body.name).to.equal(newGrow.name);
        expect(res.body.id).to.not.be.null;
        expect(res.body.startDate).to.equal(newGrow.startDate);
        expect(res.body.endDate).to.equal(newGrow.endDate);
        expect(res.body.strain).to.equal(newGrow.strain);
        return Grow.findById(res.body.id);
      })
      .then(function(grow) {
        expect(grow.name).to.equal(newGrow.name);
        expect(grow.startDate).to.equal(newGrow.startDate);
        expect(grow.endDate).to.equal(newGrow.endDate);
        expect(grow.strain).to.equal(newGrow.strain);
      });
  });
});

describe('POST Entries endpoint', function() {
  // strategy:
  // 1. query the db for a grow to add an entry to
  // 2. make a POST request to that grow with fake 'entry' data
  // 3. prove entry returned by request contains data we sent
  // 4. prove entry in db is correctly updated

  it('should add a new entry', function() {
    const newEntry = generateFakeEntry();
    return Grow
      .findOne()
      .then(function(grow) {
        let growId = grow.shortId;
        return chai.request(app)
          .post(`/entries/${growId}`)
          .send(newEntry)
          .then(function(res) {
            const addedEntry = res.body.entries[res.body.entries.length-1];
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(addedEntry).to.be.a('object');
            expect(addedEntry).to.include.keys(
              'shortId', 'number', 'date', 'week', 'phaseProgress', 'wasWatered', 'wasFed', 'nutrients', 'notes');
            expect(addedEntry._id).to.not.be.null;
            expect(addedEntry.number).to.equal(newEntry.number);
            expect(addedEntry.date).to.equal(newEntry.date);
            expect(addedEntry.week).to.equal(newEntry.week);
            expect(addedEntry.phaseProgress.phase).to.equal(newEntry.phaseProgress.phase);
            expect(addedEntry.phaseProgress.phaseStartDate).to.equal(newEntry.phaseProgress.phaseStartDate);
            expect(addedEntry.phaseProgress.week).to.equal(newEntry.phaseProgress.week);
            expect(addedEntry.phaseProgress.stage).to.equal(newEntry.phaseProgress.stage);
            expect(addedEntry.wasWatered).to.equal(newEntry.wasWatered);
            expect(addedEntry.wasFed).to.equal(newEntry.wasFed);
            expect(addedEntry.nutrients.floraMicro).to.equal(newEntry.nutrients.floraMicro);
            expect(addedEntry.nutrients.floraGrow).to.equal(newEntry.nutrients.floraGrow);
            expect(addedEntry.nutrients.floraBloom).to.equal(newEntry.nutrients.floraBloom);
            expect(addedEntry.nutrients.caliMagic).to.equal(newEntry.nutrients.caliMagic);
            expect(addedEntry.notes).to.equal(newEntry.notes);
            return(Grow.findOne({shortId: res.body.shortId}))
          })
          .then(function(grow) {
            const addedEntry = grow.entries[grow.entries.length-1];
            expect(addedEntry.number).to.equal(newEntry.number);
            expect(addedEntry.date).to.equal(newEntry.date);
            expect(addedEntry.week).to.equal(newEntry.week);
            expect(addedEntry.phaseProgress.phase).to.equal(newEntry.phaseProgress.phase);
            expect(addedEntry.phaseProgress.phaseStartDate).to.equal(newEntry.phaseProgress.phaseStartDate);
            expect(addedEntry.phaseProgress.week).to.equal(newEntry.phaseProgress.week);
            expect(addedEntry.phaseProgress.stage).to.equal(newEntry.phaseProgress.stage);
            expect(addedEntry.wasWatered).to.equal(newEntry.wasWatered);
            expect(addedEntry.wasFed).to.equal(newEntry.wasFed);
            expect(addedEntry.nutrients.floraMicro).to.equal(newEntry.nutrients.floraMicro);
            expect(addedEntry.nutrients.floraGrow).to.equal(newEntry.nutrients.floraGrow);
            expect(addedEntry.nutrients.floraBloom).to.equal(newEntry.nutrients.floraBloom);
            expect(addedEntry.nutrients.caliMagic).to.equal(newEntry.nutrients.caliMagic);
          });
      });
  });
});

describe('PUT endpoint', function() {
    // strategy:
    //  1. Get an existing grow from db
    //  2. Make a PUT request to update the notes field of an entry
    // in that db
    //  3. Prove the entry returned by request contains data we sent
    //  4. Prove the entry in db is correctly updated
    it('should update the endDate field for a grow' , function() {
      const updateData = {
        endDate: '2018-06-01'
      };
      let growId = "QLMYDF";
      let entryId;
      return chai.request(app)
        .put(`/grows/${growId}`)
        .send(updateData)
        .then(function(res) {
          expect(res).to.have.status(204);
          return Grow.findOne({shortId : growId});
        })
        .then(function(grow) {
          expect(grow.endDate).to.equal(updateData.endDate);
      });
  });
});

 describe('PUT endpoint', function() {
     // strategy:
     //  1. Get an existing grow from db
     //  2. Make a PUT request to update the notes field of an entry
     // in that db
     //  3. Prove the entry returned by request contains data we sent
     //  4. Prove the entry in db is correctly updated
     it('should update the notes field for an entry' , function() {
       const updateData = {
         notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum augue justo, in imperdiet elit pellentesque ut. Donec ornare id turpis in viverra. Nullam lacinia nibh felis, ut facilisis nulla egestas quis. Phasellus et ligula vulputate, hendrerit diam molestie, iaculis.'
       };
       let growId, entryId;
       return Grow
         .findOne()
         .then(function(grow) {
           growId = grow.shortId;
           entryId = grow.entries[0].shortId;
           updateData.id = grow.entries[0].id;
           return chai.request(app)
             .put(`/entries/${growId}/${entryId}`)
             .send(updateData);
         })
         .then(function(res) {
           expect(res).to.have.status(204);
           return Grow.findOne({shortId : growId, "entries.shortId" : entryId });
         })
         .then(function(grow) {
           expect(grow.entries[0].notes).to.equal(updateData.notes);
         });
     });
   });

   describe('DELETE endpoint', function(){
     it('should delete a grow by id', function(){
       const deleteGrow= {};
       let growId;
       return Grow
         .findOne()
         .then(function(grow) {
           growId = grow.shortId;
           return chai.request(app)
            .delete(`/grows/${growId}`)
            .send(deleteGrow);
          })
          .then(function(res) {
            expect(res).to.have.status(204);
            return Grow.findOne({shortId : growId});
          })
          .then(function(grow) {
            expect(grow).to.be.null;
      });
    });
   });

   describe('DELETE endpoint', function(){
     it('should delete a grow-log entry by id', function(){
       const deleteEntry = {};
       let growId, entryId;
       return Grow
         .findOne()
         .then(function(grow) {
           growId = grow.shortId;
           entryId = grow.entries[0].shortId;
           return chai.request(app)
            .delete(`/entries/${growId}/${entryId}`)
            .send(deleteEntry);
          })
          .then(function(res) {
            expect(res).to.have.status(204);
            return Grow.findOne({shortId : growId, "entries.shortId" : entryId });
          })
          .then(function(grow) {
            expect(grow).to.be.null;
      });
    });
   });
