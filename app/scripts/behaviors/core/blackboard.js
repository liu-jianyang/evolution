define([], function() {
    'use strict';
    function Blackboard() {
        this.blackboard = {};
    }

    Blackboard.prototype.constructor = Blackboard;
    
    Blackboard.prototype.set = function(key, value, nodeID) {
        if (nodeID) {
            if (!this.blackboard[nodeID]) {
                this.blackboard[nodeID] = {};
            }
            this.blackboard[nodeID][key] = value;
        } else {
            this.blackboard[key] = value;
        }
        
    };
    
    Blackboard.prototype.get = function(key, nodeID) {
        if (nodeID) {
            return this.blackboard[nodeID][key];
        }
        return this.blackboard[key];
    };
    
    return Blackboard;
})