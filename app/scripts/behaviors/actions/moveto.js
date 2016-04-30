define(['phaser', 'behaviors/nodes/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var destX, destY, self;
    function MoveTo(game, blackboard, x, y) {
        Behavior.call(this, game);
        this.blackboard = blackboard;
        destX = x;
        destY = y;
        this.name = 'MoveTo';
        self = this;
    }

    Config.inheritPrototype(MoveTo, Behavior);

    MoveTo.prototype.constructor = MoveTo;
    MoveTo.prototype.parent = Behavior.prototype;
    
    MoveTo.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive()) {
                self.fail();
                return;
            }
            if (!isCreatureAtDestination(creature)) {
                moveCreature(creature);
            }
        }
    };
    
    MoveTo.prototype.reset = function() {
        self.start();
    };
    
    var isCreatureAtDestination = function(creature) {
        return Phaser.Math.fuzzyEqual(destX, creature.getX(), 1) && 
               Phaser.Math.fuzzyEqual(destY, creature.getY(), 1);
    };
    
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
    };

    return MoveTo;
});