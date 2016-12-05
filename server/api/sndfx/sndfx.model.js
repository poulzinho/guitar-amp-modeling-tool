'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var SndfxSchema = new mongoose.Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  license: String,
  name: String,
  class: String,
  imgURL: String,
  rating: Number,
  description: String,
  filters: [{
    filter: String,
    value: Number,
    name: String,
    widget: String,
    sizeX: Number,
    sizeY: Number,
    row: Number,
    col: Number,
    timestamp: String
  }],
  publications: [{
    license: String,
    price: Number,
    updated: {type: Date, default: Date.now}
  }]
});

export default mongoose.model('Sndfx', SndfxSchema);
