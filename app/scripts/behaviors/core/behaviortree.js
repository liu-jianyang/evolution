define(['behaviors/actions/moveto',
        'behaviors/actions/search',
        'behaviors/actions/wander',
        'behaviors/composites/selector',
        'behaviors/composites/sequence',
        'behaviors/core/condition'], function(MoveTo, Search, Wander, Selector, Sequence, Condition) {
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
        this.root = returnConstructedBehavior(data.root.name, data.root.params);
        helper(this.root, data.children);
    }
    
    function helper(parent, children) {
        _.each(children, function(node) {
            var child = returnConstructedBehavior(node.name, node.params);
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
            case 'Condition':
                return new Condition(game, blackboard, params);
            default:
                break;
            
        }
    }
    
    return BehaviorTree;
})