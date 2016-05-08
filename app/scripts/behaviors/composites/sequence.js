/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';

    function Sequence(game, random) {
        Behavior.call(this, game);
        this.random = random;
        this.index = 0;
        this.name = 'Sequence';
    }

    Config.inheritPrototype(Sequence, Behavior);

    Sequence.prototype.constructor = Sequence;
    Sequence.prototype.parent = Behavior.prototype;

    Sequence.prototype.act = function(creature) {
        if (this.isRunning()) {
            if (this.getChildren().length === 0) {
                this.fail();
                return;
            }
            if (this.index >= this.getChildren().length) {
                this.succeed();
                return;
            }
            
            var node = this.getChildren()[this.index];
            if (!node.getState()) {
                node.start();
            }
            node.act(creature);
            if (node.isFailure()) {
                this.fail();
            } else if (node.isSuccess()) {
                this.index++;
            }
        }
    };
    
    Sequence.prototype.reset = function() {
        this.index = 0;
        this.start();
    };

    return Sequence;
});