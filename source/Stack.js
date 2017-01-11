'use strict';

class Stack {

  constructor(val) {
    if (val && Array.isArray(val)) {
      this.stack = val;
      this.depth = val.length;
    } else if (val !== undefined) {
      this.stack = [val];
      this.depth = 1;
    } else {
      this.stack = [];
      this.depth = 0;
    }
  }

//-- CREATE -----------------------------
  push(value) {
    this.stack[this.depth] = value;
    this.depth ++;
    return this.depth;
  }

  pushCollection(collection) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        this.stack[this.depth] = collection[i];
        this.depth ++;
      }
    } else {
      for (let key in collection) {
        this.stack[this.depth] = collection[key];
        this.depth ++;
      }
    }
    return this.depth;
  }

//-- LOOKUP -----------------------------
  next() {
    return this.stack[this.depth-1];
  }

  peek(index) {
    return this.stack[(this.depth) - index];
  }

//-- DELETE -----------------------------
  pop() {
    let popped = this.stack[this.depth-1];
    this.stack = this.stack.splice(this.depth-1, 1);
    this.depth --;
    return popped;
  }

//-- HELPER -----------------------------
  merge(stackToMerge) {
    for (let i = 0; i < stackToMerge.stack.length; i++) {
      this.stack[this.depth] = stackToMerge.stack[i];
      this.depth ++;
    }
    return this.depth;
  }
}

module.exports = { Stack };
