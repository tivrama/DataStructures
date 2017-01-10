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
    this.queue = [value].concat(this.queue);
    this.length ++;
    return this.length;
  }

  enqueueCollection(collection) {

  }

//-- LOOKUP -----------------------------

  next() {
    return this.queue[this.length-1]
  }

  peek(index) {
    
  }

//-- DELETE -----------------------------

  dequeue() {
    let dequeued = this.queue[this.length-1];
    this.queue = this.queue.splice(this.length-1, 1);
    this.length --;
    return dequeued;
  }


//-- HELPER -----------------------------

  merge(queueToMerge) {

  }

}

module.exports = { Queue };
