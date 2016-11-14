# DataStructures

## Usage (still under construction)
Writen in ES6.  Create instances of each data structure by importing only the class you want.  For example:
```import { LinkedList } from 'data-structures';```

## Linked List (Single)
Linked List creates nodes that that are linked via a next property on each node.  When creating an instance of LinkedList, the instance will keep rack of the head, tail and length.  It will also create a unique ID for each node with methods that can CRUD by value or ID.  
### Linked List Methods
#### Create
- addToHead(value)
- addToTail(value)
- deleteHead()
- deleteTail()
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
- reverseList()

#### Delete
- deleteHead()
- deleteTail()
- deleteNodeValue(value)
- deleteNodeId(__id)

#### Helper Methods
- onEach(callback)
- mapToArray(callback)
- filterToArray(callbackPredicate)

#### Diagnostic
- hasCycle()

#### Properties
head
tail
length
allIds



