/*global _*/

define(['phaser', 'behaviors/actions/search', 'behaviors/core/behavior', 'config'], function(Phaser, Search, Behavior, Config) {
    'use strict';
    function EnemyIsWeaker(game, blackboard, params) {
        Behavior.call(this, game);
        this.game = game;
        this.blackboard = blackboard;
        this.params = params;
        this.name = 'EnemyIsWeaker';
    }

    Config.inheritPrototype(EnemyIsWeaker, Behavior);

    EnemyIsWeaker.prototype.constructor = EnemyIsWeaker;
    EnemyIsWeaker.prototype.parent = Behavior.prototype;
    
    EnemyIsWeaker.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        var enemies = _.filter(this.blackboard.get(this.params), function(enemy) {
            return creature.getPowerLevel() > enemy.getPowerLevel();
        });
        if (enemies.length > 0) {
            this.blackboard.set(this.name, enemies);
            this.succeed();
        } else {
            this.fail();
        }
            
    };
    
    EnemyIsWeaker.prototype.reset = function() {
        this.start();
    };

    return EnemyIsWeaker;
});