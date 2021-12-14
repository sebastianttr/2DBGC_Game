# 2DBGC Game

This is the game we are working on in the 2D Browser Game Coding course

## Progress as of December 13, 2021
These have been added to this iteration of the game: 
 - Changed the way we handled the removal of collision detected items (using an `removeItems[]` array instead if setting the `isColliding` property of the `Collectable` object to `true`)
 - Added a new `PointsDisplay` game object, which inherits the `GameObject` class and has `render()` and `update()` 
 - `PointsDisplay` was programmed to be used in a Canvas (or with DOM) and was instantiated in the [`index.js`](https://github.com/sebastianttr/2DBGC_Game/blob/master/index.js) file 
 - Created a sprite sheet and added the sprites to the `Player` object -> Player (cat) is now animated (idle + run sprites) 

-> Assignment 5 also included in this commit


## Progress as of December 09, 2021

We have added the following things to our game: 

 - Added a new Class called Collectible.js (in my case Collect**a**ble.j) and we have given it all the needed properties and methods to render on the canvas  
 - Abstracted all of our classes to inherit a new Class called 
[GameObject.js](https://github.com/sebastianttr/2DBGC_Game/blob/master/Objects/GameObject.js) which includes all of the necessary properties and methods like `context,  x, y, width, height, init(), update() and render()`
 - Changed [Player.js](https://github.com/sebastianttr/2DBGC_Game/blob/master/Objects/Player.js) and [Collectable.js](https://github.com/sebastianttr/2DBGC_Game/blob/master/Objects/Collectable.js) to inherit [GameObject.js](https://github.com/sebastianttr/2DBGC_Game/blob/master/Objects/GameObject.js)
 - Added collision detection, a new Service Class called [RandomDispatcher.js](https://github.com/sebastianttr/2DBGC_Game/blob/master/Services/RandomDispatcher.js), which does something through a callback function every X milliseconds
 - Created a `gameObjects` array and `collectables` array for keeping track of all the game objects and collectables in an array. We then set the collision property of each collectable and remove the items upon collision by filtering and iterating over all collectables.

![](https://raw.githubusercontent.com/sebastianttr/2DBGC_Game/master/gameprogress_09_12_21.gif)
