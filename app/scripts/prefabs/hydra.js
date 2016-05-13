define(['phaser', 
        'prefabs/creature',
        'behaviors/core/behaviortree', 
        'config'], function(Phaser, Creature, BehaviorTree, Config) {
    'use strict';

    function Hydra(game, x, y, map) {
        this.index = 1;
        var imageRef = 'hydra' + this.index;
        var deadRef = 'deadhydra' + this.index;
        Creature.call(this, game, x, y, imageRef, deadRef);
        this.game = game;
        this.map = map;
        this.setHunger(80);
        this.setHealth(300);
        this.setAttack(70);
        this.setDefense(35);
        var bt = new BehaviorTree(game, {
            root: {
                name: 'Repeat'
            },
            children: [
                {
                    name: 'Wander'
                }
            ]
        })
        // this.setBehavior(bt.getRoot());
    }

    Config.inheritPrototype(Hydra, Creature);

    Hydra.prototype.constructor = Hydra;
    Hydra.prototype.parent = Hydra.prototype;
    
    Hydra.prototype.playAnimation = function(direction) {
        // this.animations.play(direction);
    };
    
    // Hydra.prototype.withinRange = function(enemy) {
        
    // }
    
    Hydra.prototype.eat = function() {
        //if hungry and can eat tile or whatever's on tile, eat
        if (this.getHunger() < this.minHungerLevel) {
            var tile = this.map.getTile(this.getX(), this.getY());
            if (hasProperties(tile)) {
                var isTileFoodOption = _.find(this.foodOptions, function(option) {
                    return option.element === tile.properties.type;
                }) ? true : false;
                if (isTileFoodOption) {
                    this.changeHunger(20);
                    return true;
                }
            }
            
        }
        return false;
    };
    
    function hasProperties(tile) {
        return tile && tile.properties && tile.properties.type;
    }
    
    return Hydra;
});