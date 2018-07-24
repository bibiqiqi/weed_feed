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

function generateFakeGrow() {
  return {
    name: 'Brain Melt',
    startDate: '2018-06-4',
    endDate: '',
    strain: 'Indica',
    entries: []
  };
}

function generateFakeEntry() {
  return {
    growId: '',
    shortId: 'sas54545',
    number: 1,
    date: '2018-06-5',
    week: 1,
    phase: 'vegetative',
    wasWatered: true,
    wasFed: false,
    nutrients: {
      floraMicro: '',
      floraGrow: '',
      floraBloom: '',
      caliMagic: ''
    },
    notes: 'In sed diam vitae quam dictum bibendum eget eu dui. Nullam in laoreet sapien. Nunc molestie placerat massa. Ut ultricies, purus vitae placerat egestas, nunc elit luctus ligula, ut placerat nisi eros ut felis. Duis posuere sed dolor nec facilisis. Quisque viverra in ipsum ut maximus.'
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
    // strategy:
    //  1. Get an existing grow from db
    //  2. Make a PUT request to update the notes field of an entry
    // in that db
    //  3. Prove the entry returned by request contains data we sent
    //  4. Prove the entry in db is correctly updated
    it('should get the appropriate nutrient schedule', function() {
      let scheduleName;
      return Schedule
        .findOne()
        .then(function(schedule) {
          console.log(schedule);
          scheduleName = schedule.name;
          return chai.request(app)
          .get(`/nutrient-schedules/${scheduleName}`)
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          console.log(res.body);
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
        newEntry.growId = grow.id;
        return chai.request(app)
          .post('/entries/growId')
          .send(newEntry)
          .then(function(res) {
            const addedEntry = res.body.entries[res.body.entries.length-1];
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(addedEntry).to.be.a('object');
            expect(addedEntry).to.include.keys(
              'number', 'date', 'week', 'phase', 'wasWatered', 'wasFed', 'nutrients', 'notes');
            expect(addedEntry._id).to.not.be.null;
            expect(addedEntry.number).to.equal(newEntry.number);
            expect(addedEntry.date).to.equal(newEntry.date);
            expect(addedEntry.week).to.equal(newEntry.week);
            expect(addedEntry.phase).to.equal(newEntry.phase);
            expect(addedEntry.wasWatered).to.equal(newEntry.wasWatered);
            expect(addedEntry.wasFed).to.equal(newEntry.wasFed);
            expect(addedEntry.nutrients.floraMicro).to.equal(newEntry.nutrients.floraMicro);
            expect(addedEntry.nutrients.floraGrow).to.equal(newEntry.nutrients.floraGrow);
            expect(addedEntry.nutrients.floraBloom).to.equal(newEntry.nutrients.floraBloom);
            expect(addedEntry.nutrients.caliMagic).to.equal(newEntry.nutrients.caliMagic);
            expect(addedEntry.notes).to.equal(newEntry.notes);
            return(Grow.findById(newEntry.growId))
          })
          .then(function(grow) {
            const addedEntry = grow.entries[grow.entries.length-1];
            expect(addedEntry.number).to.equal(newEntry.number);
            expect(addedEntry.date).to.equal(newEntry.date);
            expect(addedEntry.week).to.equal(newEntry.week);
            expect(addedEntry.phase).to.equal(newEntry.phase);
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
     it('should update fields you send over', function() {
       const updateData = {
         notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum augue justo, in imperdiet elit pellentesque ut. Donec ornare id turpis in viverra. Nullam lacinia nibh felis, ut facilisis nulla egestas quis. Phasellus et ligula vulputate, hendrerit diam molestie, iaculis.'
       };
       return Grow
         .findOne()
         .then(function(grow) {
           updateData.growId = grow.id;
           updateData.id = grow.entries[0].id;
           return chai.request(app)
             .put(`/entries/${updateData.id}`)
             .send(updateData);
         })
         .then(function(res) {
           expect(res).to.have.status(204);
           return Grow.findOne({_id : updateData.growId, "entries._id" : updateData.id });
         })
         .then(function(grow) {
           expect(grow.entries[0].notes).to.equal(updateData.notes);
         });
     });
   });

   describe('DELETE endpoint', function(){
     it('should delete a grow-log entry by id', function(){
       const deleteEntry = {};
       return Grow
         .findOne()
         .then(function(grow) {
           deleteEntry.growId = grow.id;
           deleteEntry.id = grow.entries[0].id;
           return chai.request(app)
            .delete(`/entries/${deleteEntry.id}`)
            .send(deleteEntry);
          })
          .then(function(res) {
            expect(res).to.have.status(204);
            return Grow.findOne({_id : deleteEntry.growId});
          })
          .then(function(grow) {
            expect(grow.entries.id(deleteEntry.id)).to.be.null;
      });
     })
   });
