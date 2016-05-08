define(['phaser', 
        'behaviors/core/behavior',
        'behaviors/actions/moveto', 
        'config'
        ], function(Phaser, Behavior, MoveTo, Config) {
    'use strict';

    function Wander(game, blackboard) {
        Behavior.call(this, game);
        this.blackboard = blackboard;
        var dest = randomDest(game);
        this.moveTo = new MoveTo(game, blackboard, dest);
        this.name = 'Wander';
    }

    Config.inheritPrototype(Wander, Behavior);

    Wander.prototype.constructor = Wander;
    Wander.prototype.parent = Behavior.prototype;

    Wander.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        if (!this.moveTo.getState()) {
            this.moveTo.start();
        }
        this.moveTo.act(creature);
        if (this.moveTo.isSuccess()) {
            this.succeed();
        } else if (this.moveTo.isFailure()) {
            this.fail();
        }
    };
    
    Wander.prototype.reset = function() {
        var dest = randomDest(this.game);
        this.moveTo = new MoveTo(this.game, this.blackboard, dest);
        this.start();
    };
    
    /*
     * Returns a random destination within boundaries
     * integerInRange is inclusive, so need to subtract
     * maximum by one
    */
    var randomDest = function(game) {
        var size = Config.getRelativeGameSize();
        return {
            x: game.rnd.integerInRange(0, size.x - 1), 
            y: game.rnd.integerInRange(0, size.y - 1)
        };
    };

    return Wander;
});