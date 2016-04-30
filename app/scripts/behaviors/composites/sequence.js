/*global _*/

define(['phaser', 'behaviors/nodes/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function Sequence(game, random) {
        Behavior.call(this, game);
        this.random = random;
        this.index = 0;
        this.name = 'Sequence';
        self = this;
    }

    Config.inheritPrototype(Sequence, Behavior);

    Sequence.prototype.constructor = Sequence;
    Sequence.prototype.parent = Behavior.prototype;
    
    Sequence.prototype.start = function() {
        self.parent.start();
        self.childNodes[self.index].start();
    };
    
    Sequence.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive() || self.childNodes.length === 0) {
                self.fail();
                return;
            }
            
            var node = self.childNodes[self.index];
            node.act(creature);
            if (node.isFailure()) {
                self.fail();
            } else if (node.isSuccess()) {
                self.index++;
                //no more nodes that can be tried
                if (self.childNodes.length >= self.index) {
                    self.succeed();
                } else {
                    self.childNodes[self.index].start();
                }
            }
        }
    };
    
    Sequence.prototype.reset = function() {
        self.index = 0;
        self.start();
    };

    return Sequence;
});