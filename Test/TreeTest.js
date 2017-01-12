'use strict';

const Tree = require('../index').Tree,
      assert = require('chai').assert;

describe('Tree', () => {

  describe('Tree Create', () => {  

    it('creating new tree should take a value', () => {
      const myTree = new Tree(1);
      assert.equal(myTree.value, 1, 'creat new Tree not working')
    });

    it('should add children to the tree', function() {
      const myTree = new Tree(4);
      myTree.addChild(5);
      assert.equal(myTree.children[0].value, 5);
    });

    it('should return the newly created child of the new tree', function() {
      const myTree = new Tree(4);
      const test = myTree.addChild(5);
      assert.equal(test, myTree.children[0]);
    });

    it('should add grandchildren', function() {
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      assert.equal(myTree.children[1].children[0].value, 7);
    });

  });


  describe('Tree Lookup', () => { 

    it('should find contained values', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      assert.isTrue(myTree.contains(5));
    });

    it('should find a grandchild with input value', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      assert.isTrue(myTree.contains(7));
    });

    it('should return false if value is not in the tree', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      assert.isFalse(myTree.contains(8));
    });

    it('should return the number of leaves', function(){
      const myTree = new Tree(4);
      myTree.addChild('leaf1');
      myTree.addChild('branch');
      myTree.addChild('branch');
      myTree.children[1].addChild('branch');
      myTree.children[2].addChild('leaf2');
      myTree.children[2].addChild('leaf3');
      myTree.children[2].children[0].addChild('leaf4');
      assert.equal(myTree.countLeaves(), 4);
    });

  });

  describe('Tree Update', () => {  

    it('updateValue should find value and replace with new value', () => {
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.updateValue(7, 8);
      assert.isFalse(myTree.contains(7));
      assert.isTrue(myTree.contains(8));
    });

    it('updateValue should not do anything if value is not found', () => {
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.updateValue(10, 8);
      assert.isTrue(myTree.contains(7));
      assert.isFalse(myTree.contains(8));
    });

  });

  describe('Tree Delete', () => { 

    it('deleteLeaf should find and delete leaf with input value', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.deleteLeaf(7);
      assert.isFalse(myTree.contains(7));
    });

    it('deleteLeaf should not delete value if it is a branch', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.deleteLeaf(6);
      assert.isTrue(myTree.contains(6));
    });

    it('deleteLeaf should not delete the root', function(){
      const myTree = new Tree(4);
      myTree.deleteLeaf(4);
      assert.isTrue(myTree.contains(4));
    });

    it('deleteBranchWithChilden should find and delete a branch with input value', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.deleteBranchWithChilden(6);
      assert.isFalse(myTree.contains(6));
      assert.isFalse(myTree.contains(7));
    });

    it('deleteNode should not delete the root', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.deleteNode(4);
      assert.equal(myTree.value, 4);
    });

    it('deleteNode should find and delete a branch without deleting its children', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.deleteNode(6);
      assert.isFalse(myTree.contains(6));
      assert.isTrue(myTree.contains(7));
    });

    it('deleteBranchWithChilden should find and delete a leaf with input value', function(){
      const myTree = new Tree(4);
      myTree.addChild(5);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.deleteBranchWithChilden(7);
      assert.isFalse(myTree.contains(7));
    });

    it('deleteBranchWithChilden should not delete the root', function(){
      const myTree = new Tree(4);
      myTree.deleteBranchWithChilden(4);
      assert.isTrue(myTree.contains(4));
    });

    it('removeDuplicates should find and remove all duplicates from the tree', function(){
      const myTree = new Tree(4);
      myTree.addChild(14);
      myTree.addChild(6);
      myTree.children[1].addChild(7);
      myTree.children[1].addChild(14);
      assert.isTrue(myTree.children[1].contains(14));
      myTree.removeDuplicates();
      assert.isFalse(myTree.children[1].contains(14));
    });

  });


  describe('Tree Helper Methods', () => { 

    it('onEach should invoke callback on each node', function(){
      const myTree2 = new Tree(1);
      myTree2.addChild(2);
      myTree2.addChild(3);
      myTree2.addChild(4);
      myTree2.children[0].addChild(5);
      myTree2.children[0].addChild(6);
      myTree2.children[1].addChild(7);
      myTree2.children[1].addChild(8);
      myTree2.onEach((val) => ( val * 2 ));
      const soln = [2,4,6,8,10,12,14,16];
      let resultArray = myTree2.mapToArray();
      resultArray = resultArray.sort((a, b) => a - b );
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should invoke callback on every value in list');
      }
    });

    const myTree = new Tree(1);
    myTree.addChild(2);
    myTree.addChild(3);
    myTree.addChild(4);
    myTree.children[0].addChild(5);
    myTree.children[0].addChild(6);
    myTree.children[1].addChild(7);
    myTree.children[1].addChild(8);

    it('mapToArray should invoke callback on each node and return as an array', function(){
      const soln = [2,4,6,8,10,12,14,16];
      let resultArray = myTree.mapToArray((val) => ( val * 2 ));
      resultArray = resultArray.sort((a, b) => a - b );
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with the values from the Linked List');
      }
    });

    it('mapToArray with no callback should return an array of unchanged values', function(){
      const soln = [1,2,3,4,5,6,7,8];
      let resultArray = myTree.mapToArray();
      resultArray = resultArray.sort((a, b) => a - b );
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with the values from the Linked List');
      }
    });

    it('filterToArray should return an array of values which pass callback predicate', function(){
      const soln = [2,4,6,8];
      let resultArray = myTree.filterToArray((val) => ( val % 2 === 0 ));
      resultArray = resultArray.sort((a, b) => a - b );
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with the values from the Linked List');
      }
    });

  });

});