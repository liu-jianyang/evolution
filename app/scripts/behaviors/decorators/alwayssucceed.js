/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    function AlwaysSucceed(game, blackboard) {
        Behavior.call(this, game);
        this.name = 'AlwaysSucceed';
        this.game = game;
        this.blackboard = blackboard;
    }

    Config.inheritPrototype(AlwaysSucceed, Behavior);

    AlwaysSucceed.prototype.constructor = AlwaysSucceed;
    AlwaysSucceed.prototype.parent = Behavior.prototype;
    
    AlwaysSucceed.prototype.act = function(creature) {
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
        if (node.isSuccess() || node.isFailure()) {
            this.succeed();
        }
    };
    
    AlwaysSucceed.prototype.reset = function() {
        this.getChildren()[0].reset();
        this.start();
    };

    return AlwaysSucceed;
});