define(['phaser', 'behaviors/behavior', 'config'], function(Phaser, Behavior, Config) {
    'use strict';
    var self, type, element;
    var _ = require('underscore');
    function Search(game, params) {
        //type tile, element grass?
        Behavior.call(this, game);
        type = params.type;
        element = params.element;
        self = this;
    }

    Config.inheritPrototype(Search, Behavior);

    Search.prototype.constructor = Search;
    Search.prototype.parent = Behavior.prototype;
    
    Search.prototype.act = function(creature) {
        if (self.isRunning()) {
            if (!creature.isAlive()) {
                self.fail();
                return;
            }
            if (type === 'tile') {
                //search through map for element
                //map reduce
                console.log(self.game.map);
            }
        }
    }
    
    Search.prototype.reset = function() {
        self.start();
    }

    return Search;
});