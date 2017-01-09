'use strict';

const Stack = require('../source/Stack.js').Stack,
      assert = require('chai').assert;

describe('Stack', () => {

  describe('Stack Create', () => {  

    it('creating new stack should take a value', () => {
      const myStack = new Stack(1);
      assert.equal(myStack.stack[0], 1, 'create new Stack not working')
    });

    it('creating new stack with an array should make the stack be the array', () => {
      const myStack = new Stack([1, 2, 3, 4, 5]);
      assert.deepEqual(myStack.stack, [1, 2, 3, 4, 5], 'create new Stack not working')
    });

    it('push sould return the new length of the stack', () => {
      const myStack = new Stack([1, 2, 3, 4, 5]);
      assert.deepEqual(myStack.push(6), 6, 'create new Stack not working')
    });

  });

  describe('Stack Delete', () => {  

    it('pop should return the value at the top of the stack', () => {
      const myStack = new Stack([1, 2, 3, 4, 5]);
      assert.equal(myStack.pop(), 5, 'create new Stack not working')
    });

  });


});