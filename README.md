# 2DBGC Game

This is the game we are working on in the 2D Browser Game Coding course

## Progress as of December 09, 2021

We have added the following things to our game: 

 - Added a new Class called Collectible.js (in my case Collect**a**ble.j) and we have given it all the needed properties and methods to render on the canvas  
 - Abstracted all of our classes to inherit a new Class called 
[GameObject.js](https://github.com/user/repo/blob/branch/other_file.md) which includes all of the necessary properties and methods like `context,  x, y, width, height, init(), update() and render()`
 - Changed [Player.js](https://github.com/sebastianttr/2DBGC_Game/blob/master/Objects/Player.js) and [Collectable.js](https://github.com/sebastianttr/2DBGC_Game/blob/master/Objects/Collectable.js) to inherit [GameObject.js](https://github.com/user/repo/blob/branch/other_file.md)
 - Added collision detection, a new Service Class called [RandomDispatcher.js](https://github.com/user/repo/blob/branch/other_file.md), which does something through a callback function every X milliseconds
 - Created a `gameObjects` array and `collectables` array for keeping track of all the game objects and collectables in an array. We then set the collision property of each collectable and remove the items upon collision by filtering and iterating over all collectables.

[![Watch the video](https://github.com/sebastianttr/2DBGC_Game/blob/master/game_09_12_21.mp4)
