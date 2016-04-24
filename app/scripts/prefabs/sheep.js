define(['phaser', 
        'prefabs/creature', 
        'behaviors/nodes/moveto',
        'behaviors/nodes/wander', 
        'behaviors/nodes/search', 
        'config'], function(Phaser, Creature, MoveTo, Wander, Search, Config) {
    'use strict';

    function Sheep(game, x, y) {
        var imageRef = 'sheep';
        var deadRef = 'deadsheep';
        Creature.call(this, game, x, y, imageRef, deadRef);
        this.setBehavior(new Search(this.game, {type: 'tile', element: 'grass'}));
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