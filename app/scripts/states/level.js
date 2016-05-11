'use strict';

define(['phaser', 
        'prefabs/elephant', 
        'prefabs/hydra', 
        'config'
        ], function(Phaser, 
                    Elephant,
                    Hydra,
                    Config) {
    var elephant, hydra;
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
            elephant = new Elephant(this.game, 5, 7, this.game.map);
            hydra = new Hydra(this.game, 6, 11, this.game.map);
            this.game.creatures = [elephant, hydra];
            this.game.add.existing(elephant);
            this.game.add.existing(hydra);
            
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