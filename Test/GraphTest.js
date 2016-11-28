'use strict';

const Graph = require('../Collections/Graph/Graph.js').Graph,
      assert = require('chai').assert;

describe('Graph', () => {

  describe('Graph Create', () => {  

    it('creating new graph should take a value', () => {
      const myGraph = new Graph(1);
      assert.equal(myGraph.value, 1, 'create new graph not working')
    });

  });

});