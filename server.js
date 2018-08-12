/*jshint esversion: 6*/
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const { PORT, DATABASE_URL } = require('./config');
const { Grow, Schedule } = require('./models');

mongoose.Promise = global.Promise;

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.get('/grows', (req, res) => {
  Grow
    .find()
    .then(grows => {
      res.json({
        grows: grows.map(
          (grow) => grow.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

app.get( '/nutrient-schedules', (req, res) => {
  Schedule
    .findOne()
    .then(schedule => res.json(schedule.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});

 app.post('/grows', (req, res) => {
   const requiredFields = ['name', 'startDate', 'strain'];
   for (let i = 0; i < requiredFields.length; i++) {
     const field = requiredFields[i];
     if (!(field in req.body)) {
       const message = `Missing \`${field}\` in request body`;
       console.error(message);
       return res.status(400).send(message);
     }
   }
   Grow
     .create({
       shortId: shortid.generate(),
       name: req.body.name,
       startDate: req.body.startDate,
       endDate: null,
       strain: req.body.strain,
       entries: []
     })
     .then(grow => res.status(201).json(grow.serialize()))
     .catch(err => {
       console.error(err);
       res.status(500).json({ error: 'Something went wrong' });
     });
 });

 app.post('/entries/:growId', (req, res) => {
   console.log(req);
   const requiredFields = ['number','date', 'week', 'phaseProgress', 'wasWatered', 'wasFed', 'nutrients', 'notes'];
   for (let i = 0; i < requiredFields.length; i++) {
     const field = requiredFields[i];
     if (!(field in req.body)) {
       const message = `Missing \`${field}\` in request body`;
       return res.status(400).send(message);
     }
   }
  Grow.findOneAndUpdate(
    {shortId: req.params.growId},
    {$push: {
      entries:
        {
        shortId: shortid.generate(),
        number: req.body.number,
        date: req.body.date,
        week: req.body.week,
        phaseProgress: {
            phase: req.body.phaseProgress.phase,
            phaseStartDate: req.body.phaseProgress.phaseStartDate,
            stage: req.body.phaseProgress.stage,
            week: req.body.phaseProgress.week,
        },
        wasWatered: req.body.wasWatered,
        wasFed: req.body.wasFed,
        nutrients: {
         floraMicro: req.body.nutrients.floraMicro,
         floraGrow: req.body.nutrients.floraGrow,
         floraBloom: req.body.nutrients.floraBloom,
         caliMagic: req.body.nutrients.caliMagic
         },
        notes: req.body.notes}}},
    {'new': true})
  .then(grow => res.status(201).json(grow.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });
});

app.put('/grows/:growId', (req, res) => {
  console.log(req.body);
  const updated = {};
  const updateableFields = ['endDate'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
 });
 Grow
   .findOneAndUpdate({shortId : req.params.growId }, { endDate : req.body.endDate }, {'new': true})
    .then(response => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
   });

   app.put('/entries/:growId/:entryId', (req, res) => {
     const updated = {};
     const updateableFields = ['notes'];
     updateableFields.forEach(field => {
       if (field in req.body) {
         updated[field] = req.body[field];
       }
    });

    Grow
      .findOneAndUpdate({shortId : req.params.growId, "entries.shortId" : req.params.entryId }, { "entries.$.notes" : req.body.notes }, {'new': true})
       .then(response => res.status(204).end())
       .catch(err => res.status(500).json({ message: 'Something went wrong' }));
      });

  app.delete('/grows/:growId', (req, res) => {
    Grow
    .findOneAndRemove({shortId : req.params.growId})
      .then(() => {
        res.status(204).end();
      });
   });

app.delete('/entries/:growId/:entryId', (req, res) => {
  Grow
  .findOneAndUpdate({shortId : req.params.growId}, {$pull: {entries: {shortId: req.params.entryId }}}, { 'new': true })
    .then(() => {
      res.status(204).end();
    });
 });

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(encodeURI(databaseUrl), err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
