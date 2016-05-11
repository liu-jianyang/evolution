/*global _*/

define(['phaser', 'behaviors/actions/search', 'behaviors/core/behavior', 'config'], function(Phaser, Search, Behavior, Config) {
    'use strict';
    function EnemyIsWeaker(game, blackboard, params) {
        Behavior.call(this, game);
        this.game = game;
        this.blackboard = blackboard;
        this.name = 'EnemyIsWeaker';
    }

    Config.inheritPrototype(EnemyIsWeaker, Behavior);

    EnemyIsWeaker.prototype.constructor = EnemyIsWeaker;
    EnemyIsWeaker.prototype.parent = Behavior.prototype;
    
    EnemyIsWeaker.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        var enemy = this.blackboard.get('TargetEnemy');
        if (creature.getPowerLevel() > enemy.getPowerLevel()) {
            this.succeed();
        } else if (this.search.isFailure()) {
            this.fail();
        }
    };
    
    EnemyIsWeaker.prototype.reset = function() {
        this.start();
    };

    return EnemyIsWeaker;
});