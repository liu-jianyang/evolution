define(['phaser', 
        'prefabs/creature',
        'behaviors/core/behaviortree', 
        'config'], function(Phaser, Creature, BehaviorTree, Config) {
    'use strict';

    function Sheep(game, x, y) {
        var imageRef = 'sheep';
        var deadRef = 'deadsheep';
        Creature.call(this, game, x, y, imageRef, deadRef);
        var bt = new BehaviorTree(game, {
            root: {
                name: 'Selector'
            },
            children: [
                {
                    name: 'Search',
                    params: {type: 'tile', element: 'clay'}
                },
                {
                    name: 'MoveTo',
                    params: {x: 3, y: 4}
                }
            ]
        })
        this.setBehavior(bt.getRoot());
        this.setHunger(80);
        this.setFoodOptions('grass');
    }

    Config.inheritPrototype(Sheep, Creature);

    Sheep.prototype.constructor = Sheep;
    Sheep.prototype.parent = Sheep.prototype;
    
    Sheep.prototype.playAnimation = function(direction) {
        // this.animations.play(direction);
    };
    
    Sheep.prototype.eat = function() {
        //if hungry and can eat tile or whatever's on tile, eat
        if (this.getHunger() < 50) {
            var tile = this.map.getTile(this.getX(), this.getY());
            if (tile && tile.properties && tile.properties.type && this.getFoodOptions().indexOf(tile.properties.type) !== -1) {
                this.changeHunger(20);
                console.log('Eat food');
            }
        }
    };
    
    return Sheep;
});