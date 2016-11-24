'use strict';

const LinkedList = require('../Collections/LinkedList/LinkedList.js').LinkedList,
      assert = require('chai').assert;

xdescribe('LinkedList', () => {

  describe('LinkedList Create', () => {  

    it('addToHead method should add values to head', () => {
      const myList = new LinkedList();
      myList.addToHead(1);
      myList.addToHead(2);
      myList.addToHead(3);
      assert.equal(myList.head.value, 3, 'addToHead not working')
    });

    it('addToTail method should add values to tail', () => {
      const myList = new LinkedList();
      myList.addToTail(1);
      myList.addToTail(2);
      myList.addToTail(3);
      assert.equal(myList.tail.value, 3, 'addToTail not working')
    });

    it('should add items to head and tail', () => {
      const myList = new LinkedList();
      assert.equal(myList.head, null, 'Empty initial list');
      myList.addToTail(1);
      myList.addToTail(2);
      assert.equal(myList.tail.value, 2, 'Tail insertion not working');
      assert.equal(myList.head.value, 1, 'Tail insertion not working');
      myList.addToHead(0);
      assert.equal(myList.head.value, 0, 'Head insertion not working');
      assert.equal(myList.tail.value, 2, 'Tail insertion not working');

      const concatValues = 3;
      let output = 0;

      for(let i = myList.head; i; i = i.next){
        output = output + i.value;
      }
      assert.equal(output, concatValues, 'Head and Tail insertion methods not working');
    });

    it('insertAfterValue should insert a node with given value after the node with the lookup value', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      myList.insertAfterValue(3, 3.14159);
      assert.isTrue(myList.containsValue(3.14159));
      const soln = [0,1,2,3,3.14159,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9];
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should only insert once');
        current = current.next;
      }
    });


    it('insertAfterId should insert a node with given value after the node with the lookup ID', () => {
      let myID = '';
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
        if (i === 3) {
          myID = myList.allIds[i];
        }
      }
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      myList.insertAfterId(myID, 3.14159);
      assert.isTrue(myList.containsValue(3.14159));
      const soln = [0,1,2,3,3.14159,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9];
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should only insert once');
        current = current.next;
      }
    });
  });



  describe('LinkedList Lookup', () => {

    it('readValueAtId should read value at input ID', () => {
      let myID = '';
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
        if (i === 3) {
          myID = myList.allIds[i];
        }
      }
      assert.equal(myList.readValueAtId(myID), 3, 'readValueAtId not working')
      assert.equal(myList.readValueAtId('fake ID'), -1, 'Should return -1 if not found');
    });

    it('containsValue should return true if value is in list and false if not', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      assert.isTrue(myList.containsValue(3));
      assert.isFalse(myList.containsValue(3.14159));
    });

    it('containsId should return true if value is in list and false if not', () => {
      let myID = '';
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
        if (i === 3) {
          myID = myList.allIds[i];
        }
      }
      assert.isTrue(myList.containsId(myID));
      assert.isFalse(myList.containsId('fake ID'));
    });

    it('indexOfValue should index of value, or -1 if not in list', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      assert.equal(myList.indexOfValue(3), 3, 'indexOfValue not working')
      assert.equal(myList.indexOfValue(10), -1, 'Should return -1 if not found');
    });

    it('indexOfId should index of value, or -1 if not in list', () => {
      let myID = '';
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
        if (i === 3) {
          myID = myList.allIds[i];
        }
      }
      assert.equal(myList.indexOfId(myID), 3, 'indexOfId not working')
      assert.equal(myList.indexOfId('fake ID'), -1, 'Should return -1 if not found');
    });

  });

  describe('LinkedList Update', () => {

    it('updateValueAtId should replace value at input ID', () => {
      let myID = '';
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
        if (i === 3) {
          myID = myList.allIds[i];
        }
      }
      assert.equal(myList.updateValueAtId(myID, 3.14159), 3.14159, 'updateValueAtId not working')
      assert.equal(myList.readValueAtId('fake ID', 3.14159), -1, 'Should return -1 if not found');
    });

  });


  describe('LinkedList Delete', () => {

    it('deleteHead method should delete nodes from head', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      myList.deleteHead();
      myList.deleteHead();
      assert.equal(myList.head.value, 2, 'deleteHead not working')
      assert.equal(myList.length, 8, 'deleteHead not working')
    });

    it('deleteTail method should delete nodes from tail', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      myList.deleteTail();
      myList.deleteTail();
      assert.equal(myList.tail.value, 7, 'deleteTail not working')
      assert.equal(myList.length, 8, 'deleteTail not working')
    });

    it('deleteNodeValue should delete node with input ID', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      const soln = [0,1,2,4,5,6,7,8,9];
      myList.deleteNodeValue(3)
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should delete node');
        current = current.next;
      }
      myList.deleteNodeValue(10)
      let newCurrent = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(newCurrent.value, soln[i], 'Should not change the collection');
        newCurrent = newCurrent.next;
      }
    });

    it('deleteNodeId should delete node with input ID', () => {
      let myID = '';
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
        if (i === 3) {
          myID = myList.allIds[i];
        }
      }
      const soln = [0,1,2,4,5,6,7,8,9];
      myList.deleteNodeId(myID)
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should delete node');
        current = current.next;
      }
      myList.deleteNodeId('fake ID')
      let newCurrent = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(newCurrent.value, soln[i], 'Should not change the collection');
        newCurrent = newCurrent.next;
      }
    });

  });

  describe('LinkedList Helper Methods', () => {

    it('onEach should invoke a callback on the value of each node', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      const soln = [0,2,4,6,8,10,12,14,16,18];
      myList.onEach((val) => ( val * 2))
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should change each node');
        current = current.next;
      }
    });

    it('mapToArray should invoke a callback on the value of each node', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      const soln = [0,2,4,6,8,10,12,14,16,18];
      const resultArray = myList.mapToArray((val) => val * 2)
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with callback invoked on each element');
        current = current.next;
      }
    });

    it('mapToArray should return an array of unchanged values if there is no callback', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      const soln = [0,1,2,3,4,5,6,7,8,9];
      const resultArray = myList.mapToArray()
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with the values from the Linked List');
        current = current.next;
      }
    });

    it('filterToArray should return an array of values which pass callback predicate', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      const soln = [0,2,4,6,8];
      const resultArray = myList.filterToArray((val) => val % 2 === 0)
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with the values from the Linked List');
        current = current.next;
      }
    });

    it('sortedListMerge should merge a different list into this list and sort if there is no callback', () => {
      const myList1 = new LinkedList();
      for (let i = 0; i < 10; i += 2) {
        myList1.addToTail(i);
      }
      const myList2 = new LinkedList();
      for (let i = 1; i < 10; i += 2) {
        myList2.addToTail(i);
      }
      const soln = [0,1,2,3,4,5,6,7,8,9];
      myList1.sortedListMerge(myList2)
      let resultArray = myList1.mapToArray();
      let current = myList1.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with the values from the Linked List');
        current = current.next;
      }
    });

    it('sortedListMerge should merge a different list into this list and sort according to callback', () => {
      const myList1 = new LinkedList();
      for (let i = 0; i < 10; i += 2) {
        myList1.addToTail(i);
      }
      const myList2 = new LinkedList();
      for (let i = 1; i < 10; i += 2) {
        myList2.addToTail(i);
      }
      const soln = [9,8,7,6,5,4,3,2,1,0];
      myList1.sortedListMerge(myList2, (a, b) => b.value - a.value)
      let resultArray = myList1.mapToArray();
      let current = myList1.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(resultArray[i], soln[i], 'Should return an array with the values from the Linked List');
        current = current.next;
      }
    });

  });

  describe('LinkedList Diagnostic Methods', () => {

    it('hasCycle should return true if there is a loop and false if not', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      assert.isFalse(myList.hasCycle());
      myList.head.next.next.next = myList.head;
      assert.isTrue(myList.hasCycle());     
    });

    it('reverseList should reverse the order of the list', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      const soln = [9,8,7,6,5,4,3,2,1,0];
      myList.reverseList()
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should reverse list');
        current = current.next;
      }  
    });

    it('sortList should sort the list according to a callback', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
      const soln = [9,8,7,6,5,4,3,2,1,0];
      myList.sortList((a, b) => b.value - a.value)
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should sort accoding to the callback');
        current = current.next;
      }  
    });

    it('removeDuplicates should remove all duplicates from the list', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
        myList.addToTail(i);
      }
      const soln = [0,1,2,3,4,5,6,7,8,9];
      myList.removeDuplicates()
      let current = myList.head;
      for (let i = 0; i < soln.length; i++) {
        assert.equal(current.value, soln[i], 'Should remove duplicate nodes');
        current = current.next;
      }  
    });

  });


  describe('LinkedList Properties', () => {

    it('properties length and allIds should match', () => {
      const myList = new LinkedList();
      for (let i = 0; i < 10; i++) {
        myList.addToTail(i);
      }
    assert.equal(myList.length, myList.allIds.length, 'Length and allIds.length should match'); 
    });

  });

});