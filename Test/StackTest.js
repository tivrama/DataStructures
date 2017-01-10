'use strict';

const Stack = require('../source/Stack.js').Stack,
      assert = require('chai').assert;

describe('Stack', () => {

  describe('Stack Create', () => {  

    it('creating new stack should take a value', () => {
      let myStack = new Stack(1);
      assert.equal(myStack.stack[0], 1, 'create new Stack not working')
    });

    it('creating new stack with an array should make the stack be the array', () => {
      let myStack = new Stack([1, 2, 3, 4, 5]);
      assert.deepEqual(myStack.stack, [1, 2, 3, 4, 5], 'create new Stack ith an array not working')
    });

    it('push sould return the new length of the stack', () => {
      let myStack = new Stack([1, 2, 3, 4, 5]);
      assert.deepEqual(myStack.push(6), 6, 'push not working')
    });

    it('pushCollection should take and array and add to the top of the stack', () => {
      let myStack = new Stack([1, 2, 3, 4, 5]);
      const yourStack = [6, 7, 8, 9, 10];
      const fullStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      myStack.pushCollection(yourStack)
      assert.deepEqual(myStack.stack, fullStack, 'pushCollection with array not working')     
    });

    it('pushCollection should take and object and add values to the top of the stack', () => {
      let myStack = new Stack([1, 2, 3, 4, 5]);
      let yourObject = {
        a: 'A',
        b: 'B'
      };
      myStack.pushCollection(yourObject);
      assert.deepEqual(myStack.stack, [1, 2, 3, 4, 5, 'A', 'B'], 'pushCollection with object not working')
    })

  });

  describe('Stack Delete', () => {  

    it('pop should return the value at the top of the stack', () => {
      let myStack = new Stack([1, 2, 3, 4, 5]);
      assert.equal(myStack.pop(), 5, 'pop not working')
    });

  });

  describe('Stack Helper', () => {

    it('merge should put the the collection of the parameter stack on top of this stack', () => {
      let myStack = new Stack([1, 2, 3, 4, 5]);
      const yourStack = new Stack([6, 7, 8, 9, 10]);
      const fullStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      assert.equal(myStack.merge(yourStack), 10, 'merge not returning right number')
      assert.deepEqual(myStack.stack, fullStack, 'merge not merging in right order')
    });

    it('depth property should show depth of the stack', () => {
      const myStack = new Stack([1, 2, 3, 4, 5]);
      assert.equal(myStack.depth, 5, 'depth not working')
    });

  });


});