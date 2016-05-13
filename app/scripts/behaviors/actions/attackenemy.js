define(['phaser',
        'behaviors/core/behavior',
        'behaviors/actions/moveto',
        'config'], function(Phaser, Behavior, MoveTo, Config) {
    'use strict';

    function AttackEnemy(game, blackboard, params) {
        Behavior.call(this, game);
        this.game = game;
        this.blackboard = blackboard;
        this.params = params;
    }

    Config.inheritPrototype(AttackEnemy, Behavior);

    AttackEnemy.prototype.constructor = AttackEnemy;
    AttackEnemy.prototype.parent = Behavior.prototype;
    
    AttackEnemy.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        var closestEnemy = this.blackboard.get(this.params)[0];
        console.log(creature.attack);
        if (creature.withinRange(closestEnemy)) {
            creature.harm(closestEnemy);
            console.log('closestEnemy:', closestEnemy);
            this.succeed();
        } else {
            var dest = {x: closestEnemy.getX(), y: closestEnemy.getY()}
            var moveTo = new MoveTo(this.game, this.blackboard, dest);
            moveTo.start();
            moveTo.act(creature);
            if (moveTo.isFailure()) {
                this.fail();
            }
        }
    };
    
    AttackEnemy.prototype.reset = function() {
        this.start();
    };

    return AttackEnemy;
});