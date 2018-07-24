/*jshint esversion: 6*/
'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

const entrySchema = mongoose.Schema({
  shortId: String,
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
  shortId: String,
  name: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: String,
  strain: {type: String, required: true},
  growType: {type: String, required: true},
  entries: [entrySchema]
});

const nutrientSchema = mongoose.Schema({
  week: String,
  phase: String,
  stage: String,
  nutrients: Array
});

const scheduleSchema = mongoose.Schema({
  name: String,
  schedule: [nutrientSchema]
});

entrySchema.methods.serialize = function() {
  return {
    id: this._id,
    shortId: this.shortId,
    number: this.number,
    date: moment(this.date).format('YYYY-MM-DD'),
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
    shortId: this.shortId,
    name: this.name,
    startDate: moment(this.startDate).format('YYYY-MM-DD'),
    endDate: moment(this.endDate).format('YYYY-MM-DD'),
    strain: this.strain,
    growType: this.growType,
    entries: this.entries
  };
};

nutrientSchema.methods.serialize = function() {
  return {
    id: this._id,
    shortId: this.shortId,
    week: this.week,
    phase: this.phase,
    stage: this.phase,
    nutrients: this.nutrients
  };
};

scheduleSchema.methods.serialize = function() {
  return {
    name: this.name,
    schedule: this.schedule
  };
};

const Grow = mongoose.model('Grow', growSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = {Grow, Schedule};
