(function() {

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
        return;
      }
      if (!currentNode.next) {
        console.log('lookupVal not found: ', lookupVal);
        return 'lookupVal not found';
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
        return;
      }
      if (!currentNode.next) {
        console.log('id not found: ', id);
        return 'id not found';
      }
      currentNode = currentNode.next;
    }
  }

//-- LOOKUP --------------------------------
  readValueAtId(id) { // Updated value at node with selected ID
    let node = this.head;
    while (node) {
      if (node.__id === id) {
        return node.value;
      }
      if (!node.next) {
        console.log('ID not found: ', id);
        return -1;
      }
      node = node.next;
    }
  }

  containsValue(val) { // Returns a boolean indicating whether the input value is present
    let node = this.head;
    while (node) {
      if (node.value === val) {
        return true;
      }
      if (!node.next) {
        console.log('Value not found: ', val);
        return false;
      }
      node = node.next;
    }
  }

  containsId(id) { // Returns a boolean indicating whether the input ID is present
    let node = this.head;
    while (node) {
      if (node.__id === id) {
        return true;
      }
      if (!node.next) {
        console.log('id not found: ', id);
        return false;
      }
      node = node.next;
    }
  }

  indexOfValue(val) { // Returns the numerical order or "index" of the node with value. Returns -1 if not present
    let index = 0;
    let node = this.head;
    while (node) {
      if (node.value === val) {
        return index;
      }
      if (!node.next) {
        return -1;
      }
      index +=1;
      node = node.next;
    }
  }

  indexOfId(id) { // Returns the numerical order or "index" of the node with ID. Returns -1 if not present
    let index = 0;
    let node = this.head;
    while (node) {
      if (node.__id === id) {
        return index;
      }
      if (!node.next) {
        return -1;
      }
      index +=1;
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
      if (!node.next) {
        console.log('ID not found: ', id);
        return -1;
      }
      node = node.next;
    }
  }

//-- DELETE --------------------------------
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
    let node = this.head;
    while (node) {
      if (!node.next.next) {
        node.next = null;
        this.tail = node;
        this.length -=1;
        return this.length;
      }
      node = node.next;
    }
  }

  deleteNodeValue(val) {
    let node = this.head;
    while (node) {
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
      node = node.next;
    }
  }

  deleteNodeId(id) {
    let node = this.head;
    while (node) {
      // if node is head
      if (node.__id === id && node === this.head) {
        this.deleteHead();
        return
      }
      // node not found
      if (!node.next) {
        console.log('node not found: ', id);
        return;         
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
    let mergedArray = [];
    const sub = (node) => {
      if (node) {
        mergedArray.push({value: node.value, __id: node.__id})
        sub(node.next)
      }
      return
    }
    sub(this.head);
    sub(newNode.head);
    if (cb) {
      mergedArray.sort(cb);
    } else {
      mergedArray.sort(function(a, b) {return a.value - b.value});
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
      if (mergedArray.length) {
        sub2(mergedArray.pop())
      } else {
        return
      }
    }
    sub2(mergedArray.pop())
  }

//-- DIGNOSTIC -----------------------------
  hasCycle() {
    let counter = 0;
    let lastId;
    let testHead = this.head;
    let node = this.head;
    while (node) {
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
        node = node.next;
      }
    }
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
    if (!this.head || !this.head.next) {
      return;
    }
    let cache = {};
    const sub = (node) => {
      if (!cache[node.value]) {
        cache[node.value] = node.__id;
      } else {
        this.deleteNodeId(node.__id);
      }
      if (!node.next) {
        return;
      }
      sub(node.next)
    }
    sub(this.head)
  } 

}

module.exports = LinkedList;
}.call(this));