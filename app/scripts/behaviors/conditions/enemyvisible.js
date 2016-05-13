/*global _*/

define(['phaser', 'behaviors/actions/search', 'behaviors/core/behavior', 'config'], function(Phaser, Search, Behavior, Config) {
    'use strict';
    function EnemyVisible(game, blackboard) {
        console.log(game);
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
            if ((!(creature.getX() === enemy.getX() && creature.getY() === enemy.getY())) && enemy.isAlive() &&
                Phaser.Math.distance(creature.getX(), creature.getY(), enemy.getX(), enemy.getY()) <= creature.getVisionRange()) {
                enemiesWithinRange.push(enemy);
            }
        });
        console.log('within range:', enemiesWithinRange);
        if (enemiesWithinRange.length > 0) {
            enemiesWithinRange = _.sortBy(enemiesWithinRange, function(enemy) {
                return Phaser.Math.distance(creature.getX(), creature.getY(), enemy.getX(), enemy.getY());
            });
            var enemyLocations = _.map(enemiesWithinRange, function(enemy) {
                return {x: enemy.getX(), y: enemy.getY()};
            });
            this.blackboard.set(this.name, enemiesWithinRange);
            this.blackboard.set('EnemyLocations', enemyLocations);
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