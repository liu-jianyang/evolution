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
    
    function onMouseover(x) {
        console.log('onMouseover', x);
    }
    
    function onMouseUp(sprite, pointer) {
        console.log('onMouseUp');
        console.log(sprite, pointer);
    }
    
    function setupSpells(game, spellArray, panelGroup) {
        var spellPanel = _.find(panelGroup.children, function(child) {
            return child.name === 'spellPanel';
        });
        
        var spellGroup = game.add.group(panelGroup, 'spellGroup');
        var spellSize = 32;
        var separation = 5;
        var positionX = spellPanel.x + separation, 
            positionY = spellPanel.y + separation;
            
        _.each(spellArray, function(spell) {
            if (positionX >= spellPanel.x + spellPanel.width) {
                //next row
                positionX = spellPanel.x + separation;
                positionY = positionY + spellSize + separation;
            }
            var spellSprite = game.add.sprite(positionX, positionY, spell.key, undefined, spellGroup);
            spellSprite.info = spell.info;
            spellSprite.inputEnabled = true;
            spellSprite.events.onInputDown.add(onMouseUp, this);
            positionX += spellSize + separation;
        });
        spellGroup.setAll('input.useHandCursor', true);
    }
    
    function setupCreatureProfiles(game, creatures, x, y, width, height) {
        //create windows for creatures
        var dialogSize = {
            width: width / game.creatures.length,
            height: height
        }
        var positionX = x;
        var positionY = y;
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
    
    function setupMap(game) {
        
    }
    
    function setupPanel(game, name, panelKey, x, y, width, height, group) {
        console.log(panelKey);
        
        
        var sprite = game.add.sprite(x, y, panelKey, undefined, group);
        sprite.name = name + 'Panel';
        sprite.width = width;
        sprite.height = height;
    }

    Level.prototype = {
        init: function() {
            this.game.enableStep();
        },
        
        preload: function() {
            
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
            
            
            setupMap(game);
            
            //setup panels
            var panelGroup = game.add.group();
            panelGroup.name = 'panelGroup';
            //setup creature panel
            var x = 0;
            var y = Config.options.gameSize.y - (Config.options.tileSize * 4);
            var width = Config.options.gameSize.x;
            var height = (Config.options.tileSize * 4);
            setupPanel(game, 'creatures', 'dialogWindow', x, y, width, height, panelGroup);
            setupCreatureProfiles(game, game.creatures, x, y, width, height);
            
            //setup spell panel
            setupPanel(game, 'spell', 'dialogWindow', Config.options.gameSize.x - ((Config.options.tileSize * 2) + 15), 0, (Config.options.tileSize * 2) + 15, Config.options.gameSize.y - (Config.options.tileSize * 4), panelGroup);
            
            //setup judge panel
            setupPanel(game, 'judge', 'judgeWindow', 0, 0, Config.options.tileSize * 4, Config.options.tileSize * 5, panelGroup);
            
            //setup player panel
            
            setupPanel(game, 'player', 'playerWindow', 0, Config.options.tileSize * 5, Config.options.tileSize * 4, Config.options.tileSize * 5, panelGroup);
            //temporary
            setupSpells(game, [{key: 'haste'}, {key: 'confuse'}, {key: 'slow'},{key: 'haste'}, {key: 'confuse'}, {key: 'slow'},{key: 'haste'}, {key: 'confuse'}, {key: 'slow'}], panelGroup);
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