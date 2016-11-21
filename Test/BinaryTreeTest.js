'use strict';

const BinaryTree = require('../Collections/BinaryTree/BinaryTree.js').BinaryTree,
      assert = require('chai').assert;

describe('BinaryTree', () => {

  describe('BinaryTree Create', () => {  

    it('creating new BinaryTree should take a value', () => {
      const myBinaryTree = new BinaryTree(1);
      assert.equal(myBinaryTree.value, 1, 'creat new BinaryTree not working')
    });

    let myBinaryTree = new BinaryTree(10);
    myBinaryTree.addChild(5)
    myBinaryTree.addChild(2)
    myBinaryTree.addChild(7)
    myBinaryTree.addChild(15)
    myBinaryTree.addChild(17)
    myBinaryTree.addChild(12)
    myBinaryTree.addChild(11)

    it('addChild should add grandchildren', () => {
      assert.equal(myBinaryTree.right.left.left.value, 11, 'creat new BinaryTree not working')
    });


    it('contains should return true if value exists and false if not', () => {
      assert.isTrue(myBinaryTree.contains(11));
      assert.isFalse(myBinaryTree.contains(13));
    });

  });

});