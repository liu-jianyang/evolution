'use strict';

define(['phaser', 
        'prefabs/creature', 
        'config',
        'behaviors/nodes/move'
        ], function(Phaser, 
                    Creature, 
                    Config,
                    Move) {
    var sheep;
    function Level() {}
    
    Level.prototype = {
        init: function() {
            
        },
      
        create: function() {
            this.updateDelay = 0;
            this.map = this.game.add.tilemap('level');
            this.map.addTilesetImage('tiles', 'gameTiles');
            this.grassHsh = {shaved: 32*15+2, mature: 32*15+3, halfMature: 32*15+1};
          
            //create layer
            this.backgroundLayer = this.map.createLayer('background');
            this.backgroundLayer.resizeWorld();
            sheep = new Creature(this.game, 5*Config.options.tileSize, 7*Config.options.tileSize, 'sheep');
            this.game.add.existing(sheep);
            
            this.map.putTile(this.grassHsh.halfMature, 3, 4);
            
            var routine = new Move(this.game, 320, 16*5);
            sheep.setBehavior(routine);
            // sheep.update();
            console.log(1);
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