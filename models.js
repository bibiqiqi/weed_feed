/*jshint esversion: 6*/
'use strict';

const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
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
});

const growSchema = mongoose.Schema({
  name: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: String,
  strain: String,
  entries: [entrySchema]
});

entrySchema.methods.serialize = function() {
  return {
    id: this._id,
    number: this.number,
    date: this.date,
    week: this.week,
    phase: this.phase,
    wasWatered: this.wasWatered,
    wasFed: this.wasFed,
    nutrients: {
      floraMicro: this.nutrients.floraMicro,
      floraGrow: this.nutrients.floraGrow,
      floraBloom: this.nutrients.floraBloom,
      caliMagic: this.nutrients.caliMagic
    },
    notes: this.notes
  };
};

growSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    startDate: this.startDate,
    endDate: this.endDate,
    strain: this.strain,
    entries: this.entries,
  };
};

const Grow = mongoose.model('Grow', growSchema);

module.exports = {Grow};
