/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function Selector(game, random) {
        Behavior.call(this, game);
        this.random = random;
        this.index = 0;
        this.name = 'Selector';
        self = this;
    }

    Config.inheritPrototype(Selector, Behavior);

    Selector.prototype.constructor = Selector;
    Selector.prototype.parent = Behavior.prototype;

    Selector.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        if (this.getChildren().length === 0) {
            this.fail();
            return;
        }
        if (this.index >= this.getChildren().length) {
            this.fail();
            return;
        }
        
        var node = this.getChildren()[this.index];
        if (!node.getState()) {
            node.start();
        }
        node.act(creature);
        if (node.isSuccess()) {
            this.succeed();
            return;
        } else if (node.isFailure()) {
            this.index++;
        }
    };
    
    Selector.prototype.reset = function() {
        self.index = 0;
        self.start();
    };

    return Selector;
});