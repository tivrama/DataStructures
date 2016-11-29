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

  describe('Graph Lookup', () => { 

    let Graph1 = new Graph(1);
    let Graph2 = new Graph(2, [Graph1]);
    let Graph3 = new Graph(3, [Graph2]);
    let Graph1Id = Graph1.__id;
    let Graph2Id = Graph2.__id;
    let Graph3Id = Graph3.__id;

    let container = [Graph1, Graph2, Graph3];

    it('connectedTo should return true if id exists anywhere in connected graph, otherwise false', () => {
    	assert.isTrue(Graph1.connectedTo(Graph1));
    	assert.isTrue(Graph2.connectedTo(Graph1));
      assert.isTrue(Graph3.connectedTo(Graph1));
      assert.isFalse(Graph1.connectedTo(Graph3));
      assert.isFalse(Graph3.connectedTo('fake_id'));
    });

    it('connectedToVal should return true if value exists anywhere in connected graph, otherwise false', () => {
      assert.isTrue(Graph1.connectedToVal(1));
      assert.isTrue(Graph2.connectedToVal(1));
      assert.isTrue(Graph3.connectedToVal(1));
      assert.isFalse(Graph1.connectedToVal(3));
      assert.isFalse(Graph3.connectedToVal('fake_value'));
    });

    it('getId should return the id of a value if it exists anywhere in connected graph', () => {
      assert.equal(Graph1.getId(1), Graph1Id, 'getId not working');
      assert.equal(Graph2.getId(1), Graph1Id, 'getId not working');
      assert.equal(Graph3.getId(1), Graph1Id, 'getId not working');
      assert.equal(Graph1.getId(3), null, 'getId not working');
      assert.equal(Graph3.getId('fake_value'), null, 'getId not working');
    });

    it('lookupId should return the value of an id if it exists anywhere in connected graph', () => {
      assert.equal(Graph1.lookupId(Graph1Id), 1, 'getId not working');
      assert.equal(Graph2.lookupId(Graph1Id), 1, 'lookupId not working');
      assert.equal(Graph3.lookupId(Graph1Id), 1, 'lookupId not working');
      assert.equal(Graph1.lookupId(Graph3Id), null, 'lookupId not working');
      assert.equal(Graph3.lookupId('fake_id'), null, 'lookupId not working');
    });

  }); 

  describe('Graph Update', () => { 

    let Graph1 = new Graph(1);
    let Graph2 = new Graph(2, [Graph1]);
    let Graph3 = new Graph(3, [Graph2]);
    let Graph1Id = Graph1.__id;
    let Graph2Id = Graph2.__id;
    let Graph3Id = Graph3.__id;

    let container = [Graph1, Graph2, Graph3];

    it('updateId should update the value of an id if it exists anywhere in connected graph', () => {
      assert.equal(Graph1.lookupId(Graph1Id), 1, 'updateId not working');
      Graph1.updateId(Graph1Id, 'one')
      assert.equal(Graph1.lookupId(Graph1Id), 'one', 'updateId not working');
      Graph2.updateId(Graph1Id, 'uno')
      assert.equal(Graph2.lookupId(Graph1Id), 'uno', 'updateId not working');
      Graph3.updateId(Graph1Id, 'ichi')
      assert.equal(Graph3.lookupId(Graph1Id), 'ichi', 'updateId not working');
      Graph1.updateId('fake_id', 'hello')
      assert.equal(Graph1.lookupId(Graph1Id), 'ichi', 'updateId not working');
    });

  });

});