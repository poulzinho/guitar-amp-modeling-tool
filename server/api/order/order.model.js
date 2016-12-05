'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  orderDate: { type: Date, default: Date.now },
  vat: Number,
  publishedSndfxs: [{
    sndfx: { type: Schema.Types.ObjectId, ref: 'Sndfx'},
    license: String,
    price: Number
  }]
});

export default mongoose.model('Order', OrderSchema);
