define(['phaser', 
        'prefabs/creature', 
        'behaviors/nodes/move',
        'behaviors/nodes/wander', 
        'config'], function(Phaser, Creature, Move, Wander, Config) {
    'use strict';

    function Sheep(game, x, y, map) {
        var imageRef = 'sheep';
        var deadRef = 'deadsheep';
        Creature.call(this, game, x, y, imageRef, deadRef);
        this.setBehavior(new Wander(this.game));
        this.setHunger(80);
    }

    Config.inheritPrototype(Sheep, Creature);

    Sheep.prototype.constructor = Sheep;
    Sheep.prototype.parent = Sheep.prototype;
    
    Sheep.prototype.playAnimation = function(direction) {
        // this.animations.play(direction);
    }
    
    Sheep.prototype.eat = function() {
        //if hungry and can eat tile or whatever's on tile, eat
        if (this.getHunger() < 50) {
            var tile = this.map.getTile(this.getX(), this.getY());
            if (tile && tile.properties && tile.properties.type && this.getFoodOptions().indexOf(tile.properties.type) !== -1) {
                this.changeHunger(20);
                console.log('Eat food');
            }
        }
    }
    
    return Sheep;
});