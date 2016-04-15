define(['phaser', 'config'], function(Phaser, Config) {
    'use strict';
    function Behavior(game) {
        this.game = game;
        this.parameters = {};
    }

    Behavior.prototype.constructor = Behavior;
    
    Behavior.prototype.start = function() {
        console.log('Starting routine');
        this.state = 'Running';
    }
    
    Behavior.prototype.act = function(creature) {
        
    }
    
    Behavior.prototype.reset = function() {
        
    }

    Behavior.prototype.succeed = function() {
        console.log('Behavior success');
        this.state = 'Success';
    }

    Behavior.prototype.fail = function() {
        console.log('Behavior fail');
        this.state = 'Failure';
    }

     Behavior.prototype.isSuccess = function() {
        return this.state === 'Success';
    }

     Behavior.prototype.isFailure = function() {
        return this.state === 'Failure';
    }

     Behavior.prototype.isRunning = function() {
        console.log('isRunning:', this.state);
        return this.state === 'Running';
    }

     Behavior.prototype.getState = function() {
        return this.state;
    }

    return Behavior;
});