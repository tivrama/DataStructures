'use strict';

const BinaryTree = require('../Collections/BinaryTree/BinaryTree.js').BinaryTree,
      assert = require('chai').assert;

describe('BinaryTree', () => {

  let myBinaryTree = new BinaryTree(10);
  myBinaryTree.addChild(5)
  myBinaryTree.addChild(2)
  myBinaryTree.addChild(7)
  myBinaryTree.addChild(15)
  myBinaryTree.addChild(17)
  myBinaryTree.addChild(12)
  myBinaryTree.addChild(11)

  describe('BinaryTree Create', () => {  

    it('creating new BinaryTree should take a value', () => {
      const myBinaryTree2 = new BinaryTree(1);
      assert.equal(myBinaryTree2.value, 1, 'creat new BinaryTree not working')
    });

    it('addChild should add grandchildren', () => {
      assert.equal(myBinaryTree.right.left.left.value, 11, 'create new BinaryTree not working')
    });

  });

  describe('BinaryTree Lookup', () => { 
    it('contains should return true if value exists and false if not', () => {
      assert.isTrue(myBinaryTree.contains(11));
      assert.isFalse(myBinaryTree.contains(13));
    });

    it('countNodes should return the number of nodes', () => {
      assert.equal(myBinaryTree.countNodes(), 8, 'countNodes not working')
    });

  });

  describe('BinaryTree Helper Functions', () => {

    it('mapToArray should return a sorted array', () => {
      const soln = [2,5,7,10,11,12,15,17];
      const test = myBinaryTree.mapToArray();
      for (let i = 0; i < soln.length; i++) {
        assert.equal(test[i], soln[i], 'Should make an array of sorted values');
      } 
    });    

    it('mapToArray should return a sorted array with a callback invoked on each item', () => {
      const soln = [4,10,14,20,22,24,30,34];
      const test = myBinaryTree.mapToArray((val) => val * 2);
      for (let i = 0; i < soln.length; i++) {
        assert.equal(test[i], soln[i], 'Should make an array of sorted values');
      } 
    });  

    it('filterToArray should return an array of items that pass callback predicate', () => {
      const soln = [2,10,12];
      const test = myBinaryTree.filterToArray((val) => val % 2 === 0);
      for (let i = 0; i < soln.length; i++) {
        assert.equal(test[i], soln[i], 'Should make an array of sorted values which pass the callback predicate');
      } 
    }); 

  });

});
