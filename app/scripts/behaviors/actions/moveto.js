define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';

    //Params: Array -> ['string', index]
    //        Object -> {x: x, y: y}
    function MoveTo(game, blackboard, params) {
        this.params = params;
        Behavior.call(this, game);
        this.blackboard = blackboard;
        this.params = params;
    }

    Config.inheritPrototype(MoveTo, Behavior);

    MoveTo.prototype.constructor = MoveTo;
    MoveTo.prototype.parent = Behavior.prototype;
    
    MoveTo.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        // if (!creature.canMove()) {
        //     this.fail();
        //     return;
        // }
        if (!this.moveLocation) {
            if (_.isArray(this.params)) {
                this.moveLocation = this.blackboard.get(this.params[0])[this.params[1]];
            } else if (_.isObject(this.params)) {
                this.moveLocation = this.params;
            }
        }
        if (!this.moveLocation.x || !this.moveLocation.y) {
            this.fail();
        }
        if (!isCreatureAtDestination(creature, this.moveLocation)) {
            moveCreature(creature, this.moveLocation);
        } else {
            this.succeed();
        }
    };
    
    MoveTo.prototype.reset = function() {
        this.start();
    };
    
    var isCreatureAtDestination = function(creature, dest) {
        return Phaser.Math.fuzzyEqual(dest.x, creature.getX(), 1) && 
               Phaser.Math.fuzzyEqual(dest.y, creature.getY(), 1);
    };
    
    var moveCreature = function(creature, dest) {
        if (dest.x != creature.getX()) {
            if (dest.x > creature.getX()) {
                creature.move('East');
            } else {
                creature.move('West');
            }
        }
        
        if (dest.y !== creature.getY()) {
            if (dest.y > creature.getY()) {
                creature.move('North');
            } else {
                creature.move('South');
            }
        }
    };

    return MoveTo;
});