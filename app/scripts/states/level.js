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
    
    function onMouseover() {
        console.log('onMouseover');
    }
    
    function setupSpells(game, spellArray) {
        var spellGroup = game.add.group();
        var windowPositionX = Config.options.gameSize.x - (64 + 15);
        var windowPositionY = 0;
        var spellSize = 32;
        
        var spellWindow = game.add.sprite(windowPositionX, windowPositionY, 'dialogWindow', undefined, spellGroup);
        spellWindow.width = 2*spellSize + 15;
        spellWindow.height = (5 + spellSize) * (Phaser.Math.ceilTo(spellArray.length / 2, 0, 10)) + 5;
        var positionX = windowPositionX, 
            positionY = windowPositionY;
            
        //TODO: Change positionX and positionY only when there's another element
        _.each(spellArray, function(spell) {
            var x = positionX + 5;
            var y = positionY + 5;
            var spellSprite = game.add.sprite(x, y, spell.key, undefined, spellGroup);
            spellSprite.name = 'spell' + spell.key;
            if (Config.options.gameSize.x - (spellSprite.x + spellSprite.width) < spellSprite.width) {
                //next row
                positionX = windowPositionX; //reset positionX
                positionY = y + spellSprite.height; //increment positionY
            } else {
                //same row, just increment positionX;
                positionX = x + spellSprite.width;
            }
        });
    }
    
    function setupCreatureProfiles(game, creatures) {
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
        _.each(creatures, function(creature) {
            creature.spritesGroup = game.add.group();
            var dialogWindow = game.add.sprite(positionX + offset, positionY, 'dialogWindow', undefined, creature.spritesGroup);
            dialogWindow.width = dialogSize.width;
            dialogWindow.height = dialogSize.height;
            dialogWindow.name = 'dialogWindow';
            
            //stats
            var statsGroup = game.add.group(creature.spritesGroup, 'statsGroup');
            var creatureProfile = game.add.sprite(positionX + offset + 5, positionY + 5, creature.key, undefined, statsGroup);
            creatureProfile.inputEnabled = true;
            creatureProfile.name = 'creatureProfile';
            var healthBarText = game.add.text(offset + creatureProfile.width + 5, positionY + 5, creature.health + '/' + creature.maxHealth, {font: '10px Arial'}, statsGroup);
            healthBarText.name = 'healthBarText';
            
            offset += dialogSize.width;
        });
    }

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
            
            setupCreatureProfiles(game, game.creatures);
            
            //temporary
            setupSpells(game, [{key: 'haste'}, {key: 'confuse'}, {key: 'slow'},{key: 'haste'}, {key: 'confuse'}, {key: 'slow'},{key: 'haste'}, {key: 'confuse'}, {key: 'slow'}]);
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
                var creatureProfile = _.find(statsGroup.children, function(child) {
                    return child.name === 'creatureProfile';
                });
                var popupGroup;
                if (creatureProfile.input.pointerOver()) {
                    popupGroup = game.add.group(statsGroup, 'popupGroup');
                    var popup = game.add.sprite(creatureProfile.x + creatureProfile.width, creatureProfile.y - 32, 'dialogWindow', undefined, popupGroup);
                    popup.height = 32;
                    popup.width = 64;
                    var attackText = game.add.text(popup.x + 3, popup.y + 3, 'Attack: ' + creature.getAttack(), {font: '10px Arial'}, popupGroup);
                    var defenseText = game.add.text(popup.x + 3, attackText.y + 8, 'Defense: ' + creature.getDefense(), {font: '10px Arial'}, popupGroup);
                    game.add.text(popup.x + 3, defenseText.y + 8, 'Speed: ' + creature.getSpeed(), {font: '10px Arial'}, popupGroup);

                } else {
                    popupGroup = _.find(statsGroup.children, function(child) {
                        return child.name === 'popupGroup';
                    });
                    if (popupGroup) {
                        popupGroup.destroy();
                    }
                }
                var healthBarText = _.find(statsGroup.children, function(child) {
                    return child.name === 'healthBarText';
                });
                healthBarText.setText(creature.health + '/' + creature.maxHealth);
            });
            
            //for testing purposes
            if (game.stepCount > 5) {
                game.creatures[0].addMod({key: 'haste', type: 'buff'});
                game.creatures[0].addMod({key: 'confuse', type: 'debuff'});
                game.creatures[1].addMod({key: 'slow', type: 'debuff'});
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