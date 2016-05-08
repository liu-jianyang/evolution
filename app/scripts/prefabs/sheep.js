define(['phaser', 
        'prefabs/creature',
        'behaviors/core/behaviortree', 
        'config'], function(Phaser, Creature, BehaviorTree, Config) {
    'use strict';

    function Sheep(game, x, y) {
        var imageRef = 'sheep';
        var deadRef = 'deadsheep';
        Creature.call(this, game, x, y, imageRef, deadRef);
        this.game = game;
        this.setHunger(80);
        this.minHungerLevel = 90;
        this.foodOptions = [{type: 'tile', element: 'grass'}];
        var bbData = {
            minHungerLevel: this.minHungerLevel,
            searchOptions: this.foodOptions
        }
        var bt = new BehaviorTree(game, {
            root: {
                name: 'Sequence'
            },
            children: [
                {
                    name: 'IsHungry'
                },
                {
                    name: 'Search',
                    params: 'searchLocations'
                },
                {
                    name: 'MoveTo',
                    params: 'searchLocations'
                },
                {
                    name: 'Eat'
                }
            ]
        }, bbData)
        this.setBehavior(bt.getRoot());
    }

    Config.inheritPrototype(Sheep, Creature);

    Sheep.prototype.constructor = Sheep;
    Sheep.prototype.parent = Sheep.prototype;
    
    Sheep.prototype.playAnimation = function(direction) {
        // this.animations.play(direction);
    };
    
    Sheep.prototype.eat = function() {
        //if hungry and can eat tile or whatever's on tile, eat
        if (this.getHunger() < this.minHungerLevel) {
            var tile = this.game.map.getTile(this.getX(), this.getY());
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
    
    return Sheep;
});