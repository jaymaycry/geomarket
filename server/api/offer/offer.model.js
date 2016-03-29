'use strict';

import mongoose from 'mongoose';

var OfferSchema = new mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
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
  comments: [
    {
      _creator:  { type: mongoose.Schema.ObjectId, ref: 'User' },
      date: Date,
      text: String
    }
  ],
  active: Boolean
});

export default mongoose.model('Offer', OfferSchema);
