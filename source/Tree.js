(function() {

class Tree {

  constructor(val) {
    this.value = val;
    this.children = [];
  }

//-- CREATE --------------------------------
  addChild(val) {
    this.children.push(new Tree(val))
    return this.children[this.children.length-1];
  }

//-- LOOKUP --------------------------------
  contains(val) {
    if (this.value === val) {
      return true
    }
    if (this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i].contains(val)) {
          return true;
        }
      }
    }
    return false
  }

  countLeaves() {
    let counter = 0;
    const sub = (node) => {
      if (node.children.length === 0) {
        return counter += 1;
      }
      for (var i = 0; i < node.children.length; i++) {
        sub(node.children[i]);
      }
    }
    sub(this);
    return counter;
  }

  countNodes() {
    let counter = 0;
    const sub = (node) => {
      counter += 1;
      if (node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          sub(node.children[i]);
        }
      }
    }
    sub(this);
    return counter;
  }

//-- UPDATE --------------------------------
  updateValue(val, newValue) {
    if(this.value === val) {
      this.value = newValue;
    }
    if (this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].updateValue(val, newValue);
      }
    }
  }

//-- DELETE --------------------------------
  deleteNode(val, parent = null, index = 0) {
    if (this.value === val && parent === null) {
      return;
    }
    if (this.value === val && this.children.length === 0) {
      return parent.children.splice(index, 1);
    }
    if (this.value === val && this.children.length !== 0) {
      for (var j = 0; j < this.children.length; j++) {
        parent.children.push(this.children[j]);
      }
      return parent.children.splice(index, 1); 
    }
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].deleteNode(val, this, i);
    }  
  }

  deleteLeaf(val, parent = null, index = 0) {
    if (this.value === val && this.children.length === 0 && parent === null) {
      return;
    }
    if (this.value === val && this.children.length === 0) {
      return parent.children.splice(index, 1);
    }
    if (this.value !== val && this.children.length === 0) {
      return;
    }
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].deleteLeaf(val, this, i);
    }
  }

  deleteBranchWithChildren(val, parent = null, index = 0) {
    if (this.value === val && this.children.length === 0 && parent === null) {
      return;
    }
    if (this.value === val) {
      return parent.children.splice(index, 1);
    }
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].deleteBranchWithChildren(val, this, i);
    }
  }

  removeDuplicates() {
    let cache = {}
    const sub = (node, parent = null, index = 0) => {
      if (cache[node.value] && node.children.length === 0 && parent === null) {
        return;
      }
      if (cache[node.value] && node.children.length === 0) {
        return parent.children.splice(index, 1);
      }
      if (cache[node.value] && node.children.length !== 0) {
        for (var j = 0; j < node.children.length; j++) {
          parent.children.push(node.children[j]);
        }
        return parent.children.splice(index, 1); 
      }
      cache[node.value] = node.value;
      for (var i = 0; i < node.children.length; i++) {
        sub(node.children[i], node, i);
      }
    }
    return sub(this);
  }

//-- HELPER --------------------------------
  onEach(cb) {
    this.value = cb(this.value);
    if (this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].onEach(cb);
      }
    }
  }

  mapToArray(cb) {
    let resultArray = [];
    const sub = (node) => {
      if (cb) {
        resultArray.push(cb(node.value));
      } else {
        resultArray.push(node.value);
      }
      if (node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          sub(node.children[i]);
        }
      }
    }
    sub(this);
    return resultArray;
  }

  filterToArray(cb) {
    if (!cb) {
      return;
    }
    let resultArray = [];
    const sub = (node) => {
      if (cb(node.value)) {
        resultArray.push(node.value);
      }
      if (node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          sub(node.children[i]);
        }
      }
    }
    sub(this);
    return resultArray;
  }

}

module.exports = Tree;
}.call(this));