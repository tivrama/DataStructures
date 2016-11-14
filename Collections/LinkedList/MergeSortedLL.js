'use strict';
/*
 * Write a function that, given the head (i.e., first node) of two sorted linked lists with numerical values, 
 * merges the linked lists in a sorted way. The function should return the head of the new linked list.
 * 
 * Example:
 * Inputs: 1 --> 7 --> 10 --> 11 & 0 --> 2 --> 5 --> 13
 * sortedListMerge(1, 0);
 * Output: 0 --> 1 --> 2 --> 5 --> 7 --> 10 --> 11 --> 13
 *
 */



// Solution which returns a new list
const sortedListMerge = (node1, node2) => {
  // TODO: your code here
  let mergedArray = [];

  const pushValsToMergedArray = (LL) => {
    mergedArray.push(LL.value);
    if (LL.next) {
      pushValsToMergedArray(LL.next)
    }
    return
  }
  pushValsToMergedArray(node1);
  pushValsToMergedArray(node2);

  mergedArray.sort()

  let head = null;

  const makeNewList = (node) => {
    const makeNode = {
      value: node,
      next: head
    }
    if (!head) {
      head = makeNode;
    } else {
      let oldHead = head;
      makeNode.next = oldHead;
      head = makeNode;
    }
    if (mergedArray.length) {
      makeNewList(mergedArray.pop())
    } else {
      return head
    }
  }
  makeNewList(mergedArray.pop())
  console.log('head: ', head);
  return head
};


module.exports = { sortedListMerge };
