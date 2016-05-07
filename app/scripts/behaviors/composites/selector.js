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
    
    Selector.prototype.start = function() {
        self.parent.start();
        self.getChildren()[self.index].start();
    };
    
    Selector.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive() || self.getChildren().length === 0) {
                self.fail();
                return;
            }
            
            var node = self.getChildren()[self.index];
            node.act(creature);
            if (node.isSuccess()) {
                self.succeed();
            } else if (node.isFailure()) {
                self.index++;
                //no more nodes that can be tried
                if (self.getChildren().length >= self.index) {
                    self.fail();
                } else {
                    self.getChildren()[self.index].start();
                }
            }
        }
    };
    
    Selector.prototype.reset = function() {
        self.index = 0;
        self.start();
    };

    return Selector;
});