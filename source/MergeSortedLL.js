'use strict';


// returns a new list
const sortedListMerge = (node1, node2) => {
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
  return head
};


module.exports = { sortedListMerge };
