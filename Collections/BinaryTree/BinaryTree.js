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

};


module.exports = { BinaryTree };