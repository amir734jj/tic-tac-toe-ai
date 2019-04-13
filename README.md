# tic-tac-toe-ai
AI for tic-tac-toe using Minimax Algorithm implemented in typescript


Board:
```text
[
	None, None, None
	None, None, None
	None, None, None
]
```

Decision tree:
```text
Attempt to set (0, 0) to Circle 
 children (depth: 0):
  Attempt to set (0, 1) to Square 
   children (depth: 1):
    Attempt to set (0, 2) to Circle 
     children (depth: 2):
      Attempt to set (1, 1) to Square 
       children (depth: 3):
        Attempt to set (1, 2) to Circle 
        ...
```

Shortest path to win:
```text
Attempt to set (2, 2) to Circle 
Attempt to set (2, 1) to Square 
Attempt to set (1, 2) to Circle 
Attempt to set (2, 0) to Square 
Attempt to set (0, 1) to Circle 
Attempt to set (1, 1) to Square 
Attempt to set (0, 0) to Circle 
Attempt to set (0, 2) to Square ; won: Square
```