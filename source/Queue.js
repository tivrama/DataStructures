'use strict';

class Queue {

  constructor(val) {
    if (val && Array.isArray(val)) {
      this.queue = val;
      this.length = val.length;
    } else if (val !== undefined) {
      this.queue = [val];
      this.length = 1;
    } else {
      this.queue = [];
      this.length = 0;
    }
  }


//-- CREATE -----------------------------

  enqueue(value) {
    this.queue[this.length] = value;
    this.length ++;
    return this.length;
  }

  enqueueCollection(collection) {

  }

//-- DELETE -----------------------------

  dequeue() {

  }


//-- HELPER -----------------------------

  merge(queueToMerge) {

}

module.exports = { Queue };
