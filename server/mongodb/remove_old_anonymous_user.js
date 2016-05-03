/**
 * Created by drozdse1 on 19.04.16.
 */

// delete all offer where user is anonymous and older then 3 days

db.users.find({role:"anonymous", created_at: {"$lt": Date(ISODate().getTime() - 1000 * 86400 * 3)}}).forEach(function (user) {
  db.offers.remove({user:user.username});
});

// delete all users where

db.users.find({role:"anonymous", created_at: {"$lt": Date(ISODate().getTime() - 1000 * 86400 * 3)}}).forEach(function (user) {
  db.offers.remove({_creator:user._id});
});


