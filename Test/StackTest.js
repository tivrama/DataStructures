'use strict';

const Stack = require('../Collections/Stack/Stack.js').Stack,
      assert = require('chai').assert;

xdescribe('Stack', () => {

  describe('Stack Create', () => {  

    it('creating new stack should take a value', () => {
      const myStack = new Stack(1);
      assert.equal(myStack.value, 1, 'create new Stack not working')
    });

  });

});