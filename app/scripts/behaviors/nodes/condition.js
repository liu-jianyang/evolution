/*global _*/

define(['phaser', 'behaviors/nodes/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function Condition(game, str) {
        Behavior.call(this, game);
        this.str = str;
        this.name = 'Condition';
        self = this;
    }

    Config.inheritPrototype(Condition, Behavior);

    Condition.prototype.constructor = Condition;
    Condition.prototype.parent = Behavior.prototype;
    
    Condition.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (eval(this.str)) {
                self.succeed();
            } else {
                self.fail();
            }
        }
    };
    
    Condition.prototype.reset = function() {
        self.start();
    };

    return Condition;
});