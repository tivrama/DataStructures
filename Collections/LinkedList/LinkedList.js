'use strict';

class LinkedList {

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.allIds = [];
  }

  // Considder making this in a proto object (this.proto.makId)
  makeId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const makeString = () => {
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      if (this.allIds.indexOf(text) !== -1) {
        text = "";
        makeString();
      }
    }
    makeString();
    this.allIds.push(text);
    return text;
  }

  containsValue(val) { // Returns a boolean indicating whether the input value is present
    const sub = (node) => {
      if (node.value === val) {
        return true;
      }
      if (!node.next) {
        return false;
      }
      return sub(node.next)
    }
    return sub(this.head);
  }

  containsId(id) { // Returns a boolean indicating whether the input ID is present
    const sub = (node) => {
      if (node.__id === id) {
        return true;
      }
      if (!node.next) {
        return false;
      }
      return sub(node.next)
    }
    return sub(this.head);
  }


  indexOfValue(val) { // Returns the numerical order or "index" of the node with value. Returns -1 if not present
    let index = 0;
    const sub = (node) => {
      if (node.value === val) {
        return index;
      }
      if (!node.next) {
        return -1;
      }
      index +=1;
      return sub(node.next)
    }
    return sub(this.head);
  }

  indexOfId(id) { // Returns the numerical order or "index" of the node with ID. Returns -1 if not present
    let index = 0;
    const sub = (node) => {
      if (node.__id === id) {
        return index;
      }
      if (!node.next) {
        return -1;
      }
      index +=1;
      return sub(node.next)
    }
    return sub(this.head);
  }


  addToHead(val) { // Adds a node to head
    const makeNode = {
      value: val,
      __id: this.makeId(),
      next: this.head
    }
    if (!this.head) {
      this.tail = makeNode;
      this.head = makeNode;
      this.length = 1;
    } else {
      let oldHead = this.head;
      makeNode.next = oldHead;
      this.head = makeNode;
      this.length +=1;
    }
  }


  addToTail(val) { // Adds a node to tail
    const makeNode = {
      value: val,
      __id: this.makeId(),
      next: null
    }
    if (!this.tail) {
      this.tail = makeNode;
      this.head = makeNode;
      this.length = 1;
    } else {
      this.tail.next = makeNode;
      this.tail = makeNode;
      this.length +=1;
    }
  }


  insertAfterValue(lookupVal, val) { 
    // Given a lookupVal and value, it acts similar to addToTail, except it creates a node after the input node
    const makeNode = {
      value: val,
      __id: this.makeId(),
      next: null
    }
    const sub = (currentNode) => {
      if (currentNode.value === lookupVal) {
        //insert node;
      let breakList = currentNode.next;
      makeNode.next = breakList;
      currentNode.next = makeNode;
      this.length +=1;
      return;
      }
      if (!currentNode.next) {
        console.log('lookupVal not found: ', lookupVal);
        return 'lookupVal not found';
      }
      sub(currentNode.next)
    }
    sub(this.head);
  }

  insertAfterId(id, val) { 
    // Given an ID and value, it acts similar to addToTail, except it creates a node after the input node
    const makeNode = {
      value: val,
      __id: this.makeId(),
      next: null
    }
    const sub = (currentNode) => {
      if (currentNode.__id === id) {
        //insert node;
      let breakList = currentNode.next;
      makeNode.next = breakList;
      currentNode.next = makeNode;
      this.length +=1;
      return;
      }
      if (!currentNode.next) {
        console.log('id not found: ', id);
        return 'id not found';
      }
      sub(currentNode.next)
    }
    sub(this.head);
  }


  deleteHead() {
    if (!this.head) {
      return
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return
    }
    let breakList = this.head.next;
    this.head = breakList
    this.length -=1;
    return
  }

  deleteTail() {
    if (!this.tail) {
      return
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return
    }
    //recurse checking next.next
    const sub = (node) => {
      if (!node.next.next) {
        node.next = null;
        this.tail = node;
        return
      }
      sub(node.next)
    }
    sub(this.head)
    this.length -=1;
    return
  }

  deleteNodeValue(val) {
    const sub = (node) => {
      // if node is head
      if (node.value === val && node === this.head) {
        this.deleteHead();
        return
      }
      // node not found
      if (!node.next) {
        console.log('node not found: ', val);
        return 'node not found';         
      }
      // if node is not head
      if (node.next.value === val) {
        // if node is tail
        if (!node.next.next) {
          this.deleteTail();
          return 
        }    
        let breakList = node.next.next;
        node.next = breakList
        this.length -=1;
        return        
      }
      sub(node.next)
    }
    sub(this.head);
  }

  deleteNodeId(id) {
    const sub = (node) => {
      // if node is head
      if (node.__id === id && node === this.head) {
        this.deleteHead();
        return
      }
      // node not found
      if (!node.next) {
        console.log('node not found: ', id);
        return 'node not found';         
      }
      // if node is not head
      if (node.next.__id === id) {
        // if node is tail
        if (!node.next.next) {
          this.deleteTail();
          return 
        }    
        let breakList = node.next.next;
        node.next = breakList
        this.length -=1;
        return        
      }
      sub(node.next)
    }
    sub(this.head);
  }

  onEach(cb) {
    if (!this.head) {
      return
    }
    const sub = (node) => {
      node.value = cb(node.value);
      if (!node.next) {
        return
      }
      sub(node.next);
    }
    sub(this.head);
  }

  mapToArray(cb) {
    if (!this.head) {
      return [];
    }
    let resultsArray = [];
    const sub = (node) => {
      if (cb) {
        resultsArray.push(cb(node.value));
      } else {
        resultsArray.push(node.value);
      }
      if (!node.next) {
        return [];
      }
      sub(node.next);
    }
    sub(this.head);
    return resultsArray;
  }

  filterToArray(cb) {
    if (!this.head) {
      return [];
    }
    let resultsArray = [];
    const sub = (node) => {
      if (cb(node.value)) {
        resultsArray.push(node.value);
      }
      if (!node.next) {
        return [];
      }
      sub(node.next)
    }
    sub(this.head);
    return resultsArray;
  }
 


  reverseList() {
    if (!this.head || !this.head.next) {
      return
    }

    let temp = [];
    const sub = (node) => {
      if (node) {
        temp.push({value: node.value, __id: node.__id})
        sub(node.next)
      }
      return
    }
    sub(this.head)

    this.head = null;
    this.tail = null;

    const sub2 = (node) => {
      const makeNode = {
        value: node.value,
        __id: node.__id,
        next: this.head
      }
      if (!this.head) {
        this.tail = makeNode;
        this.head = makeNode;
        this.length = 1;
      } else {
        let oldHead = this.head;
        makeNode.next = oldHead;
        this.head = makeNode;
        this.length +=1;
      }
      if (temp.length) {
        sub2(temp.shift())
      } else {
        return
      }
    }
    sub2(temp.shift())
  }

  // Considder making this in a proto object (this.proto.makId)
  hasCycle() {
    let counter = 0;
    let lastId;
    let testHead = this.head;
    const sub = (node) => {
      if (node.counter) {
        testHead = {};
        console.log('Node with circular ref at index: ', counter, ' Between ID ', lastId, ' and ID ', node.__id);
        return true;
      }
      if (!node.counter || node.counter !== 0) {
        if (!node.next) {
          testHead = {};
          return false;
        }
        node.counter = counter;
        counter +=1;
        lastId = node.__id
        return sub(node.next);
      }
    }
    return sub(testHead);
  }


  updateValueAtId(id, val) { // Updated value at node with selected ID
    const sub = (node) => {
      if (node.__id === id) {
        node.value = val;
        return node.value;
      }
      if (!node.next) {
        console.log('ID not found: ', id);
        return -1;
      }
      return sub(node.next)
    }
    return sub(this.head);
  }

  readValueAtId(id) { // Updated value at node with selected ID
    const sub = (node) => {
      if (node.__id === id) {
        console.log('Value: ', node.value);
        return node.value;
      }
      if (!node.next) {
        console.log('ID not found: ', id);
        return -1;
      }
      return sub(node.next)
    }
    return sub(this.head);
  }

}



module.exports = { LinkedList };