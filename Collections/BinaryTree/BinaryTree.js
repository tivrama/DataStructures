'use strict';

class BinaryTree {

  constructor(val, id = this.makeId()) {
    this.__id = id;
    this.value = val
    this.left = null;
    this.right = null;
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

  addChild(val, id = null) {
  	if (!id) {
  		var id = this.makeId();
  	}
  	let side ='';
  	this.__id < id ? side = 'right' : side = 'left';
		if (!this[side]) {
			return this[side] = new BinaryTree(val, id);
		} else {
			return this[side].addChild(val, id)
		}
	}

	
	containsVal(val) {
		if (this.value === val) {
			return true;
		}
		if (this.left) {
			if (this.left.containsVal(val)) {
				return true
			}
		}
		if (this.right) {
			if (this.right.containsVal(val)) {
				return true
			}
		}
		return false
	}

	containsId(id) {
		if (this.__id === id) {
			return true;
		}
		let side ='';
  	this.__id < id ? side = 'right' : side = 'left';
		if (this[side]) {
			return this[side].containsId(id);
		} else {
			return false;
		}
	}

	getId(val) {
		if (this.value === val) {
			return this.__id;
		}
		if (this.left) {
			if (this.left.containsVal(val)) {
				return this.left.getId(val)
			}
		}
		if (this.right) {
			if (this.right.containsVal(val)) {
				return this.right.getId(val)
			}
		}
		return null		
	}

	lookupId(id) {
		if (this.__id === id) {
			return this.value;
		}
		let side ='';
  	this.__id < id ? side = 'right' : side = 'left';

		if (this[side]) {
			return this[side].lookupId(id);
		} else {
			return null;
		}
	}

	updateId(id, val) {
		if (this.__id === id) {
			return this.value = val;
		}
		let side ='';
  	this.__id < id ? side = 'right' : side = 'left';

		if (this[side]) {
			return this[side].lookupId(id);
		} else {
			return null;
		}
	}


	deleteNode(id, parent = null, side = null, root = null) {
		if (!id) null;

		if (!this.left && !this.right && parent === null) {
			if (this.__id !== id) {
				return null;
			}
			if (this.__id === id) {
				this.value = null
				return this;
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
			if (!parent) {
				if (this.right) saveChildren(this.right);
				let newParent = children.shift();
				if (this.left) saveChildren(this.left);
				this.value = newParent.value;
				this.__id = newParent.__id;
				this.left = null;
				this.right = null;
				addChildren(this)
				return this;
			}
			if(!this.left && !this.right && parent) {
				return parent[side] = null;
			}
			if (this.right) saveChildren(this.right)
			if (this.left) saveChildren(this.left)
			if (parent[side])	{
				parent[side] = null;
				addChildren(root);
				return root;
			}
		}

		if (this.left) {
			this.left.deleteNode(id, this, 'left', root)
		}
		if (this.right) {
			this.right.deleteNode(id, this, 'right', root)
		}
	}


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
		// Returns int denoting the deepest generation of the binary tree

	}

	distributeNodes() {
		// Re sorts binary tree so that the deepest generation is no more than 1 generation deeper than the shortest generation.
	}

};


module.exports = { BinaryTree };