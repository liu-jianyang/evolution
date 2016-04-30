/*global _*/

define(['phaser', 'behaviors/nodes/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self;
    function Repeat(game, behavior, numOfTimes) {
        Behavior.call(this, game);
        this.numOfTimes = numOfTimes ? numOfTimes : -1; //will never reach -1?
        this.numRepeated = 0;
        this.behavior = behavior;
        this.name = 'Repeat';
        self = this;
    }

    Config.inheritPrototype(Repeat, Behavior);

    Repeat.prototype.constructor = Repeat;
    Repeat.prototype.parent = Behavior.prototype;
    Repeat.prototype.start = function() {
        if (self.numOfTimes > 0) {
            self.parent.start();
            self.behavior.start();
            self.numRepeated++;
        }
    };
    
    
    Repeat.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive()) {
                self.fail();
                return;
            }
            
            self.behavior.act();
            
            if (!self.behavior.isRunning()) {
                if (self.numOfTimes === self.numRepeated) {
                    self.succeed();
                    return;
                }
                self.behavior.start();
                self.numRepeated++;
            }
        }
    };
    
    Repeat.prototype.reset = function() {
        self.numRepeated = 0;
        self.start();
    };

    return Repeat;
});