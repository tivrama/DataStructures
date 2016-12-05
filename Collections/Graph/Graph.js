'use strict';

class Graph {

  constructor(val, edges = [], id = this.makeId()) {
    this.value = val;
    this.edges = edges;
    this.__id = id
  }

  makeId() {
    let text = '';
    let possible = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const makeString = () => {
      // string is 20 chars long.  Can change if desired
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    }
    makeString();
    return text;
  }

//-- LOOKUP -----------------------------
	connectedTo(node) {
		if (this.__id === node.__id) {
			return true
		}
		for (let i = 0; i < this.edges.length; i++) {
			if (this.edges[i].__id === node.__id) {
				return true
			}
			if (this.edges[i].connectedTo(node)) {
				return true
			}
		}
		return false
	}

	connectedToVal(val) {
		if (this.value === val) {
			return true;
		}
		for (let i = 0; i < this.edges.length; i++) {
			if (this.edges[i].value === val) {
				return true
			}
			if (this.edges[i].connectedToVal(val)) {
				return true;
			}
		}
		return false
	}

	getId(val) {
		if (this.value === val) {
			return this.__id;
		}
		for (let i = 0; i < this.edges.length; i++) {
			if (this.edges[i].value === val) {
				return this.edges[i].__id;
			}
			if (this.edges[i].connectedToVal(val)) {
				return this.edges[i].getId(val);
			}
		}
		return null;		
	}

	lookupId(id) {
		if (this.__id === id) {
			return this.value;
		}
		for (let i = 0; i < this.edges.length; i++) {
			if (this.edges[i].__id === id) {
				return this.edges[i].value;
			}
			if (this.edges[i].lookupId(id)) {
				return this.edges[i].lookupId(id);
			}
		}
		return null;	
	}

	hasEdge(toNode) {
		if (this.edges.indexOf(toNode) !== -1) {
			return true;
		}
		return false;
  }

	hasTwoWayEdges(toNode) {
		if (!this.edges || !toNode.edges) {
			return null;
		}
		let to;
		let from;

		this.edges.indexOf(toNode) !== -1 ? to = true : to = false;
		toNode.edges.indexOf(this) !== -1 ? from = true : from = false;
		if (to && from) {
			return true;
		}
		return false;
	}


//-- UPDATE -----------------------------
	updateId(id, val) {
		if (this.__id === id) {
			return this.value = val;
		}
		for (let i = 0; i < this.edges.length; i++) {
			if (this.edges[i].__id === id) {
				return this.edges[i].value = val;
			}
			if (this.edges[i].lookupId(id)) {
				return this.edges[i].updateId(id, val);
			}
		}
		return null;	
	}

	addEdge(toNode) {
  	this.edges.push(toNode);
  	return this.edges.length;
	}

	addTwoWayEdges(toNode) {
		
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
