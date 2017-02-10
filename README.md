# DataStructures
##[To The Wiki](https://github.com/tivrama/DataStructures/wiki)
License (MIT)

## Usage
The spirit behind this project is to allow the use of classic data structures within Javascript applications, and to allow the storage of data types such as objects, functions, arrays, and even other instances of any kind of data structures (like a Linked List within a Graph).  To accomplish this, most of the data structures here use an __id in place of the value for reference. 

## Considerations
This does use some basic ES6 features.  You must use node 6.2.0 or higher, and some browsers may have difficulties without a transpiler.  

## NPM Install
You must use node 6.2.0 or higher  

```npm install data-structures-javascript```  

Then, in your Javascript files:  
```var DataStructures = require('data-structures-javascript')```  
```var BinaryTree = DataStructures.BinaryTree```  
Create instances of each data structure by importing only the class you want.  
For example:  
```var BinaryTree = require('data-structures-javascript').BinaryTree``` 


## Classes
Please checkout the [Wiki](https://github.com/tivrama/DataStructures/wiki) to see usage of these classes.
- [BinaryTree (Random)](https://github.com/tivrama/DataStructures/wiki/Binary-Tree-(Random))
- [Graph (Directed)](https://github.com/tivrama/DataStructures/wiki/Graph-(directed))
- [LinkedList (Single)](https://github.com/tivrama/DataStructures/wiki/Linked-List-(Single))
- [Queue](https://github.com/tivrama/DataStructures/wiki/Queue)
- [Stack](https://github.com/tivrama/DataStructures/wiki/Stack)
- [Tree](https://github.com/tivrama/DataStructures/wiki/Tree)

## Latest Update
All Graph helper functions can now take an optional parameter which limits the depth of the query/request [(see the wiki)](https://github.com/tivrama/DataStructures/wiki/Graph-(directed)).  


## Test
```run mocha```

## Updates / Todo
- Some classes use recursive calls which can potentially create a stack overflow depending on the environment.  Replace recursive functions with loops.  

## Contributing
Please submit pull requests to [github.com/tivrama](https://github.com/tivrama/DataStructures)