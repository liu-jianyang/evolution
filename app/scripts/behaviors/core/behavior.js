define(['phaser', 'config'], function(Phaser, Config) {
    'use strict';
    var self;
    function Behavior(game) {
        this.game = game;
        this.parameters = {};
        self = this;
    }

    Behavior.prototype.constructor = Behavior;
    
    Behavior.prototype.start = function() {
        console.log('Starting routine:', this.constructor.name);
        this.state = 'Running';
    };

    Behavior.prototype.succeed = function() {
        console.log('Routine %s succeeded', this.constructor.name);
        this.state = 'Success';
    };

    Behavior.prototype.fail = function() {
        console.log('Routine %s failed', this.constructor.name);
        this.state = 'Failure';
    };

    Behavior.prototype.isSuccess = function() {
        return this.state === 'Success';
    };

    Behavior.prototype.isFailure = function() {
        return this.state === 'Failure';
    };

    Behavior.prototype.isRunning = function() {
        return this.state === 'Running';
    };

    Behavior.prototype.getState = function() {
        return this.state;
    };
    
    Behavior.prototype.setReturnElements = function(params) {
        this.parameters.values = params;
    };
    
    Behavior.prototype.clearReturnElements = function() {
        this.parameters = {};
    };
    
    Behavior.prototype.setParent = function(node) {
        this.parentNode = node;
    };
    
    Behavior.prototype.getParent = function() {
        return this.parentNode;
    };
    
    Behavior.prototype.addChild = function(node) {
        if (!this.childNodes) {
            this.childNodes = [];
        }
        this.childNodes.push(node);
    };
    
    Behavior.prototype.getChildren = function() {
        return this.childNodes;
    };

    return Behavior;
});