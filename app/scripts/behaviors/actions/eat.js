define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';

    function Eat(game, blackboard) {
        Behavior.call(this, game);
        this.blackboard = blackboard;
    }

    Config.inheritPrototype(Eat, Behavior);

    Eat.prototype.constructor = Eat;
    Eat.prototype.parent = Behavior.prototype;
    
    Eat.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        if (creature.eat()) {
            this.succeed();
        } else {
            this.fail();
        }
    };
    
    Eat.prototype.reset = function() {
        this.start();
    };

    return Eat;
});