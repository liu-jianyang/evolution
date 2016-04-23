define(['phaser', 'behaviors/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var destX, destY, self;
    function Move(game, x, y) {
        Behavior.call(this, game);
        destX = x;
        destY = y;
        self = this;
    }

    Config.inheritPrototype(Move, Behavior);

    Move.prototype.constructor = Move;
    Move.prototype.parent = Behavior.prototype;
    
    Move.prototype.act = function(creature) {
        if (this.isRunning()) {
            if (!creature.isAlive()) {
                this.fail();
                return;
            }
            if (!isCreatureAtDestination(creature)) {
                moveCreature(creature);
            }
        }
    }
    
    Move.prototype.reset = function() {
        this.start();
    }
    
    var isCreatureAtDestination = function(creature) {
        return Phaser.Math.fuzzyEqual(destX, creature.getX(), 1) && 
               Phaser.Math.fuzzyEqual(destY, creature.getY(), 1);
    }
    
    var moveCreature = function(creature) {
        if (destX != creature.getX()) {
            if (destX > creature.getX()) {
                creature.move('East');
            } else {
                creature.move('West');
            }
        }
        
        if (destY !== creature.getY()) {
            if (destY > creature.getY()) {
                creature.move('North');
            } else {
                creature.move('South');
            }
        }
        
        if(isCreatureAtDestination(creature)) {
            self.succeed();
        }
    }


    return Move;
});