define(['phaser', 
        'behaviors/behavior', 
        'behaviors/nodes/move', 
        'config'
        ], function(Phaser, Behavior, Move, Config) {
    'use strict';
    var move, self;
    function Wander(game) {
        console.log('Wander constructor');
        Behavior.call(this, game);
        var dest = randomDest(game);
        move = new Move(game, dest.x, dest.y);
        self = this;
    }

    Config.inheritPrototype(Wander, Behavior);

    Wander.prototype.constructor = Wander;
    Wander.prototype.parent = Behavior.prototype;
    
    Wander.prototype.start = function() {
        move.start();
    }
    
    Wander.prototype.act = function(creature) {
        if (!move.isRunning()) {
            return;
        }
        move.act(creature);
        if (move.isSuccess()) {
            this.succeed();
        } else if (move.isFailure()) {
            this.fail();
        }
    }
    
    Wander.prototype.reset = function() {
        var dest = randomDest(this.game);
        move = new Move(this.game, dest.x, dest.y);
    }
    
    var randomDest = function(game) {
        return {
            x: game.rnd.integerInRange(0, Config.options.gameSize.x), 
            y: game.rnd.integerInRange(0, Config.options.gameSize.y)
        };
    }

    return Wander;
});