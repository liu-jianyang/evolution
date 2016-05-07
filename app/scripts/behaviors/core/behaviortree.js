define(['behaviors/actions/moveto',
        'behaviors/actions/search',
        'behaviors/actions/wander',
        'behaviors/composites/selector',
        'behaviors/composites/sequence',
        'behaviors/core/condition'], function(MoveTo, Search, Wander, Selector, Sequence, Condition) {
    'use strict';
    var self = {};
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
        self.game = game;
        self.root = returnConstructedBehavior(data.root.name, data.root.params);
        helper(self.root, data.children);
    }
    
    function helper(parent, children) {
        console.log(parent, children);
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
        return self.root;
    };
    
    function returnConstructedBehavior(name, params) {
        switch(name) {
            case 'MoveTo':
                return new MoveTo(self.game, self.blackboard, params);
            case 'Search':
                return new Search(self.game, self.blackboard, params);
            case 'Wander':
                return new Wander(self.game, self.blackboard);
            case 'Selector':
                return new Selector(self.game, self.blackboard);
            case 'Sequence':
                return new Sequence(self.game, self.blackboard);
            case 'Condition':
                return new Condition(self.game, self.blackboard, params);
            default:
                break;
            
        }
    }
    
    return BehaviorTree;
})