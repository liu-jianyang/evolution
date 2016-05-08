define(['behaviors/actions/moveto',
        'behaviors/actions/search',
        'behaviors/actions/wander',
        'behaviors/actions/eat',
        'behaviors/composites/selector',
        'behaviors/composites/sequence',
        'behaviors/conditions/ishungry'], function(MoveTo, Search, Wander, Eat, Selector, Sequence, IsHungry) {
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
    function BehaviorTree(game, data) {
        this.game = game;
        this.blackboard = {};
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
            case 'Eat':
                return new Eat(game, blackboard);
            default:
                break;
            
        }
    }
    
    return BehaviorTree;
})