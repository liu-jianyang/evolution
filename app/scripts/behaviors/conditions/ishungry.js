/*global _*/

define(['phaser', 'behaviors/core/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    function IsHungry(game, blackboard, params) {
        Behavior.call(this, game);
        this.minHungerLevel = params.minHungerLevel;
        this.name = 'IsHungry';
    }

    Config.inheritPrototype(IsHungry, Behavior);

    IsHungry.prototype.constructor = IsHungry;
    IsHungry.prototype.parent = Behavior.prototype;
    
    IsHungry.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        if (creature.getHunger() <= this.minHungerLevel) {
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