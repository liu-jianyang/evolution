/*global _*/

define(['phaser', 'behaviors/actions/search', 'behaviors/core/behavior', 'config'], function(Phaser, Search, Behavior, Config) {
    'use strict';
    function EnemyVisible(game, blackboard, params) {
        Behavior.call(this, game);
        this.minHungerLevel = params.minHungerLevel;
        this.name = 'EnemyVisible';
        this.search = new Search(game, blackboard, {type: 'enemy'});
    }

    Config.inheritPrototype(EnemyVisible, Behavior);

    EnemyVisible.prototype.constructor = EnemyVisible;
    EnemyVisible.prototype.parent = Behavior.prototype;
    
    EnemyVisible.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        if (!this.search.getState()) {
            this.search.start();
        }
        this.search.act(creature);
        if (this.search.isSuccess()) {
            this.succeed();
        } else if (this.search.isFailure()) {
            this.fail();
        }
    };
    
    EnemyVisible.prototype.reset = function() {
        this.start();
    };

    return EnemyVisible;
});