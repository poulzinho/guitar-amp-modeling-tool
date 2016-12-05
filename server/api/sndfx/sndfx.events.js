/**
 * Sndfx model events
 */

'use strict';

import {EventEmitter} from 'events';
import Sndfx from './sndfx.model';
var SndfxEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SndfxEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Sndfx.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SndfxEvents.emit(event + ':' + doc._id, doc);
    SndfxEvents.emit(event, doc);
  }
}

export default SndfxEvents;
