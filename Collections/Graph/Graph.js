'use strict';

class Graph {

  constructor(val, edges = [], id = this.makeId()) {
    this.value = val;
    this.edges = edges;
    this.__id = id
  }

  makeId() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const makeString = () => {
      // string is 20 chars long.  Can change if desired
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    }
    makeString();
    return text;
  }


	containsVal(val) {

	}

	containsId(id) {

	}

	getId(val) {
	
	}

	lookupId(id) {

	}


	hasEdge(fromNode, toNode) {
  
	}


	addEdge(fromNode, toNode) {

  }

	removeEdge(fromNode, toNode) {

	}

	mapToArray(cb) {

	}

	mapIdToArray() {

	}

	filterToArray(cb) {

	}

	countNodes() {

	}

};

module.exports = { Graph };
