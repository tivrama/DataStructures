'use strict';

class Stack {

  constructor(val) {
    if (val && Array.isArray(val)) {
      this.stack = val;
    } else if (val !== undefined) {
      this.stack = [val];
    } else {
      this.stack = [];
    }
  }


//-- CREATE -----------------------------

  push(value) {
    return this.stack.push(value);
  }

//-- DELETE -----------------------------

  pop() {
    return this.stack.pop();
  }


//-- HELPER -----------------------------

  length() {
    return this.stack.length;
  }

}

module.exports = { Stack };
