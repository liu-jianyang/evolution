/*global _*/

define(['phaser', 'behaviors/actions/search', 'behaviors/core/behavior', 'config'], function(Phaser, Search, Behavior, Config) {
    'use strict';
    function EnemyVisible(game, blackboard) {
        Behavior.call(this, game);
        this.game = game;
        this.blackboard = blackboard;
        this.name = 'EnemyVisible';
    }

    Config.inheritPrototype(EnemyVisible, Behavior);

    EnemyVisible.prototype.constructor = EnemyVisible;
    EnemyVisible.prototype.parent = Behavior.prototype;
    
    EnemyVisible.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        
        var enemiesWithinRange = [];
        _.each(this.game.creatures, function(enemy) {
            if (creature.getX !== enemy.getX() && 
                creature.getY !== enemy.getY() && 
                Phaser.Math.difference(creature.getX(), creature.getY(), enemy.getX(), enemy.getY()) <= creature.getVisionRange()) {
                enemiesWithinRange.push(enemy);
            }
        });
        if (enemiesWithinRange.length > 0) {
            this.blackboard.set(this.name, _.sortBy(enemiesWithinRange, function(enemy) {
                return Phaser.Math.distance(creature.getX(), creature.getY(), enemy.getX(), enemy.getY());
            }));
            this.succeed();
        } else {
            this.fail();
        }
    };
    
    EnemyVisible.prototype.reset = function() {
        this.start();
    };

    return EnemyVisible;
});