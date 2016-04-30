/*global _*/

define(['phaser', 'behaviors/nodes/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function UntilSucceed(game, behavior) {
        Behavior.call(this, game);
        this.behavior = behavior;
        this.name = 'UntilSucceed';
        self = this;
    }

    Config.inheritPrototype(UntilSucceed, Behavior);

    UntilSucceed.prototype.constructor = UntilSucceed;
    UntilSucceed.prototype.parent = Behavior.prototype;
    UntilSucceed.prototype.start = function() {
        self.parent.start();
        self.behavior.start();
    };
    
    
    UntilSucceed.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive()) {
                self.fail();
                return;
            }
            
            self.behavior.act();
            
            if (self.behavior.isSuccess()) {
                self.succeed();
                return;
            } 
            if (!self.behavior.isRunning()) {
                self.behavior.reset();
            }
        }
    };
    
    UntilSucceed.prototype.reset = function() {
        self.start();
    };

    return UntilSucceed;
});