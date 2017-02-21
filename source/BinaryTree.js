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
    if (val === undefined) return null;
    if (!id) {
      var id = this.makeId(false);
    }
    let queue = [this];
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
    if (val === undefined) return null;
    var queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (node.value === val) return true;
      if (node.left) queue.unshift(node.left);
      if (node.right) queue.unshift(node.right);
    }
    return false;
  }

  containsId(id) {
    if (!id) return null;
    var queue = [this];
    while (queue.length) {
      let node = queue.pop()
      if (node.__id === id) return true;
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
      if (node.value === val) return node.__id;
      if (node.left) queue.unshift(node.left);
      if (node.right) queue.unshift(node.right);
    }
    return null;
  }

  lookupId(id) {
    if (!id) return null;
    var queue = [this];
    while (queue.length) {
      let node = queue.pop()
      if (node.__id === id) return node.value;
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
    if (!id || val === undefined) return null;
    var queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (node.__id === id) return node.value = val;
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
  deleteNode(id) {
    if (!id) return null;

    let idValue;
    if (!this.left && !this.right) {
      if (this.__id !== id) {
        return null;
      }
      if (this.__id === id) {
        idValue = this.value
        this.value = null
        return idValue;
      }
    }

    let children = [];
    const saveChildren = (node) => {
      let cStack = [node];
      while (cStack.length) {
        let cNode = cStack.pop();
        children.push({
          value: cNode.value,
          __id: cNode.__id
        });
        if (cNode.left) cStack.push(cNode.left);
        if (cNode.right) cStack.push(cNode.right);
      }
    }

    const addChildren = (originalRoot) => {
      for (let i = 0; i < children.length; i++) {
        originalRoot.addChild(children[i].value, children[i].__id)
      }
    }

    // if found id is the root, then remove root.  
    if (this.__id === id) {
      idValue = this.value;
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

    let stack = [null, null, this];
    while (stack.length) {
      let node = stack.pop();
      let side = stack.pop();
      let currentParent = stack.pop();
      if (node.__id === id) {
        idValue = node.value;
        if (node.right) saveChildren(node.right);
        if (node.left) saveChildren(node.left);
        // delete the node
        if (currentParent[side]) {
          currentParent[side] = null;
        }
        if (children.length) {
          addChildren(this);
        }
        return idValue;        
      }
      node.__id < id ? side = 'right' : side = 'left';
      if (node[side]) {
        stack.push(node);
        stack.push(side);
        stack.push(node[side]);
      } else {
        return null;
      }
    }

  }


  removeDuplicates() {
    let cache = {};
    let returnInfo = {};
    let queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (!cache[node.value]) {
        cache[node.value] = node.__id;
      } else {
        returnInfo[node.__id] = node.value;
        this.deleteNode(node.__id);
      }
      if (node.left) queue.unshift(node.left);
      if (node.right) queue.unshift(node.right);
    }
    return returnInfo;
  }

//-- HELPER -----------------------------
  mapToArray(cb) {
    let resultArray = [];
    let queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (node.left) queue.unshift(node.left);
      if (cb) {
        resultArray.push(cb(node.value));
      } else {
        resultArray.push(node.value);
      }
      if (node.right) queue.unshift(node.right);
    }
    return resultArray;
  }

  mapIdToArray() {
    let resultArray = [];
    let queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (node.left) queue.unshift(node.left);
      resultArray.push(node.__id);
      if (node.right) queue.unshift(node.right);
    }
    return resultArray;
  }

  filterToArray(cb) {
    if (!cb) return null;
    let resultArray = [];
    let queue = [this];
    while (queue.length) {
      let node = queue.pop();
      if (node.left) queue.unshift(node.left);
      if (cb(node.value)) resultArray.push(node.value);
      if (node.right) queue.unshift(node.right);
    }
    return resultArray;
  }  

//-- DIGNOSTIC -----------------------------
  countNodes() {
    var count = 0;
    var stack = [this];
    while (stack.length) {
      let node = stack.pop();
      if (node.left) stack.push(node.left);
      count++
      if (node.right) stack.push(node.right)
    }
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