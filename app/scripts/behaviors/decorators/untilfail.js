/*global _*/

define(['phaser', 'behaviors/nodes/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function UntilFail(game, behavior) {
        Behavior.call(this, game);
        this.behavior = behavior;
        this.name = 'UntilFail';
        self = this;
    }

    Config.inheritPrototype(UntilFail, Behavior);

    UntilFail.prototype.constructor = UntilFail;
    UntilFail.prototype.parent = Behavior.prototype;
    UntilFail.prototype.start = function() {
        self.parent.start();
        self.behavior.start();
    };
    
    
    UntilFail.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive()) {
                self.fail();
                return;
            }
            
            self.behavior.act();
            
            if (self.behavior.isFailure()) {
                self.succeed();
                return;
            } 
            if (!self.behavior.isRunning()) {
                self.behavior.reset();
            }
        }
    };
    
    UntilFail.prototype.reset = function() {
        self.start();
    };

    return UntilFail;
});