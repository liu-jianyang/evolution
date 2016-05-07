/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function AlwaysSucceed(game, behavior) {
        Behavior.call(this, game);
        this.behavior = behavior;
        this.name = 'AlwaysSucceed';
        self = this;
    }

    Config.inheritPrototype(AlwaysSucceed, Behavior);

    AlwaysSucceed.prototype.constructor = AlwaysSucceed;
    AlwaysSucceed.prototype.parent = Behavior.prototype;
    AlwaysSucceed.prototype.start = function() {
        self.parent.start();
        self.behavior.start();
    };
    
    AlwaysSucceed.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive()) {
                self.fail();
                return;
            }
            
            self.behavior.act();
            
            if (!self.behavior.isRunning()) {
                self.succeed();
            }
            
        }
    };
    
    AlwaysSucceed.prototype.reset = function() {
        self.start();
    };

    return AlwaysSucceed;
});