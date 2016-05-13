/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    function UntilSucceed(game, blackboard) {
        Behavior.call(this, game);
        this.name = 'UntilSucceed';
        this.game = game;
        this.blackboard = blackboard;
    }

    Config.inheritPrototype(UntilSucceed, Behavior);

    UntilSucceed.prototype.constructor = UntilSucceed;
    UntilSucceed.prototype.parent = Behavior.prototype;
    
    UntilSucceed.prototype.act = function(creature) {
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
        if (node.isSuccess()) {
            this.succeed();
        } else if (node.isFailure()) {
            node.reset();
        }
    };
    
    UntilSucceed.prototype.reset = function() {
        this.getChildren()[0].reset();
        this.start();
    };

    return UntilSucceed;
});