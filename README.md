# DataStructures

## Usage (still under construction)
Writen in ES6.  Create instances of each data structure by importing only the class you want.  For example:
```import { LinkedList } from 'data-structures';```

### test: run mocha

## Classes
- LinkedList
- Tree
- BinaryTree

(coming soon)
- Stack
- Queue
- Set
- Graph

## Linked List (Single)
Linked List creates nodes that that are linked via a next property on each node.  When creating an instance of LinkedList, the instance will keep track of the head, tail and length.  It will also create a unique ID for each node with methods that can CRUD by value or ID.  
### Linked List Methods
#### Create
- addToHead(value)
- addToTail(value)
- insertAfterValue(lookupValue, value)
- insertAfterId(__id, value)

#### Lookup
- readValueAtId(__id)
- containsValue(value)
- containsId(__id)
- indexOfValue(value)
- indexOfId(__id)

#### Update
- updateValueAtId(__id, newValue)

#### Delete
- deleteHead()
- deleteTail()
- deleteNodeValue(value)
- deleteNodeId(__id)

#### Helper Methods
- onEach(callback)
- mapToArray(optionalCallback)
- filterToArray(callbackPredicate)
- sortedListMerge(LikedList, optionalCallback)

#### Diagnostic
- hasCycle()
- reverseList()
- sortList(optionalCallback.value)
- lookupTime(optionalId)
- removeDuplicates()

#### Properties
- head
- tail
- length
- allIds



## Tree
Tree begins with a root node.  Branches and leaves are added with the addChild method.  All methods can be invoked on the root or on any other node.  
 
### Tree Methods
#### Create
- addChild(value)

#### Lookup
- contains(value)
- countLeaves()
- countNodes

#### Update
- updateValue(currentValue, replacementValue)

#### Delete
- deleteNode(value) (Promotes any children to node's parent)
- deleteLeaf(value)
- deleteBranchWithChilden(value)
- removeDuplicates()

#### Helper Methods
- onEach(callback)
- mapToArray(optionalCallback)
- filterToArray(callbackPredicate)

#### Properties
- children


## Binary Tree (Random)
Binary Tree begins with a root node and nodes are added with the addChild method.  The index is created with a random string.  Though this does result in some inefficiency, the search is dramatically better than an array or linked list, with on average, no more than 55 operations for a tree of 1,000,000 nodes (when searching by id).    
 
### Binary Tree Methods
#### Create
- addChild(value)

#### Lookup
- containsVal(value)
- containsId(id)
- getId(val)
- lookUp(id)

#### Update
- updateId(id)

#### Delete
- deleteNode(value) (Promotes any children to node's parent)
- removeDuplicates() // coming soon

#### Helper Methods
- mapToArray(optionalCallback)
- mapIdToArray()
- filterToArray(callbackPredicate)

#### Diagnostic
- countNodes()
- deepestGeneration()

