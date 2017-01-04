'use strict';
const Graph = require('../source/Graph.js').Graph,
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

    it('hasEdge should return true an edge exists', () => {
      assert.isTrue(Graph2.hasEdge(Graph1));
      assert.isTrue(Graph3.hasEdge(Graph2));
      assert.isFalse(Graph3.hasEdge(Graph1));
      assert.isFalse(Graph3.hasEdge('fake_graph'));
    });

    it('hasTwoWayEdges should return true an edge both ways between two nodes', () => {
      assert.isFalse(Graph2.hasTwoWayEdges(Graph1));
      assert.isFalse(Graph3.hasTwoWayEdges(Graph2));
      assert.isFalse(Graph3.hasTwoWayEdges(Graph1));
      assert.isNull(Graph3.hasTwoWayEdges('fake_graph'));
      Graph1.addEdge(Graph2);
      assert.isTrue(Graph2.hasTwoWayEdges(Graph1));
    });

  }); 

  describe('Graph Update', () => { 

    let Graph1 = new Graph(1);
    let Graph2 = new Graph(2, [Graph1]);
    let Graph3 = new Graph(3, [Graph2]);
    let Graph1Id = Graph1.__id;
    let Graph2Id = Graph2.__id;
    let Graph3Id = Graph3.__id;

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

    it('removeEdge should remove the parameter graph from this graph, if there was no edge, return -1', () => {
      assert.equal(Graph1.removeEdge(Graph2), -1, 'removeEdge when this has no edges not working')
      assert.equal(Graph3.removeEdge(Graph2), 0, 'removeEdge not working')
    });

  });

  describe('Helper Functions', () => {

    let Graph1 = new Graph(1);
    let Graph2 = new Graph(2, [Graph1]);
    let Graph3 = new Graph(3, [Graph2]);
   
    let resultsArray1 = Graph3.mapValToArray();
    let resultsArray2 = Graph3.mapValToArray((val) => {return val * 2})
    it('mapValToArray should return an array of values from connected nodes - with or without a cb', () => {
      assert.deepEqual(resultsArray1, [3, 2, 1], 'mapValToArray not working without callback')
      assert.deepEqual(resultsArray2, [6, 4, 2], 'mapValToArray not working with callback')
    });

    let ids = [Graph3.__id, Graph2.__id, Graph1.__id];
    let resultsArray = Graph3.mapIdToArray();
    it('mapIdToArray should return an array of ids from connected nodes', () => {
      assert.deepEqual(resultsArray, ids, 'mapIdToArray not working')
    });

    it('filterToArray should return an array of values from connected nodes that pass the cb predicate', () => {
      assert.deepEqual(Graph3.filterToArray((val) => { return val % 2 !== 0 }), [3,1], 'filterToArray not working')
      assert.deepEqual(Graph3.filterToArray((val) => { return val % 2 === 0 }), [2], 'filterToArray not working')
    });
    
    it('countNodes should return the number of nodes connected by edges', () => {
      assert.equal(Graph3.countNodes(), 3, 'countNodes not working')
    });

    it('degreesOfSeperation should return a sorted array with all the degrees of seperation', () => {
      assert.deepEqual(Graph3.degreesOfSeperation(Graph1), [2], 'degreesOfSeperation not working')
      Graph3.addEdge(Graph1);
      assert.deepEqual(Graph3.degreesOfSeperation(Graph1), [1,2], 'degreesOfSeperation not working')
      assert.equal(Graph1.degreesOfSeperation(Graph3), -1, 'degreesOfSeperation not working')
    });

  });

});