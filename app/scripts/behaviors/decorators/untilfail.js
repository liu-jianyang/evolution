/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    function UntilFail(game, blackboard) {
        Behavior.call(this, game);
        this.name = 'UntilFail';
        this.game = game;
        this.blackboard = blackboard;
    }

    Config.inheritPrototype(UntilFail, Behavior);

    UntilFail.prototype.constructor = UntilFail;
    UntilFail.prototype.parent = Behavior.prototype;
    
    UntilFail.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        if (!creature.isAlive()) {
            this.fail();
            return;
        }
        var node = this.getChildren()[0];
        if (!node.getState()) {
            node.start();
        }
        node.act(creature);
        if (node.isFailure()) {
            this.succeed();
        } else if (node.isSuccess()) {
            node.reset();
        }
    };
    
    UntilFail.prototype.reset = function() {
        this.getChildren()[0].reset();
        this.start();
    };

    return UntilFail;
});