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


	deleteNode(id) {
		// if (this.left === null && this.right === null) {
		// 	return this.value = null;
		// }
		let children = [];
		let root = this;

		const sub2 = (node) => {
				children.push({
					value: node.value,
					id: node.__id
				})
			if (node.left) {
				sub2(node.left)
			}
			if (node.right) {
				sub2(node.right)
			}
		}

		// TODO: rebuild to make balanced tree
		const sub3 = () => {
			for (let i = 0; i < children.length; i++) {
				root.addChild(children[i].value, children[i].id)
			}
			return;
		}

		const sub = (node, parent = null, side = null) => {
			if (node.__id === id) {
				if (parent === null) {
					if (!node.left && !node.right) {
						return node.value = null;
					}
					if (node.left) {
						sub2(node.left)
					}
					if (node.right) {
						sub2(node.right)
					}
					let newRoot = children.pop()
					node.value = newRoot.value
					node.__id = newRoot.__id
					sub3()
					return node;			
				}

				if (!node.left && !node.right) {
					return parent[side] = null
				}
				if (node.left) {
					sub2(node.left)
				}
				if (node.right) {
					sub2(node.right)
				}
				parent[side] = null
				sub3()
				return
			}
			if (node.__id < id)	{	
				sub(node.right, node, 'right')
			} else {
				sub(node.left, node, 'left')
			}
		}
		sub(this)
		return root;
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


// let myTree = new BinaryTree('Hello')
// myTree.addChild('world')
// myTree.addChild('Foo')
// myTree.addChild('bar')
// console.log('myTree: ', myTree.contains('bar'));

// let myBinaryTree = new BinaryTree('A');
// myBinaryTree.addChild('B')
// myBinaryTree.addChild('C')
// myBinaryTree.addChild('D')
// myBinaryTree.addChild('E')
// myBinaryTree.addChild('F')
// myBinaryTree.addChild('G')
// myBinaryTree.addChild('H')

// if (myBinaryTree.left) {
// 	const testId = myBinaryTree.left.__id;
// 	const testVal = myBinaryTree.left.value;
// 	console.log('testId: ', testId, 'testVal: ', testVal);
// 	console.log('lookupId: ', myBinaryTree.lookupId(testId));
// }
// console.log('myBinaryTree: ', myBinaryTree.right);
// if (myBinaryTree.right) {
// 	const testId2 = myBinaryTree.right.__id;
// 	const testVal2 = myBinaryTree.right.value;
// 	console.log('testId2: ', testId2, 'testVal2: ', testVal2);
// 	console.log('lookupId2: ', myBinaryTree.lookupId(testId2));
// }

module.exports = { BinaryTree };