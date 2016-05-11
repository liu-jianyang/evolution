define(['phaser',
        'behaviors/core/behavior',
        'behaviors/core/behaviortree',
        'config'], function(Phaser, Behavior, BehaviorTree, Config) {
    'use strict';

    function AttackEnemy(game, blackboard) {
        Behavior.call(this, game);
        this.blackboard = blackboard;
    }

    Config.inheritPrototype(AttackEnemy, Behavior);

    AttackEnemy.prototype.constructor = AttackEnemy;
    AttackEnemy.prototype.parent = Behavior.prototype;
    
    AttackEnemy.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        var closestEnemy = this.blackboard.get('EnemyInRange')[0];
        if (creature.attack(closestEnemy)) {
            this.succeed();
        } else {
            this.fail();
        }
    };
    
    AttackEnemy.prototype.reset = function() {
        this.start();
    };

    return AttackEnemy;
});