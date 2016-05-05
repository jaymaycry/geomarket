/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
//import Thing from '../api/thing/thing.model';
import Offer from '../api/offer/offer.model';
import User from '../api/user/user.model';

var creatorId = "";

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then((user) => {
      console.log('finished populating users');
      creatorId = user._id;
      
      Offer.find({}).remove()
        .then(() => {
          Offer.create({
            _creator: creatorId,
            name: 'Test 1 - ZHAW',
            description: 'Test 1 Description',
            loc: [
              8.5324405,
              47.3778249
            ],
            price: 100,
            viewCounter: 0,
            comments:[],
            active: true
          },
          {
            _creator: creatorId,
            name:'Test 1 - Enge',
            description: 'Test 1 Description',
            loc: [
              8.5276642,
              47.3547855
            ],
            price: 100,
            viewCounter: 0,
            comments:[],
            active: true
          },
          {
            _creator: creatorId,
            name:'Test 3 - Richterswil',
            description: 'Test 3 Description',
            loc: [
              8.7043081,
              47.2074848
            ],
            
            price: 100,
            viewCounter: 0,
            comments:[ {
              date: Date.now(),
              text: "this is an example comment"
            }],
            active: true
          })
          .then(() => {
            console.log("finished populating offers");
          });
        });
    });
  });