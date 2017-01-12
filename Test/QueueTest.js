'use strict';

const Queue = require('../index').Queue,
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
      const fullQueue = [6, 7, 8, 9, 10, 1, 2, 3, 4, 5];
      myQueue.enqueueCollection(yourQueue)
      assert.deepEqual(myQueue.queue, fullQueue, 'enqueueCollection with array not working')     
    });

    it('pushCollection should take an object and add values to the top of the beginning of the queue', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      let yourObject = {
        a: 'A',
        b: 'B'
      };
      myQueue.enqueueCollection(yourObject);
      assert.deepEqual(myQueue.queue, ['A', 'B', 1, 2, 3, 4, 5], 'enqueueCollection with object not working')
    })

  });

  describe('Queue Lookup', () => {

    it('next should return the value of the next item to be dequeued', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      assert.equal(myQueue.next(), 5, 'next not working')
    });

    it('peak should return the value of item and the paramaterd depth', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      assert.equal(myQueue.peek(2), 4, 'peak not working')
      assert.equal(myQueue.peek(myQueue.length), 1, 'peak not working')
    });

  });

  describe('Queue Delete', () => {  

    it('dequeue should return the value at the end of the queue', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      assert.equal(myQueue.dequeue(), 5, 'dequeue not working')
    });

  });

  describe('Queue Helper', () => {

    it('merge should put the the collection of the parameter queue at the end of this queue', () => {
      let myQueue = new Queue([1, 2, 3, 4, 5]);
      const yourQueue = new Queue([6, 7, 8, 9, 10]);
      const fullQueue = [6, 7, 8, 9, 10, 1, 2, 3, 4, 5];
      assert.equal(myQueue.merge(yourQueue), 10, 'merge not returning right number')
      assert.deepEqual(myQueue.queue, fullQueue, 'merge not merging in right order')
    });

    it('length property should show length of the queue', () => {
      const myQueue = new Queue([1, 2, 3, 4, 5]);
      assert.equal(myQueue.length, 5, 'length not working')
    });

  });


});