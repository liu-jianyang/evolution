'use strict';

define(['phaser', 
        'prefabs/elephant', 
        'prefabs/hydra', 
        'config'
        ], function(Phaser, 
                    Elephant,
                    Hydra,
                    Config) {
    var game, elephant, hydra;
    function Level() {}
    
    Level.prototype = {
        init: function() {
            this.game.enableStep();
        },
      
        create: function() {
            game = this.game;
            game.map = game.add.tilemap('level');
            game.map.addTilesetImage('tiles', 'gameTiles');
            this.grassHsh = {shaved: 32*15+2, mature: 32*15+3, halfMature: 32*15+1};
          
            //create layer
            this.backgroundLayer = game.map.createLayer('background');
            this.backgroundLayer.resizeWorld();
            
            //initialize creatures
            elephant = new Elephant(game, 5, 7, game.map);
            hydra = new Hydra(game, 6, 11, game.map);
            game.creatures = [elephant, hydra];
            game.add.existing(elephant);
            game.add.existing(hydra);
            
            //create windows for creatures
            var tileSize = Config.options.tileSize;
            var gameX = Config.options.gameSize.x;
            var gameY = Config.options.gameSize.y;
            var dialogSize = {
                width: gameX / game.creatures.length,
                height: tileSize * 4 + (gameY % tileSize)
            }
            var positionX = 0;
            var positionY = gameY - dialogSize.height;
            var offset = 0;
            _.each(game.creatures, function(creature) {
                game.dialogWindow = game.add.sprite(positionX + offset, positionY, 'dialogWindow');
                game.dialogWindow.width = dialogSize.width;
                game.dialogWindow.height = dialogSize.height;
                game.add.sprite(positionX + offset + 5, positionY + 5, creature.key);
                offset += dialogSize.width;
            });
                
            // game.dialogText = game.add.text(positionX + 5, positionY + 5, 'Hello!');
            
            //temporary
            game.map.putTile(this.grassHsh.halfMature, 3, 4);
            var tile = game.map.getTile(3, 4);
            tile.properties.type = 'grass';
            
            setInterval(function() {
                game.step();
            }, 500);
        },
        
        update: function() {
            // game.dialogText.setText("Step count: " + game.stepCount);
        },
        
        render: function() {
            var x = 16, y = 550;
            for (var i = 0; i < this.game.creatures.length; i++) {
                var offset = i * 20;
                var creature = this.game.creatures[i];
                this.game.debug.text(creature.getName() + '\'s current behavior: ' + creature.behavior.name, x, y + offset);
            }
        }
    
    };
      
    return Level;
});