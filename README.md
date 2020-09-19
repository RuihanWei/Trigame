# Trigame Rules

![diagram](imgase\Figure 1.png)

1.	Two players take turns and only one move with one piece is allowed per turn.
2.	A triangle means the smallest triangle on the board (with no lines inside). When a piece is said to be inside a triangle, it is in the smallest triangles with no lines inside; when a piece is said to be on the edge of the triangle, it stays in the middle of one side of the smallest triangle; when a piece is said to be on the vertex of a triangle, it is on the vertex of the smallest triangle and possibly sharing the vertex with other triangles (the initial position of the “b”s’ and “c”s’).  Capture means removing a piece from the opponent out of the game.
3.	Pieces of the same type cannot capture each other.
4.	Piece “a”: 1. When “a” is inside a triangle, it can move into adjacent triangles (into the inside of the triangles) that share the same edge with the triangle it is in (capture can be done with the move). When inside a triangle, “a” can also move onto any vertexes of the triangle it is in (capture cannot be done with this move, when a vertex is occupied by the opponents’ piece, “a” cannot move to that vertex while inside a triangle). “a” inside a triangle can capture “c” on the edges of the triangle it is in by moving across the edge “c” it is on, to the vertex opposite the edge; when there is an opponent’s piece on that vertex, the piece is also captured. Inside the triangle, it can capture (only) a piece on the vertex opposing the side of the triangle (“a” cannot actively move to the vertex when there is not an opponent’s piece on it) it is in (a friendly piece on the edge opposing the vertex would not be affected). 2. When “a” is on the vertex of a triangle, it can move into any triangle in contact with the vertex (capture can be done with this move when a piece from the opponent is inside the triangle). 	
5.	Piece “b”: “b” can move along straight lines (edges) and stop at vertexes (capture can be done with this move). However, it is not allowed to pass the bolded points unless there is a piece on the bolded vertex (it may capture the piece on the vertex and then move onto any side, abiding by the same rules). “b” cannot capture “b”’s.
6.	Piece “c”: 1. when “c” is on the vertex of a triangle, it can move to the opposing side of the triangle (capture can be done with this move). When there is an “a” inside the triangle in which the move is done, the “a” is captured. On a side, “c” can only be captured by an “a“ or a “c”. No pieces can move directly through the edge. When “c” is on the vertex of a triange, it can move to any adjacent vertexes (unless a friendly piece is on that vertex or another piece is on the edge between the two vertexes). Capture can be done with this move. 2. When there is an “a” inside the triangle in which the move is done, the “a” is captured.  When “c” is on the edge of a triangle, it can move to the vertex(es) opposing the edge (capture can be done with this move). When there is an “a” inside the triangle in which the move is done, the “a” is captured. 
7.	Whenever a piece is captured in the game, a 50 moves countdown will be started. If no captures are done within the 50 moves, the program will count the remaining pieces of both sides. If one side has more pieces than the other, the side with more pieces wins. If the pieces are the same for both sides, the 50 moves countdown will be restarted. When a capture is done within the 50 moves, the countdown will also start over. If two complete countdowns (100 moves) are done in a row and there is the same number of pieces on both sides after the countdown, the game draws.
8.	One side wins if: 1. The countdown is over with the winning side having more pieces than the opponent. 2. When the opponent is out of pieces. 
9.	The game draws if: 1. two countdowns are done in a row, and there are the same number of pieces on both sides . 2. Two players agree to draw.
10.	Coming soon: When “c” is on the edge of triangle(s) (sometimes two triangles sharing one edge), it can move into other edges of the triangles that are part of the edge it is on (capture can be done with this move).


