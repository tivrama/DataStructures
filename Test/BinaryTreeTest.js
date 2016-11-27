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
    let myBinaryTree = new BinaryTree(0);
    for (let i = 1; i < 10; i++) {
      myBinaryTree.addChild(i);
    }

    it('deleteNode should return null if no id is passed in', () => {
      assert.equal(myBinaryTree.deleteNode(), null, 'deleteNode with no id not working');
    });

    it('deleteNode should return null if there are no children and root id does not match', () => {
      let myBinaryTree1 = new BinaryTree(0);
      assert.equal(myBinaryTree1.deleteNode('fake_id'), null, 'deleteNode with fake id not working');
    });

    it('deleteNode should return node with value set to null if there are no children and root id does match', () => {
      let myBinaryTree2 = new BinaryTree(0);
      let rootId = myBinaryTree2.__id;
      myBinaryTree2.deleteNode(rootId)
      assert.equal(myBinaryTree2.value, null, 'deleteNode with id and no children not working');
    });

    it('deleteNode should delete leaf', () => {
      const treeLength = myBinaryTree.mapIdToArray().length;
      let firstLeaf;
      const findLeaf = (node) => {
        if (!node.left && !node.right) {
          firstLeaf = node.__id;
          return firstLeaf
        }
        if (node.left) {
          findLeaf(node.left)
        }
        if (node.right) {
          findLeaf(node.right)
        }
      }
      findLeaf(myBinaryTree);
      myBinaryTree.deleteNode(firstLeaf);
      assert.isFalse(myBinaryTree.containsId(firstLeaf));
      assert.equal(myBinaryTree.mapIdToArray().length, treeLength - 1, 'deleteNode at leaf not working')
    });

    it('deleteNode should delete a node with children, but keep the children', () => {
      let myBinaryTree = new BinaryTree(0);
      for (let i = 1; i < 10; i++) {
        myBinaryTree.addChild(i);
      }
      const treeLength = myBinaryTree.mapIdToArray().length;
      let nodesDeleted = 0;

      if (myBinaryTree.left) {
        if (myBinaryTree.left.left) {
          nodesDeleted++;
          var leftParent = myBinaryTree.left.__id
          var leftChild = myBinaryTree.left.left.__id
          myBinaryTree.deleteNode(leftParent);
        assert.isFalse(myBinaryTree.containsId(leftParent));
        assert.isTrue(myBinaryTree.containsId(leftChild));
        assert.equal(myBinaryTree.mapIdToArray().length, treeLength - nodesDeleted, 'deleteNode at leaf not working')
        }
      }
      if (myBinaryTree.right) {
        if (myBinaryTree.right.right) {
          nodesDeleted++;
          var rightParent = myBinaryTree.right.__id
          var rightChild = myBinaryTree.right.right.__id
          myBinaryTree.deleteNode(rightParent);
        assert.isFalse(myBinaryTree.containsId(rightParent));
        assert.isTrue(myBinaryTree.containsId(rightChild));
        assert.equal(myBinaryTree.mapIdToArray().length, treeLength - nodesDeleted, 'deleteNode at leaf not working')
        }
      }
    });

    it('deleteNode should replace the root, but keep the children', () => {
      let myBinaryTree = new BinaryTree(0);
      for (let i = 1; i < 10; i++) {
        myBinaryTree.addChild(i);
      }
      const treeLength = myBinaryTree.mapIdToArray().length;
      let nodesDeleted = 0;

      var rootId = myBinaryTree.__id;
      if (myBinaryTree.right) {
        nodesDeleted++;
        var rightChild = myBinaryTree.right.__id
        myBinaryTree.deleteNode(rootId);
        assert.isFalse(myBinaryTree.containsId(rootId));
        assert.isTrue(myBinaryTree.containsId(rightChild));
        assert.equal(myBinaryTree.mapIdToArray().length, treeLength - nodesDeleted, 'deleteNode at leaf not working')
      }
    });

  });



  describe('BinaryTree Helper Functions', () => {

    let myBinaryTree = new BinaryTree(0);
    for (let i = 1; i < 10; i++) {
      myBinaryTree.addChild(i);
    }

    it('mapToArray should return an array of the values', () => {
      const soln = [0,1,2,3,4,5,6,7,8,9];
      let test = myBinaryTree.mapToArray();
      test = test.sort((a, b) => a-b);
		  assert.deepEqual(soln, test);
    });    

    it('mapToArray should return a sorted array with a callback invoked on each item', () => {
      const soln = [0,2,4,6,8,10,12,14,16,18];
      let test = myBinaryTree.mapToArray((val) => val * 2);
      test = test.sort((a, b) => a-b);
      assert.deepEqual(soln, test);
    });  

    it('mapIdToArray should return a sorted array if ids', () => { // Test not done
      const test = myBinaryTree.mapIdToArray();
      assert.equal(myBinaryTree.countNodes(), test.length, 'mapIdToArray is not working');
    }); 

    it('filterToArray should return an array of items that pass callback predicate', () => {
      const soln = [0,2,4,6,8];
      let test = myBinaryTree.filterToArray((val) => val % 2 === 0);
      test = test.sort((a, b) => a-b);
      assert.deepEqual(soln, test);
    }); 

  });


  describe('BinaryTree Diagnostic Functions', () => {

    let myBinaryTree = new BinaryTree(0);
    for (let i = 1; i < 10; i++) {
      myBinaryTree.addChild(i);
    }

    xit('deepestGeneration should the length of the deepest path', () => { // Test not done
      const test = myBinaryTree.deepestGeneration();
      // assert.equal(test, typeof test === 'number', 'deepestGeneration is not working');
    });


  });

});
