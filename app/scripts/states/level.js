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
            game.physics.enable(elephant, Phaser.Physics.ARCADE);
            elephant.body.immovable = true;
            hydra = new Hydra(game, 6, 11, game.map);
            game.physics.enable(hydra, Phaser.Physics.ARCADE);
            hydra.body.immovable = true;
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
                creature.spritesGroup = game.add.group();
                var dialogWindow = game.add.sprite(positionX + offset, positionY, 'dialogWindow', undefined, creature.spritesGroup);
                dialogWindow.width = dialogSize.width;
                dialogWindow.height = dialogSize.height;
                dialogWindow.name = 'dialogWindow';
                
                //stats
                var statsGroup = game.add.group(creature.spritesGroup, 'statsGroup');
                var creatureWindow = game.add.sprite(positionX + offset + 5, positionY + 5, creature.key, undefined, statsGroup);
                var healthBarText = game.add.text(offset + creatureWindow.width + 5, positionY + 5, creature.health + '/' + creature.maxHealth, {font: '10px Arial'}, statsGroup);
                healthBarText.name = 'healthBarText';
                
                offset += dialogSize.width;
            });
            
            //temporary
            game.map.putTile(this.grassHsh.halfMature, 3, 4);
            var tile = game.map.getTile(3, 4);
            tile.properties.type = 'grass';
            
            setInterval(function() {
                game.step();
            }, 500);
        },
        
        update: function() {
            _.each(game.creatures, function(creature) {
                var statsGroup = _.find(creature.spritesGroup.children, function(child) {
                    return child.name === 'statsGroup';
                });
                var healthBarText = _.find(statsGroup.children, function(child) {
                    return child.name === 'healthBarText';
                });
                healthBarText.setText(creature.health + '/' + creature.maxHealth);
            });
            
            //for testing purposes
            if (game.stepCount === 5) {
                game.creatures[0].addMod({key: 'haste', type: 'buff'});
                game.creatures[0].addMod({key: 'confuse', type: 'debuff'});
                game.creatures[0].addMod({key: 'slow', type: 'debuff'});
                console.log(game.creatures[0].spritesGroup)
            }
            if (game.stepCount === 8) {
                game.creatures[0].removeMod({key: 'haste'});
            }
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