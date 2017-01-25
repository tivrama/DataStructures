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
  connectedTo(toNode) {
    let queue = [];
    let next = this.edges;
    let cache = {};
    let id = toNode.__id;
    let level = 1;
    if (this.__id === id) return true;
    cache[this.__id] = true;

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (next[i].__id === id) return true;
        if (cache[next[i].__id]) continue checkCurr;
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }
    return false;
  }

  connectedToVal(val) {
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;
    if (this.value === val) return true;
    cache[this.__id] = true;

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (next[i].value === val) return true;
        if (cache[next[i].__id]) continue checkCurr;
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }
    return false;
  }

  getId(val) {
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;
    if (this.value === val) return this.__id;
    cache[this.__id] = true;

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (next[i].value === val) return next[i].__id;
        if (cache[next[i].__id]) continue checkCurr;
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }
    return null;  
  }

  lookupId(id) {
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;
    if (this.__id === id) return this.value;
    cache[this.__id] = true;

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (next[i].__id === id) return next[i].value;
        if (cache[next[i].__id]) continue checkCurr;
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
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
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;
    if (this.__id === id) return this.value = val;
    cache[this.__id] = 1;

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (next[i].__id === id) return next[i].value = val;
        if (cache[next[i].__id]) continue checkCurr;
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
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
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;

    cache[this.__id] = 1;
    cb ? results.push(cb(this.value)) : results.push(this.value);

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (cache[next[i].__id]) continue checkCurr;
        cb ? results.push(cb(next[i].value)) : results.push(next[i].value);
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }    
    return results;
  }

  mapIdToArray() {
    let results = [];
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;

    cache[this.__id] = true;
    results.push(this.__id);

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (cache[next[i].__id]) continue checkCurr;
        results.push(next[i].__id);
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }   
    return results;
  }

  filterToArray(cb) {
    let results = [];
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;

    cache[this.__id] = true;
    if (cb(this.value)) {
      results.push(this.value);
    }

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (cache[next[i].__id]) continue checkCurr;
        if (cb(next[i].value)) {
          results.push(next[i].value);
        }
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }  
    return results;
  }

  countNodes() {
    let count = 1;
    let queue = [];
    let next = this.edges;
    let cache = {};
    let level = 1;

    cache[this.__id] = true;

    while (next.length) {
      checkCurr: for (var i = 0; i < next.length; i++) {
        if (cache[next[i].__id]) continue checkCurr;
        count++;
        cache[next[i].__id] = level;
        queue.push(next[i].edges)
      }
      level++;
      next = queue.shift();
    }    
    return count;
  }

  degreeOfSeparation(toNode) {
    let queue = [];
    let next = this.edges;
    let cache = {};
    let id = toNode.__id;
    let level = 1;

    if (this.__id === id) return 0;

    cache[this.__id] = 0;

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