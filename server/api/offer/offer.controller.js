/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/offers              ->  index
 * POST    /api/offers              ->  create
 * GET     /api/offers/:id          ->  show
 * PUT     /api/offers/:id          ->  update
 * DELETE  /api/offers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Offer from './offer.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Offers
export function index(req, res) {
  // Maximum an Angeboten
  var limit = req.query.limit || 10;
  // Maximaler Umkreis
  var maxDistance = req.query.distance || 30;
  // Umrechnung in Radianten
  maxDistance /= 111.19444444;
  // Standort
  var coords = [];
  coords[0] = req.query.longitude;
  coords[1] = req.query.latitude;
  console.log(coords);
  
  return Offer.find({
    loc: {
          $near: coords,
          $maxDistance: maxDistance
    }})
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Offer from the DB
export function show(req, res) {
  return Offer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Offer in the DB
export function create(req, res) {
  return Offer.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Offer in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Offer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Offer from the DB
export function destroy(req, res) {
  return Offer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
