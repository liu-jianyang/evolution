'use strict';

define(['phaser', 
        'prefabs/sheep', 
        'config',
        'behaviors/nodes/move',
        'behaviors/nodes/wander'
        ], function(Phaser, 
                    Sheep, 
                    Config,
                    Move,
                    Wander) {
    var sheep;
    function Level() {}
    
    Level.prototype = {
        init: function() {
            
        },
      
        create: function() {
            this.updateDelay = 0;
            this.game.map = this.game.add.tilemap('level');
            this.game.map.addTilesetImage('tiles', 'gameTiles');
            this.grassHsh = {shaved: 32*15+2, mature: 32*15+3, halfMature: 32*15+1};
          
            //create layer
            this.backgroundLayer = this.game.map.createLayer('background');
            this.backgroundLayer.resizeWorld();
            sheep = new Sheep(this.game, 5*Config.options.tileSize, 7*Config.options.tileSize, this.game.map);
            this.game.add.existing(sheep);
            
            this.game.map.putTile(this.grassHsh.halfMature, 3, 4);
            var tile = this.game.map.getTile(3, 4);

            tile.properties.type = 'grass';
        },
        
        // update: function() {
        //     // this.updateDelay++;
        //     // if (this.updateDelay % (10 - Config.options.gameSpeed) === 0) {
        //     //     // sheep.update();
        //     // }
        // }
    
    };
      
    return Level;
});