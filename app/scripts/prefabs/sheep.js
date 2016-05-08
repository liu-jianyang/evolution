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
        this.setFoodOptions('grass');
        var bt = new BehaviorTree(game, {
            root: {
                name: 'Sequence'
            },
            children: [
                {
                    name: 'IsHungry',
                    params: {minHungerLevel: this.minHungerLevel}
                },
                {
                    name: 'MoveTo',
                    params: {x: 3, y: 4}
                },
                {
                    name: 'Eat'
                }
            ]
        })
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
            console.log(this.getFoodOptions(), this.getFoodOptions().indexOf(tile.properties.type));
            if (tile && tile.properties && tile.properties.type && this.getFoodOptions().indexOf(tile.properties.type) !== -1) {
                this.changeHunger(20);
                return true;
            }
        }
        return false;
    };
    
    return Sheep;
});