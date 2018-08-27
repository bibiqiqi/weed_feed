/*jshint esversion: 6*/
'use strict';

// TODO: add phase progress into data structure

const mongoose = require('mongoose');
const moment = require('moment');

const entrySchema = mongoose.Schema({
  shortId: String,
  number: Number,
  date: String,
  week: Number,
  phaseProgress: {
    phase: String,
    phaseStartDate: String,
    week: Number,
    stage: String
  },
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
  endDate: mongoose.Schema.Types.Mixed,
  strain: {type: String, required: true},
  entries: [entrySchema]
});

const nutrientSchema = mongoose.Schema({
  phase: String,
  stage: String,
  nutrients: {
    floraMicro: String,
    floraGrow: String,
    floraBloom: String,
    caliMagic: String
  },
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
    date: moment(this.date),
    week: this.week,
    phaseProgress: {
      phase: this.phaseProgress.phase,
      phaseStartDate: moment(this.phaseProgress.phaseStartDate).format('YYYY-MM-DD'),
      week: this.phaseProgress.week,
      stage: this.phaseProgress.stage
    },
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
    startDate: moment(this.startDate),
    //.format("YYYY-MM-DD HH:mm:ss"),
    endDate: this.endDate,
    strain: this.strain,
    entries: this.entries
  };
};

nutrientSchema.methods.serialize = function() {
  return {
    phase: this.phase,
    stage: this.phase,
    nutrients: {
      floraMicro: this.nutrients.floraMicro,
      floraGrow: this.nutrients.floraGrow,
      floraBloom: this.nutrients.floraBloom,
      caliMagic: this.nutrients.caliMagic,
    }
  };
};

scheduleSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    schedule: this.schedule
  };
};

const Grow = mongoose.model('Grow', growSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = {Grow, Schedule};
