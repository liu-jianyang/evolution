/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function AlwaysFail(game, behavior) {
        Behavior.call(this, game);
        this.behavior = behavior;
        this.name = 'AlwaysFail';
        self = this;
    }

    Config.inheritPrototype(AlwaysFail, Behavior);

    AlwaysFail.prototype.constructor = AlwaysFail;
    AlwaysFail.prototype.parent = Behavior.prototype;
    AlwaysFail.prototype.start = function() {
        self.parent.start();
        self.behavior.start();
    };
    
    AlwaysFail.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive()) {
                self.fail();
                return;
            }
            
            self.behavior.act();
            
            if (!self.behavior.isRunning()) {
                self.fail();
            }
            
        }
    };
    
    AlwaysFail.prototype.reset = function() {
        self.start();
    };

    return AlwaysFail;
});