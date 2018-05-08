const EventEmitter2 = require('eventemitter2');
const event = new EventEmitter2({
  wildcard: true,
  delimiter: '::',
  newListener: false,
  maxListeners: 100,
  verboseMemoryLeak: false
});

export default event;
