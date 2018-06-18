/*jshint esversion: 6*/
'use strict';

const mongoose = require('mongoose');

const growSchema = mongoose.Schema({
  name: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: String,
  strain: String,
  entries: [{
    number: Number,
    date: String,
    week: Number,
    phase: String,
    wasWatered: Boolean,
    wasFed: Boolean,
    nutrients: {
      floraMicro: String,
      floraGrow: String,
      floraBloom: String,
      caliMagic: String
    },
    notes: String
  }]
});


const Grow = mongoose.model('Grow', growSchema);

module.exports = {Grow};
