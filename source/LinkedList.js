(function() {

  'use strict';

  class LinkedList {

    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.allIds = [];
    }

    makeId() {
      let text = "";
      let possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const makeString = () => {
        // string is 20 chars long.  Can change if desired
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

  //-- CREATE --------------------------------
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
      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.value === lookupVal) {
          //insert node;
          let breakList = currentNode.next;
          makeNode.next = breakList;
          currentNode.next = makeNode;
          this.length +=1;
          return this.length;
        }
        if (!currentNode.next) {
          return null;
        }
        currentNode = currentNode.next;
      }
    }

    insertAfterId(id, val) { 
      // Given an ID and value, it acts similar to addToTail, except it creates a node after the input node
      const makeNode = {
        value: val,
        __id: this.makeId(),
        next: null
      }
      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.__id === id) {
          //insert node;
          let breakList = currentNode.next;
          makeNode.next = breakList;
          currentNode.next = makeNode;
          this.length +=1;
          return this.length;
        }
        if (!currentNode.next) {
          return null;
        }
        currentNode = currentNode.next;
      }
    }

  //-- LOOKUP --------------------------------
    readValueAtId(id) { // Updated value at node with selected ID
      let node = this.head;
      while (node) {
        if (node.__id === id) return node.value;
        if (!node.next) return -1;
        node = node.next;
      }
    }

    containsValue(val) { // Returns a boolean indicating whether the input value is present
      let node = this.head;
      while (node) {
        if (node.value === val) return true;
        if (!node.next) return false;
        node = node.next;
      }
    }

    containsId(id) { // Returns a boolean indicating whether the input ID is present
      let node = this.head;
      while (node) {
        if (node.__id === id) return true;
        if (!node.next) return false;
        node = node.next;
      }
    }

    indexOfValue(val) { // Returns the numerical order or "index" of the node with value. Returns -1 if not present
      let index = 0;
      let node = this.head;
      while (node) {
        if (node.value === val) return index;
        if (!node.next) return -1;
        index++;
        node = node.next;
      }
    }

    indexOfId(id) { // Returns the numerical order or "index" of the node with ID. Returns -1 if not present
      let index = 0;
      let node = this.head;
      while (node) {
        if (node.__id === id) return index;
        if (!node.next) return -1;
        index++;
        node = node.next;
      }
    }

  //-- UPDATE --------------------------------
    updateValueAtId(id, val) { // Updated value at node with selected ID
      let node = this.head;
      while (node) {
        if (node.__id === id) {
          node.value = val;
          return node.value;
        }
        if (!node.next) return -1;
        node = node.next;
      }
    }

  //-- DELETE --------------------------------
    deleteHead() {
      if (!this.head) return
      if (!this.head.next) {
        this.head = null;
        this.tail = null;
        return this.length = 0;
      }
      let breakList = this.head.next;
      this.head = breakList
      return this.length--;
    }

    deleteTail() {
      if (!this.tail) {
        return
      }
      if (!this.head.next) {
        this.head = null;
        this.tail = null;
        return this.length = 0;
      }
      let node = this.head;
      while (node) {
        if (!node.next.next) {
          node.next = null;
          this.tail = node;
          return this.length--;
        }
        node = node.next;
      }
    }

    deleteNodeValue(val) {
      let node = this.head;
      while (node) {
        // if node is head
        if (node.value === val && node === this.head) {
          return this.deleteHead();
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
            return this.deleteTail();
          }    
          let breakList = node.next.next;
          node.next = breakList
          this.length -=1;
          return this.length;      
        }
        node = node.next;
      }
    }

    deleteNodeId(id) {
      let node = this.head;
      while (node) {
        // if node is head
        if (node.__id === id && node === this.head) {
          return this.deleteHead();
        }
        // node not found
        if (!node.next) return -1;         
        // if node is not head
        if (node.next.__id === id) {
          // if node is tail
          if (!node.next.next) {
            return this.deleteTail();
          }    
          let breakList = node.next.next;
          node.next = breakList
          this.length -=1;
          return this.length;      
        }
        node = node.next;
      }
    }

  //-- HELPER --------------------------------
    onEach(cb) {
      if (!this.head) return
      let node = this.head;
      while (node) {
        node.value = cb(node.value);
        if (!node.next) return
        node = node.next;
      }
    }

    mapToArray(cb) {
      if (!this.head) return [];
      let resultsArray = [];
      let node = this.head;
      while (node) {
        if (cb) {
          resultsArray.push(cb(node.value));
        } else {
          resultsArray.push(node.value);
        }
        if (!node.next) {
          return resultsArray;
        }
        node = node.next;
      }
    }

    filterToArray(cb) {
      if (!cb) return null;
      if (!this.head) return [];
      let resultsArray = [];
      let node = this.head;
      while (node) {
        if (cb(node.value)) {
          resultsArray.push(node.value);
        }
        if (!node.next) {
          return resultsArray;
        }
        node = node.next;
      }
    }
   
    sortedListMerge (newNode, cb) {
      this.mergedArray = [];
      const sub = (node) => {
        if (node) {
          this.mergedArray.push({value: node.value, __id: node.__id})
          sub(node.next)
        }
        return
      }
      sub(this.head);
      sub(newNode.head);
      if (cb) {
        this.mergedArray.sort(cb);
      } else {
        this.mergedArray.sort(function(a, b) {return a.value - b.value});
      }
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
        if (this.mergedArray.length) {
          sub2(this.mergedArray.pop())
        } else {
          return
        }
      }
      sub2(this.mergedArray.pop())
    }

  //-- DIGNOSTIC -----------------------------
    hasCycle() {
      this.cache = {};
      let node = this.head;
      let lastId;
      let counter = 0;
      while (node) {
        if (this.cache[node.__id]) {
          // return true and log which nodes
          console.log('Node with circular ref at index: ', counter, ' Between ID ', lastId, ' and ID ', node.__id)
          delete this.cache;
          return true;
        }
        this.cache[node.__id] = true;
        lastId = node.__id;
        counter++;
        node = node.next;
      }
      delete this.cache;
      return false;
    }

 
    reverseList() {
      if (!this.head || !this.head.next) return;

      let temp = [];
      let node1 = this.head;
      while (node1) {
        if (node1) {
          temp.push({value: node1.value, __id: node1.__id})
          node1 = node1.next;
        }
      }

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

    sortList(callback) {
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

      if (callback) {
        temp.sort(callback);
      } else {
        temp.sort(function(a, b) {return a.value - b.value});
      }
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
          sub2(temp.pop())
        } else {
          return
        }
      }
      sub2(temp.pop())

    }

    lookupTime(id) {
      if (!this.head || !this.head.next) {
        return '0ms';
      }
      if (!id) {
        const start = new Date().getTime();
        let count = 0;
        const sub = (node) => {
          if (count === this.length-1) {
            const end = new Date().getTime();
            return (end - start) + 'ms';
          }
          count++;
          return sub(node.next)
        }
        return sub(this.head);
      } else {
        const start = new Date().getTime();
        const sub = (node) => {
          if (node.__id === id) {
            const end = new Date().getTime();
            return (end - start) + 'ms';
          }
          return sub(node.next)
        }
        return sub(this.head);
      }
    }

    removeDuplicates() {
      if (!this.head.next) return;
      let cache = {};
      let node = this.head;
      while (node) {
        if (!cache[node.value]) {
          cache[node.value] = true;
        } else {
          this.deleteNodeId(node.__id);
        }
        if (!node.next) return;
        node = node.next;
      }
    } 

  }

  module.exports = LinkedList;

}.call(this));
