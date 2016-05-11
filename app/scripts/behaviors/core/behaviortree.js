/*global _*/

define(['behaviors/actions/moveto',
        'behaviors/actions/search',
        'behaviors/actions/wander',
        'behaviors/actions/eat',
        'behaviors/composites/selector',
        'behaviors/composites/sequence',
        'behaviors/conditions/ishungry',
        'behaviors/conditions/enemyinrange',
        'behaviors/decorators/repeat',
        'behaviors/core/blackboard'], function(MoveTo, Search, Wander, Eat, Selector, Sequence, IsHungry, EnemyInRange, Repeat, Blackboard) {
    'use strict';
    /*
    {
        root: {
            name:
            params:
        }
        children: []
    }
    */
    function BehaviorTree(game, data, blackboardData) {
        this.game = game;
        this.blackboard = setBlackboard(blackboardData);
        this.root = returnConstructedBehavior(data.root.name, data.root.params, this.game, this.blackboard);
        helper(this.root, data.children, this.game, this.blackboard);
    }
    
    function helper(parent, children, game, blackboard) {
        _.each(children, function(node) {
            var child = returnConstructedBehavior(node.name, node.params, game, blackboard);
            parent.addChild(child);
            child.setParent(parent);
            if (child.children && child.children.length > 0) {
                helper(child, child.children);
            } 
        });
    }
    
    function setBlackboard(data) {
        var blackboard = new Blackboard();
        _.each(data, function(v, k) {
            blackboard.set(k, v);
        });
        return blackboard;
    }

    BehaviorTree.prototype.constructor = BehaviorTree;
    
    BehaviorTree.prototype.getRoot = function() {
        return this.root;
    };
    
    function returnConstructedBehavior(name, params, game, blackboard) {
        switch(name) {
            case 'MoveTo':
                return new MoveTo(game, blackboard, params);
            case 'Search':
                return new Search(game, blackboard, params);
            case 'Wander':
                return new Wander(game, blackboard);
            case 'Selector':
                return new Selector(game, blackboard);
            case 'Sequence':
                return new Sequence(game, blackboard);
            case 'IsHungry':
                return new IsHungry(game, blackboard, params);
            case 'EnemyInRange':
                return new EnemyInRange(game, blackboard, params);
            case 'Eat':
                return new Eat(game, blackboard);
            case 'Repeat':
                return new Repeat(game, blackboard, params);
            default:
                break;
            
        }
    }
    
    return BehaviorTree;
})