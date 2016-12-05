/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sndfxs              ->  index
 * POST    /api/sndfxs              ->  create
 * GET     /api/sndfxs/:id          ->  show
 * PUT     /api/sndfxs/:id          ->  update
 * DELETE  /api/sndfxs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Sndfx from './sndfx.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    // var updated = _.merge(entity, updates); // this produces a problem when updating subarrays
    var updated = _.extend(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Sndfxs
export function index(req, res) {
  var userId = req.query.userId;
  var name = req.query.searchFilter;

  if (userId != null) {
    return Sndfx.find({owner: userId})
      .populate('creator owner')
      .exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else if (name != null) { //{$regex:name, $options:"i"}
    return Sndfx.find({name: new RegExp(name, "i")})
      .populate('creator owner')
      .exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else {
    return Sndfx.find({publications: {$gt: []}})
      .populate('creator owner')
      .exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}


// Gets a single Sndfx from the DB
export function show(req, res) {
  return Sndfx.findById(req.params.id)
    .populate('creator owner')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Sndfx in the DB
export function create(req, res) {
  return Sndfx.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Sndfx in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Sndfx.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Sndfx from the DB
export function destroy(req, res) {
  return Sndfx.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
