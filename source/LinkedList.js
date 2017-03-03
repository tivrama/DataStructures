(function() {

  'use strict';

  class LinkedList {

    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.allIds = [];
    }

    makeNode(val) {
      return {
        value: val,
        __id: this.makeId(),
        next: null  
      };
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
    addToHead(val) {
      let makeNode = this.makeNode(val);
      makeNode.next = this.head;
      if (!this.head) {
        this.tail = makeNode;
        this.head = makeNode;
        return this.length = 1;
      } else {
        let oldHead = this.head;
        makeNode.next = oldHead;
        this.head = makeNode;
        return this.length++;
      }
    }

    addToTail(val) {
      let makeNode = this.makeNode(val);
      if (!this.tail) {
        this.tail = makeNode;
        this.head = makeNode;
        return this.length = 1;
      } else {
        this.tail.next = makeNode;
        this.tail = makeNode;
        return this.length++;
      }
    }

    insertAfterValue(lookupVal, val) { 
      let makeNode = this.makeNode(val);
      let node = this.head;
      while (node) {
        if (node.value === lookupVal) {
          let breakList = node.next;
          makeNode.next = breakList;
          node.next = makeNode;
          return this.length++;
        }
        if (!node.next) return null;
        node = node.next;
      }
    }

    insertAfterId(id, val) { 
      let makeNode = this.makeNode(val);
      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.__id === id) {
          let breakList = currentNode.next;
          makeNode.next = breakList;
          currentNode.next = makeNode;
          this.length +=1;
          return this.length;
        }
        if (!currentNode.next) return null;
        currentNode = currentNode.next;
      }
    }

  //-- LOOKUP --------------------------------
    readValueAtId(id) {
      let node = this.head;
      while (node) {
        if (node.__id === id) return node.value;
        if (!node.next) return -1;
        node = node.next;
      }
    }

    containsValue(val) {
      let node = this.head;
      while (node) {
        if (node.value === val) return true;
        if (!node.next) return false;
        node = node.next;
      }
    }

    containsId(id) {
      let node = this.head;
      while (node) {
        if (node.__id === id) return true;
        if (!node.next) return false;
        node = node.next;
      }
    }

    indexOfValue(val) {
      let index = 0;
      let node = this.head;
      while (node) {
        if (node.value === val) return index;
        if (!node.next) return -1;
        index++;
        node = node.next;
      }
    }

    indexOfId(id) {
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
    updateValueAtId(id, val) {
      let node = this.head;
      while (node) {
        if (node.__id === id) {
          node.value = val;
          return node.value;
        }
        if (!node.next) return null;
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
      if (!this.tail) return;
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
        if (node.value === val && node === this.head) return this.deleteHead();
        if (!node.next) return -1;         
        if (node.next.value === val) {
          if (!node.next.next) {
            return this.deleteTail();
          }    
          let breakList = node.next.next;
          node.next = breakList
          return this.length--;     
        }
        node = node.next;
      }
    }

    deleteNodeId(id) {
      let node = this.head;
      while (node) {
        if (node.__id === id && node === this.head) {
          return this.deleteHead();
        }
        if (!node.next) return -1;         
        if (node.next.__id === id) {
          if (!node.next.next) {
            return this.deleteTail();
          }    
          let breakList = node.next.next;
          node.next = breakList
          return this.length--;      
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
        if (!node.next) return resultsArray;
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
        if (!node.next) return resultsArray;
        node = node.next;
      }
    }
   
    sortedListMerge (newNode, cb) {
      this.mergedArray = [];
      const sub1 = (node) => {
        while (node) {
          this.mergedArray.push({value: node.value, __id: node.__id})
          node = node.next;
        }
      };
      sub1(this.head);
      sub1(newNode.head);
      if (cb) {
        this.mergedArray.sort(cb);
      } else {
        this.mergedArray.sort(function(a, b) {return a.value - b.value});
      }
      this.head = null;
      this.tail = null;

      const sub2 = (node) => {  // TODO: Remove this recursive function
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

      const sub2 = (node) => {  // TODO: Remove this recursive function
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

      const sub2 = (node) => {  // TODO: Remove this recursive function
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
        const sub = (node) => {  // TODO: Remove this recursive function
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
        const sub = (node) => {  // TODO: Remove this recursive function
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
