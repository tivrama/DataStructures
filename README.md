# DataStructures
##[To The Wiki](https://github.com/tivrama/DataStructures/wiki)

## Usage
Writen in ES6.  Create instances of each data structure by importing only the class you want.
For example: ```import { LinkedList } from 'data-structures';``` 
The spirit behind this project is to allow the use of classic data structures within Javascript applications, and to allow the storage of non-primitive data types such as objects, functions, arrays, and even other instances of any kind of data structures (like a Linked List tree within a Graph).  To accomplish this, most of the data structures here use an __id in place of the value for reference.  

### test: run mocha

## Classes
- BinaryTree
- Graph
- LinkedList
- Queue
- Stack
- Tree



## Binary Tree (Random)
Binary Tree begins with a root node and nodes are added with the addChild method.  The index is created with a random string.  Though this does result in some inefficiency, the search is dramatically better than an array or linked list, with on average, no more than 55 operations for a tree of 1,000,000 nodes (when searching by id). Note: root node will always be "VVVVVVVVVVVVVVVVVVVV" which is alphbetically, the exact center.  This helps prevent an unbalanced tree. 

#### Instantiate
```let myBinaryTree = new BinaryTree(value)```
 
### Binary Tree Methods
#### Create
- addChild(value)

#### Lookup
- containsId(id)
- lookUp(id)
- containsVal(value) (slow)
- getId(val) (slow)

#### Update
- updateId(id, value)

#### Delete
- deleteNode(id) (Promotes any children to node's parent)
- removeDuplicates()

#### Helper Methods
- mapToArray(optionalCallback)
- mapIdToArray()
- filterToArray(callbackPredicate)

#### Diagnostic
- countNodes()
- deepestGeneration()



## Graph (Directed)
Graph class creates a new instance of a graph.  Other graphs can be passed into the second parameter (which is an array) as edges. Each graph has a unique ID.  

#### Create / Instantiate
- The only creation is by instantiating a new instance of the class: ```let myGraph = new Graph({hello: 'world'}, [yourGraph, theirGraph])```

### Graph Methods
#### Lookup
- connectedTo(node)
- connectedToVal(Val)
- getId(val)
- lookupId(id)
- hasEdge(toNode)
- hasTwoWayEdges(toNode)

#### Update
- updateId(id, val)
- addEdge(toNode)
- addTwoWayEdges(toNode)
- removeEdge(fromNode, toNode)
- removeTwoWayEdges(toNode)

#### Helper Methods
- mapValToArray(optionalCallback)
- mapIdToArray()
- filterToArray(callbackPredicate)
- countNodes()
- degreesOfSeperation(toNode)



## Linked List (Single)
Linked List creates nodes that that are linked via a next property on each node.  When creating an instance of LinkedList, the instance will keep track of the head, tail and length.  It will also create a unique ID for each node with methods that can CRUD by value or ID.  
### Linked List Methods

#### Instantiate
```let myList = new LinkedList(value)```

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



## Queue
Queue follows first in, first out.  When creating a new queue, if an array is put in the parameter, each element becomes an item in the stack with element [0] being first out. 
 
#### Instantiate
```let myQueue = new Queue(value)```

### Queue Methods
#### Create
- enqueue(value)
- enqueueCollection(collection)

#### Lookup
- next()
- peek(index)

#### Delete
- dequeue()

#### Helper
- merge(stackToMerge)

#### Properties
- length



## Stack
Stack follows first in, last out.  When creating a new stack, if an array is put in the parameter, each element becomes an item in the stack with element [0] being on bottom. 
 
#### Instantiate
```let myStack = new Stack(value)```

### Stack Methods
#### Create
- push(value)
- pushCollection(collection)

#### Lookup
- next()
- peek(index)

#### Delete
- pop()

#### Helper
- merge(stackToMerge)

#### Properties
- depth



## Tree
Tree begins with a root node.  Branches and leaves are added with the addChild method.  All methods can be invoked on the root or on any other node.  

#### Instantiate
```let myTree = new Tree(value)```

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
