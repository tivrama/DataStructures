(function() {

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
    // TODO: refactor to breadth first search and make cache for circular edges
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
    // TODO: refactor to breadth first search and make cache for circular edges
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
    // TODO: refactor to breadth first search and make cache for circular edges
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
    // TODO: refactor to breadth first search and make cache for circular edges
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
    this.edges.push(toNode);
    toNode.edges.push(this);
    return this.edges.length;
  }

  removeEdge(toNode) {
    if (this.edges.indexOf(toNode) !== -1) {
      this.edges.splice(this.edges.indexOf(toNode), 1)
        return this.edges.length;
    }
    return -1;
  }

  removeTwoWayEdges(toNode) {
    let indexInThis = this.edges.indexOf(toNode);
    if (indexInThis !== -1) {
      this.edges.splice(indexInThis, 1);
    }
    let indexInThat = toNode.edges.indexOf(this);
    if (indexInThat !== -1) {
      toNode.edges.splice(indexInThat, 1);
    }
    return this.edges.length;
  }

//-- HELPER -----------------------------
  mapValToArray(cb = null) {
    let results = [];
    let cache = {};
    const implementCB = (value) => {
      if (!cb) {
        return results.push(value);
      } else {
        return results.push(cb(value));
      }
    }

    cache[this.__id] = 1;
    implementCB(this.value);
    // TODO: add way to escape circular edges
    const sub = (edges) => {
      if (!edges.length) {
        return
      }
      for (let i = 0; i < edges.length; i++) {
        if (!cache[edges[i].__id]) {
          cache[edges[i].__id] = 1;
          implementCB(edges[i].value)
          if (edges[i].edges.length) {
            sub(edges[i].edges);
          }
        } else {
          cache[edges[i].__id] += 1;
        }
      }
    }
    sub(this.edges)
    return results;
  }

  mapIdToArray() {
    let results = [];
    let cache = {};

    cache[this.__id] = 1;
    results.push(this.__id);
    // TODO: add way to escape circular edges
    const sub = (edges) => {
      if (!edges.length) {
        return
      }
      for (let i = 0; i < edges.length; i++) {
        if (!cache[edges[i].__id]) {
          cache[edges[i].__id] = 1;
          results.push(edges[i].__id)
          if (edges[i].edges.length) {
            sub(edges[i].edges);
          }
        } else {
          cache[edges[i].__id] += 1;
        }
      }
    }
    sub(this.edges)
    return results;
  }

  filterToArray(cb) {
    let results = [];
    let cache = {};

    cache[this.__id] = 1;
    if (cb(this.value)) {
      results.push(this.value);
    }
    // TODO: add way to escape circular edges
    const sub = (edges) => {
      if (!edges.length) {
        return
      }
      for (let i = 0; i < edges.length; i++) {
        if (!cache[edges[i].__id]) {
          cache[edges[i].__id] = 1;
          if (cb(edges[i].value)) {
            results.push(edges[i].value);
          }
          if (edges[i].edges.length) {
            sub(edges[i].edges);
          }
        } else {
          cache[edges[i].__id] += 1;
        }
      }
    }
    sub(this.edges)
    return results;
  }

  countNodes() {
    let count = 0;
    let cache = {};

    cache[this.__id] = 1;
    count ++;
    // TODO: add way to escape circular edges && refactor recursion to while loop
    const sub = (edges) => {
      if (!edges.length) {
        return
      }
      for (let i = 0; i < edges.length; i++) {
        if (!cache[edges[i].__id]) {
          cache[edges[i].__id] = 1;
          count ++;
          if (edges[i].edges.length) {
            sub(edges[i].edges);
          }
        } else {
          cache[edges[i].__id] += 1;
        }
      }
    }
    sub(this.edges)
    return count;
  }

  closestDegreeOfSeperation(toNode) {
    let queue = [];
    let next = this.edges;
    let cache = {};
    let id = toNode.__id;
    let level = 1;

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (next[i].__id === id) return level;
        if (cache[next[i].__id]) continue checkCurr;
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }
    return -1;
  }

}

module.exports = Graph;
}.call(this));