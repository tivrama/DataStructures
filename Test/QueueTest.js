'use strict';

const Queue = require('../source/Queue.js').Queue,
      assert = require('chai').assert;

describe('Queue', () => {

  describe('Queue Create', () => {  

    it('creating new Queue should take a value', () => {
      let myQueue = new Queue(1);
      assert.equal(myQueue.queue[0], 1, 'create new Queue not working')
    });

    it('creating new queue with an array should make the queue be the array', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      assert.deepEqual(myQueue.queue, [1, 2, 3, 4, 5], 'create new Queue with an array not working')
    });

    it('enqueue should return the new length of the queue', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      assert.deepEqual(myQueue.enqueue(6), 6, 'enqueue not working')
    });

    it('enqueueCollection should take an array and add to the top of the stack', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      const yourQueue = [6, 7, 8, 9, 10];
      const fullQueue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      myQueue.pushCollection(yourQueue)
      assert.deepEqual(myQueue.queue, fullQueue, 'enqueueCollection with array not working')     
    });

    xit('pushCollection should take and object and add values to the top of the stack', () => {
      let myStack = new Stack([1, 2, 3, 4, 5]);
      let yourObject = {
        a: 'A',
        b: 'B'
      };
      myStack.pushCollection(yourObject);
      assert.deepEqual(myStack.stack, [1, 2, 3, 4, 5, 'A', 'B'], 'pushCollection with object not working')
    })

  });

  describe('Queue Delete', () => {  

    xit('dequeue should return the value at the end of the queue', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      assert.equal(myQueue.pop(), 5, 'dequeue not working')
    });

  });

  describe('Queue Helper', () => {

    xit('merge should put the the collection of the parameter stack on top of this stack', () => {
      let myStack = new Queue([1, 2, 3, 4, 5]);
      const yourStack = new Queue([6, 7, 8, 9, 10]);
      const fullStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      assert.equal(myStack.merge(yourStack), 10, 'merge not returning right number')
      assert.deepEqual(myStack.stack, fullStack, 'merge not merging in right order')
    });

    xit('depth property should show depth of the stack', () => {
      const myStack = new Stack([1, 2, 3, 4, 5]);
      assert.equal(myStack.depth, 5, 'depth not working')
    });

  });


});