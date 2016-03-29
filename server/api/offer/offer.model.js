'use strict';

import mongoose from 'mongoose';

var OfferSchema = new mongoose.Schema({
  name: String,
  description: String,
  loc: {
      type: [Number],
      index: '2d'
  },
  price: Number,
  startDate: Date,
  endDate: Date,
  viewCounter: Number,
  active: Boolean
});

export default mongoose.model('Offer', OfferSchema);
