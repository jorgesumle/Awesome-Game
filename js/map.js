var map;
var layer, layerbackdrop;
var background;

function preloadMap(){
    var mjson = getURLvar("map");
    if(mjson == null){
      game.load.tilemap('map', 'res/0.json', null, Phaser.Tilemap.TILED_JSON);
    }else{
      game.load.tilemap('map', 'res/'+mjson+'.json', null, Phaser.Tilemap.TILED_JSON);
    }
    game.load.image('tiles', 'res/tiles.png');
    game.load.image('background', 'res/backgrounds/background.gif');
    game.load.image('tux', 'res/tux.png');
}


function createMap(){
    loadMap();
}

function updateMap(){
  backgroundUpdate();
}


function loadMap(){
  game.stage.backgroundColor = "#e7a9eb";
  //  The map key here is the Loader key given in game.load.tilemap
  map = game.add.tilemap('map');


  map.addTilesetImage('tux', 'tux');
  map.addTilesetImage('tiles', 'tiles');
  
  // Creates a layer that the character will not collide with.
  layerbackdrop = map.createLayer('backdrop');
  
  /* Creates a layer from the World layer in the map data.
     A Layer is effectively like a Phaser.Sprite, so is added to the display list. */
  layer = map.createLayer('world');
  map.setCollisionBetween(1, 16, true, layer);
  
  //  This resizes the game world to match the layer dimensions
  layer.resizeWorld();
  loadBackground();
  layerbackdrop.bringToTop();
  layer.bringToTop();
}

//find objects in a Tiled layer that containt a property called "type" equal to a certain value
function findObjectsByType(type, map, layer) {
  var result = new Array();
  map.objects.objects.forEach(function(element){
    if(element.type === type) {
      /* Phaser uses top left, Tiled bottom left so we have to adjust the y position
         also keep in mind that the cup images are a bit smaller than the tile which is 16x16
         so they might not be placed in the exact pixel position as in Tiled */
      element.y -= map.tileHeight;
      result.push(element);
    }      
  });
  return result;
}

function loadBackground(){
  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background'); 
}

function backgroundUpdate(){
  background.position.x = game.camera.x/4;
  background.position.y = game.camera.y/4;
}
