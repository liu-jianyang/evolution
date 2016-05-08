/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    function IsHungry(game, blackboard, params) {
        Behavior.call(this, game);
        this.blackboard = blackboard;
        this.params = params;
        this.name = 'IsHungry';
    }

    Config.inheritPrototype(IsHungry, Behavior);

    IsHungry.prototype.constructor = IsHungry;
    IsHungry.prototype.parent = Behavior.prototype;
    
    IsHungry.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        var minHungerLevel = this.blackboard ? this.blackboard.get('minHungerLevel') : this.params.minHungerLevel;
        if (!minHungerLevel) {
            this.fail();
            return;
        }
        if (creature.getHunger() <= minHungerLevel) {
            this.succeed();
        } else {
            this.fail();
        }
    };
    
    IsHungry.prototype.reset = function() {
        this.start();
    };

    return IsHungry;
});