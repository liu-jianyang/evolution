/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    function Repeat(game, blackboard, numOfTimes) {
        Behavior.call(this, game);
        this.game = game;
        this.blackboard = blackboard;
        this.numOfTimes = numOfTimes ? numOfTimes : -1; //will never reach -1?
        this.numRepeated = 0;
        this.name = 'Repeat';
    }

    Config.inheritPrototype(Repeat, Behavior);

    Repeat.prototype.constructor = Repeat;
    Repeat.prototype.parent = Behavior.prototype;
    
    Repeat.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        if (this.getChildren().length === 0 || this.getChildren().length > 1) {
            this.fail();
            return;
        }
        if (this.numOfTimes === 0) {
            this.succeed();
            return;
        }
        
        var node = this.getChildren()[0];
        if (!node.getState()) {
            node.start();
        }
        node.act(creature);
        if (node.isSuccess() || node.isFailure()) {
            this.numRepeated++;
            if (this.numOfTimes === this.numRepeated) {
                this.succeed();
                return;
            } else {
                node.reset();
            }
        }
    };
    
    Repeat.prototype.reset = function() {
        this.numRepeated = 0;
        this.start();
    };

    return Repeat;
});