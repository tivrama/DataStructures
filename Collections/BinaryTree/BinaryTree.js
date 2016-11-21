'use strict';

class BinaryTree {

  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }

  addChild(val) {
  	let side ='';
  	this.value < val ? side = 'right' : side = 'left';

		if (!this[side]) {
			return this[side] = new BinaryTree(val);
		} else {
			return this[side].addChild(val)
		}
	}


	contains(val) {
		if (this.value === val) {
			return true;
		}
		let side ='';
  	this.value < val ? side = 'right' : side = 'left';
		if (!this[side]) {
			return false;
		} else {
			return this[side].contains(val);
		}
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

	deleteNode() {
		
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


};


module.exports = { BinaryTree };