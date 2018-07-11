/*jshint esversion: 6*/
'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Grow } = require('./models');

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

app.get('/grows/:id', (req, res) => {
  Grow
    .findById(req.params.id)
    .then(grow => res.json(grow.serialize()))
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
       name: req.body.name,
       startDate: req.body.startDate,
       endDate: '',
       strain: req.body.strain,
       entries: []
     })
     .then(grow => res.status(201).json(grow.serialize()))
     .catch(err => {
       console.error(err);
       res.status(500).json({ error: 'Something went wrong' });
     });
 });

 app.post('/entries/:grow-id', (req, res) => {
   console.log(`growId received from request: ${req.body.growId}`);
   const requiredFields = ['number','date', 'week', 'phase', 'wasWatered', 'wasFed', 'nutrients', 'notes'];
   for (let i = 0; i < requiredFields.length; i++) {
     const field = requiredFields[i];
     if (!(field in req.body)) {
       const message = `Missing \`${field}\` in request body`;
       return res.status(400).send(message);
     }
   }
  Grow.findByIdAndUpdate(
    req.body.growId,
    {$push: {entries:
      {number: req.body.number,
      date: req.body.date,
      week: req.body.week,
      phase: req.body.phase,
      wasWatered: req.body.wasWatered,
      wasFed: req.body.wasFed,
      nutrients: {
       floraMicro: req.body.nutrients.floraMicro,
       floraGrow: req.body.nutrients.floraGrow,
       floraBloom: req.body.nutrients.floraBloom,
       caliMagic: req.body.nutrients.caliMagic
       },
      notes: req.body.notes}}},
    {'new': true},
    function(err, grow){
      if (err) {
        console.log(err.message);
      }
      else {
        console.log(`it worked! and this the added entry: ${grow.entries[grow.entries.length-1]}`);
      }
    })
  .then(grow => res.status(201).json(grow.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });
})

   app.put('/entries/:id', (req, res) => {
     if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
       res.status(400).json({
         error: 'Request path id and request body id values must match'
       });
     }
     const updated = {};
     const updateableFields = ['notes'];
     updateableFields.forEach(field => {
       if (field in req.body) {
         updated[field] = req.body[field];
       }
    });

    Grow
      .findOneAndUpdate({_id : req.body.growId, "entries._id" : req.body.id }, { "entries.$.notes" : req.body.notes }, {'new': true},
      function(err, product){
        if (err) {
          console.log('it didnt work');
        }
        else {
          console.log(`it worked! and this is the product: ${product}`);
        }
      })
       .then(restaurant => res.status(204).end())
       .catch(err => res.status(500).json({ message: 'Something went wrong' }));
      });

app.delete('/entries/:id', (req, res) => {
  Grow
  .findOneAndUpdate({_id : req.body.growId}, {$pull: {entries: {_id: req.body.id }}}, { 'new': true }, function(err, doc){
        if(err) {
          return res.status(500).json({'error' : 'error in deleting address'});
        }
        else {
        console.log(`it worked and this is what was deleted: ${doc}`);
        }
       })
    .then(() => {
      console.log(`Deleted entry with id \`${req.body.id}\``);
      res.status(204).end();
    });
 });

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    //console.log(DATABASE_URL);
    //console.log(encodeURI(databaseUrl));
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
