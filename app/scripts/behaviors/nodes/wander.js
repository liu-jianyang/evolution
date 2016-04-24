define(['phaser', 
        'behaviors/behavior', 
        'behaviors/nodes/moveto', 
        'config'
        ], function(Phaser, Behavior, MoveTo, Config) {
    'use strict';
    var moveTo, self;
    function Wander(game) {
        Behavior.call(this, game);
        var dest = randomDest(game);
        moveTo = new MoveTo(game, dest.x, dest.y);
        self = this;
    }

    Config.inheritPrototype(Wander, Behavior);

    Wander.prototype.constructor = Wander;
    Wander.prototype.parent = Behavior.prototype;
    
    Wander.prototype.start = function() {
        self.parent.start();
        moveTo.start();
    };
    
    Wander.prototype.act = function(creature) {
        if (!moveTo.isRunning()) {
            return;
        }
        moveTo.act(creature);
        if (moveTo.isSuccess()) {
            self.succeed();
            self.reset(); //continuous wander
        } else if (moveTo.isFailure()) {
            self.fail();
        }
    };
    
    Wander.prototype.reset = function() {
        var dest = randomDest(self.game);
        moveTo = new MoveTo(self.game, dest.x, dest.y);
        self.start();
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