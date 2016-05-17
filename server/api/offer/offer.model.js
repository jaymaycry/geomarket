'use strict';

import mongoose from 'mongoose';

var OfferSchema = new mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  picture: { type: String, default: "/assets/images/placeholder.png" },
  name: String,
  description: String,
  loc: {
      type: [Number],
      index: '2d'
  },
  price: Number,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: function() {
    // Default length of offer -> 12 hours
    var date = new Date(Date.now());
    return date.setHours(date.getHours() + 12);
  }},
  views: { type: Number, default: 0 },
  comments: [
    {
      _creator:  { type: mongoose.Schema.ObjectId, ref: 'User' },
      date: { 
        type:Date,
        default: Date.now
      },
      text: String
    }
  ],
  status: { 
    type: String, 
    enum: ['open', 'selled'], 
    default: 'open'
  },
  active: {
    type: Boolean,
    default: true  
  }
},{
  timestamps: true
});

export default mongoose.model('Offer', OfferSchema);
