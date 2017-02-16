(function() {

class BinaryTree {

  constructor(val, id = this.makeId()) {
    this.__id = id;
    this.value = val
    this.left = null;
    this.right = null;
  }

  makeId(root = true) {
    let text = '';
    // string is 20 chars long.  Can change if desired
    let length = 20;
    if (!root) {
      let possible = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const makeString = () => {
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      }
      makeString();
    } else {
      for (let i = 0; i < length; i++) {
        text += 'V';
      }
    }
    return text;
  }

//-- CREATE -----------------------------
  addChild(val, id = null) {
    if (!id) {
      var id = this.makeId(false);
    }
    var queue = [this];
    while (queue.length) {
      let node = queue.pop()
      let side = '';
      node.__id < id ? side = 'right' : side = 'left';
      if (!node[side]) {
        return node[side] = new BinaryTree(val, id);
      } else {
        queue.unshift(node[side]);
      }
    }
  }

//-- LOOKUP -----------------------------
  containsVal(val) {
    var queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (node.value === val) {
        return true;
      }
      if (node.left) {
        queue.unshift(node.left);
      }
      if (node.right) {
        queue.unshift(node.right);
      }
    }
    return false;
  }

  containsId(id) {
    var queue = [this];
    while (queue.length) {
      let node = queue.pop()
      if (node.__id === id) {
        return true;
      }
      let side = '';
      node.__id < id ? side = 'right' : side = 'left';
      if (!node[side]) {
        return false;
      } else {
        queue.unshift(node[side]);
      }
    }
  }

  getId(val) {
    var queue = [this];
    while (queue.length) {
      let node = queue.pop()
      if (node.value === val) {
        return node.__id;
      }
      if (node.left) {
        queue.unshift(node.left);
      }
      if (node.right) {
        queue.unshift(node.right);
      }
    }
    return null;
  }

  lookupId(id) {
    var queue = [this];
    while (queue.length) {
      let node = queue.pop()
      if (node.__id === id) {
        return node.value;
      }
      let side = '';
      node.__id < id ? side = 'right' : side = 'left';
      if (!node[side]) {
        return null;
      } else {
        queue.unshift(node[side]);
      }
    }
  }

//-- UPDATE -----------------------------
  updateId(id, val) {
    var queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (node.__id === id) {
        return node.value = val;
      }
      let side ='';
      node.__id < id ? side = 'right' : side = 'left';
      if (node[side]) {
        queue.unshift(node[side]);
      } else {
        return null;
      }
    }
  }

//-- DELETE -----------------------------
  deleteNode(id, parent = null, side = null, root = null) {
    let idValue;
    if (!id) null;

    if (!this.left && !this.right && parent === null) {
      if (this.__id !== id) {
        return null;
      }
      if (this.__id === id) {
        idValue = this.value
        this.value = null
        return idValue;
      }
    }

    if (!root) root = this;
    let children = [];
    const saveChildren = (node) => {
      children.push({
        value: node.value,
        __id: node.__id
      });
      if (node.left) saveChildren(node.left)
      if (node.right) saveChildren(node.right)
    }
    const addChildren = (originalRoot) => {
      for (let i =0; i < children.length; i++) {
        originalRoot.addChild(children[i].value, children[i].__id)
      }
    }

    if (this.__id === id) {
        idValue = this.value;
      if (!parent) {
        if (this.right) saveChildren(this.right);
        let newParent = children.shift();  // Optional: reset id for root value 'VVVV...'
        if (this.left) saveChildren(this.left);
        this.value = newParent.value;
        this.__id = newParent.__id;
        this.left = null;
        this.right = null;
        addChildren(this)
        return idValue;
      }
      if(!this.left && !this.right && parent) {
        parent[side] = null;
        return idValue;
      }
      if (this.right) saveChildren(this.right)
      if (this.left) saveChildren(this.left)
      if (parent[side]) {
        parent[side] = null;
        addChildren(root);
        return idValue;
      }
    }

    if (this.left) this.left.deleteNode(id, this, 'left', root)
    if (this.right) this.right.deleteNode(id, this, 'right', root)
    return idValue;
  }

  removeDuplicates() {
    let cache = {};
    let returnInfo = {};
    const findAndRemoveDuplicates = (node, root = null) => {
      if (!root) root = node;
      if (!cache[node.value]) {
        cache[node.value] = node.__id;
      } else {
        returnInfo[node.__id] = node.value
        root.deleteNode(node.__id)
      }
      if (!node.left && !node.right) return
      if (node.left) findAndRemoveDuplicates(node.left, root)
      if (node.right) findAndRemoveDuplicates(node.right, root)
    }
    findAndRemoveDuplicates(this)
    return returnInfo;
  }

//-- HELPER -----------------------------
  mapToArray(cb) {
    var resultArray = [];
    const sub = (node) => {
      if (node.left) { sub(node.left) }
      if (cb) {
        resultArray.push(cb(node.value));
      } else {
        resultArray.push(node.value);
      }
      if (node.right) { sub(node.right) }
    }
    sub(this);
    return resultArray;
  }

  mapIdToArray() {
    var resultArray = [];
    const sub = (node) => {
      if (node.left) { sub(node.left) }
      resultArray.push(node.__id);
      if (node.right) { sub(node.right) }
    }
    sub(this);
    return resultArray;
  }

  filterToArray(cb) {
    var resultArray = [];
    const sub = (node) => {
      if (node.left) { sub(node.left) }
      if (cb(node.value)) {
        resultArray.push(node.value);
      }
      if (node.right) { sub(node.right) }
    }
    sub(this);
    return resultArray;
  }

//-- DIGNOSTIC -----------------------------
  countNodes() {
    var count = 0;
    const sub = (node) => {
      if (node.left) { sub(node.left) }
      count++;
      if (node.right) { sub(node.right) }
    }
    sub(this);
    return count;		
  }

  deepestGeneration() {
    let generation = 1;
    const sub = (node, gen = 1) => {
      if (node.left) { sub(node.left, gen + 1) }
      if (gen > generation) {
        generation = gen;
      }
      if (node.right) { sub(node.right, gen + 1) }
    }
    sub(this);
    return generation;
  }

}

module.exports = BinaryTree;
}.call(this));