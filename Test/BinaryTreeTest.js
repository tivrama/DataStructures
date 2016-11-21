'use strict';

const BinaryTree = require('../Collections/BinaryTree/BinaryTree.js').BinaryTree,
      assert = require('chai').assert;

xdescribe('BinaryTree', () => {

  describe('BinaryTree Create', () => {  

    it('creating new BinaryTree should take a value', () => {
      const myBinaryTree = new BinaryTree(1);
      assert.equal(myBinaryTree.value, 1, 'creat new BinaryTree not working')
    });

  });

});