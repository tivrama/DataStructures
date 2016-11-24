'use strict';

const BinaryTree = require('../Collections/BinaryTree/BinaryTree.js').BinaryTree,
      assert = require('chai').assert;

describe('BinaryTree', () => {

  let myBinaryTree = new BinaryTree('A');
  myBinaryTree.addChild('B')
  myBinaryTree.addChild('C')
  myBinaryTree.addChild('D')
  myBinaryTree.addChild('E')
  myBinaryTree.addChild('F')
  myBinaryTree.addChild('G')
  myBinaryTree.addChild('H')
  myBinaryTree.addChild('I')
  myBinaryTree.addChild('J')

  describe('BinaryTree Create', () => {  

    it('creating new BinaryTree should take a value', () => {
      const myBinaryTree2 = new BinaryTree('Hello World');
      assert.equal(myBinaryTree2.value, 'Hello World', 'creat new BinaryTree not working')
    });

    it('addChild should add grandchildren', () => {
      assert.isTrue(myBinaryTree.containsVal('A'));
      assert.isTrue(myBinaryTree.containsVal('C'));
      assert.isTrue(myBinaryTree.containsVal('F'));
      assert.isTrue(myBinaryTree.containsVal('H'));
    });

  });

  describe('BinaryTree Lookup', () => {

    it('containsVal should return true if value exists and false if not', () => {
      assert.isTrue(myBinaryTree.containsVal('B'));
      assert.isFalse(myBinaryTree.containsVal('K'));
    });

    it('containsId should return true if id exists and false if not', () => {
      const testId1 = myBinaryTree.__id;
      assert.isTrue(myBinaryTree.containsId(testId1));
      if (myBinaryTree.left) {
        const testId2 = myBinaryTree.left.__id;
        assert.isTrue(myBinaryTree.containsId(testId2));
      }
      if (myBinaryTree.right) {
        const testId3 = myBinaryTree.right.__id;
        assert.isTrue(myBinaryTree.containsId(testId3));
      }
      assert.isFalse(myBinaryTree.containsId('fake_id'));
    });

    it('getId should return the id of a given value, or null if not found', () => {
      const testId1 = myBinaryTree.__id;
      assert.equal(myBinaryTree.getId('A'), testId1, 'getId not working')
      assert.equal(myBinaryTree.getId('Not in BTree'), null, 'getId not working')     
    });

    it('lookupId should return value at id, or null if not found', () => {
      let testId1 = myBinaryTree.__id;
      let testVal1 = myBinaryTree.value;
      assert.equal(myBinaryTree.lookupId(testId1), testVal1, 'lookupId not working')
      if (myBinaryTree.left) {
        let testId2 = myBinaryTree.left.__id;
        let testVal2 = myBinaryTree.left.value;
        assert.equal(myBinaryTree.lookupId(testId2), testVal2, 'lookupId not working')
      }
      if (myBinaryTree.right) {
        let testId3 = myBinaryTree.right.__id;
        let testVal3 = myBinaryTree.right.value;
        assert.equal(myBinaryTree.lookupId(testId3), testVal3, 'lookupId not working')
      }
      assert.equal(myBinaryTree.lookupId('fake_id'), null, 'lookupId not working')
    });

    it('countNodes should return the number of nodes', () => {
      assert.equal(myBinaryTree.countNodes(), 10, 'countNodes not working')
    });

  });

  describe('BinaryTree Update', () => {
    let myBinaryTree3 = new BinaryTree('A');
    myBinaryTree3.addChild('B')
    myBinaryTree3.addChild('C')
    myBinaryTree3.addChild('D')
    myBinaryTree3.addChild('E')
    myBinaryTree3.addChild('F')
    myBinaryTree3.addChild('G')
    myBinaryTree3.addChild('H')
    myBinaryTree3.addChild('I')
    myBinaryTree3.addChild('J')

    it('updateId should update value at id, or null if not found', () => {
      let testId1 = myBinaryTree3.__id;
      myBinaryTree3.updateId(testId1, 'Hello World')
      let testVal1 = myBinaryTree3.value;
      assert.equal(myBinaryTree3.lookupId(testId1), testVal1, 'updateId not working')
      if (myBinaryTree3.left) {
        let testId2 = myBinaryTree3.left.__id;
        myBinaryTree3.updateId(testId2, 'Foo bar')
        let testVal2 = myBinaryTree3.left.value;
        assert.equal(myBinaryTree3.lookupId(testId2), testVal2, 'updateId not working')
      }
      if (myBinaryTree3.right) {
        let testId3 = myBinaryTree3.right.__id;
        myBinaryTree3.updateId(testId3, 'Baz')
        let testVal3 = myBinaryTree3.right.value;
        assert.equal(myBinaryTree3.lookupId(testId3), testVal3, 'updateId not working')
      }
      assert.equal(myBinaryTree3.updateId('fake_id'), null, 'lookupId not working')
    });

    it('updateId should return updated value at id, or null if not found', () => {
      let testId1 = myBinaryTree3.__id;
      assert.equal(myBinaryTree3.updateId(testId1, 'Good Bye World'), 'Good Bye World', 'return for updateId not working')
    });

  });

  describe('BinaryTree Delete', () => {
    let myBinaryTree2 = new BinaryTree(10);
    myBinaryTree2.addChild(5)
    myBinaryTree2.addChild(2)
    myBinaryTree2.addChild(7)
    myBinaryTree2.addChild(6)
    myBinaryTree2.addChild(15)
    myBinaryTree2.addChild(17)
    myBinaryTree2.addChild(12)
    myBinaryTree2.addChild(11)


    it('deleteNode should delete leaf', () => {
      let myBinaryTree3 = new BinaryTree('Hello');
      myBinaryTree3.addChild('world')
      myBinaryTree3.addChild('Foo')
      let fooId = myBinaryTree3.getId('Foo');
      myBinaryTree3.deleteNode(fooId)
      assert.isFalse(myBinaryTree2.containsVal('Foo'));
    });

    xit('deleteNode should delete a node with children, but keep the children', () => {
      myBinaryTree2.deleteNode(5)
      assert.isFalse(myBinaryTree2.containsVal(5));
      assert.isTrue(myBinaryTree2.containsVal(7));
      assert.isTrue(myBinaryTree2.containsVal(6));
    });

    xit('deleteNode should replace the root, but keep the children', () => {
      myBinaryTree2.deleteNode(10)
      console.log('myBinaryTree2: ', myBinaryTree2);
      assert.isFalse(myBinaryTree2.containsVal(10));
      assert.isTrue(myBinaryTree2.containsVal(7));
      assert.isTrue(myBinaryTree2.containsVal(6));
    });

  });



  xdescribe('BinaryTree Helper Functions', () => {

    it('mapToArray should return a sorted array', () => {
      const soln = [2,5,7,10,11,12,15,17];
      const test = myBinaryTree.mapToArray();
		  assert.deepEqual(soln, test);
    });    

    it('mapToArray should return a sorted array with a callback invoked on each item', () => {
      const soln = [4,10,14,20,22,24,30,34];
      const test = myBinaryTree.mapToArray((val) => val * 2);
      assert.deepEqual(soln, test);
    });  

    it('filterToArray should return an array of items that pass callback predicate', () => {
      const soln = [2,10,12];
      const test = myBinaryTree.filterToArray((val) => val % 2 === 0);
      assert.deepEqual(soln, test);
    }); 

  });

});
