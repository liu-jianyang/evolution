/*global _*/

define(['phaser', 'behaviors/actions/search', 'behaviors/core/behavior', 'config'], function(Phaser, Search, Behavior, Config) {
    'use strict';
    function EnemyInRange(game, blackboard) {
        Behavior.call(this, game);
        this.name = 'EnemyInRange';
        this.game = game;
        this.blackboard = blackboard;
    }

    Config.inheritPrototype(EnemyInRange, Behavior);

    EnemyInRange.prototype.constructor = EnemyInRange;
    EnemyInRange.prototype.parent = Behavior.prototype;
    
    EnemyInRange.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        
        var enemiesWithinRange = [];
        _.each(this.game.creatures, function(enemy) {
            if (creature.getX !== enemy.getX() && creature.getY !== enemy.getY() && creature.withinRange(enemy)) {
                enemiesWithinRange.push(enemy);
            }
        });
        if (enemiesWithinRange.length > 0) {
            this.blackboard.set(this.name, _.sortBy(enemiesWithinRange, function(enemy) {
                return Phaser.Math.distance(creature.getX(), creature.getY(), enemy.getX(), enemy.getY());
            }));
            console.log('enemyinrange', this.blackboard.get(this.name));
            this.succeed();
        } else {
            this.fail();
        }
    };
    
    EnemyInRange.prototype.reset = function() {
        this.start();
    };

    return EnemyInRange;
});