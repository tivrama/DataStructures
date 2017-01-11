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
    if (Array.isArray(collection)) {
      for (let i = collection.length-1; i >= 0; i--) {
        this.enqueue(collection[i]);
      }
    } else {
      let temp = [];
      for (let key in collection) {
        temp.push(collection[key])
      }
      for (let i = temp.length-1; i >= 0; i--) {
        this.enqueue(temp[i]);
      }
    }

    return this.length;
  }
//-- LOOKUP -----------------------------
  next() {
    return this.queue[this.length-1];
  }

  peek(index) {
    return this.queue[(this.length) - index];
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
    this.enqueueCollection(queueToMerge.queue);
    return this.length;
  }

}

module.exports = { Queue };
