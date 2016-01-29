var Q = Quintus({
    development: true, // reload assets on-the-fly during development
    maximize: true,
    width: 800,
    height: 600,
    scaleToFit: true // Scale the game to fit the screen of the player's device
}).include("Sprites, Scenes, Input").setup("gamecanvas");

Q.gameLoop(function(dt) {
   Q.clear();
   // TODO
});
