/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    function AlwaysFail(game, blackboard) {
        Behavior.call(this, game);
        this.name = 'AlwaysFail';
        this.game = game;
        this.blackboard = blackboard;
    }

    Config.inheritPrototype(AlwaysFail, Behavior);

    AlwaysFail.prototype.constructor = AlwaysFail;
    AlwaysFail.prototype.parent = Behavior.prototype;
    
    AlwaysFail.prototype.act = function(creature) {
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
            this.fail();
        }
    };
    
    AlwaysFail.prototype.reset = function() {
        this.getChildren()[0].reset();
        this.start();
    };

    return AlwaysFail;
});