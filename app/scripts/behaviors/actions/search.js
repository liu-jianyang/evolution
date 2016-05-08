/*global _*/

define(['phaser', 'behaviors/core/behavior', 'behaviors/core/behaviortree', 'config'], function(Phaser, Behavior, BehaviorTree, Config) {
    'use strict';

    function Search(game, blackboard, params) {
        //type tile, element grass?
        Behavior.call(this, game);
        this.blackboard = blackboard || {};
        this.type = params.type;
        this.element = params.element;
    }

    Config.inheritPrototype(Search, Behavior);

    Search.prototype.constructor = Search;
    Search.prototype.parent = Behavior.prototype;
    
    Search.prototype.act = function(creature) {
        if (!this.isRunning()) {
            return;
        }
        // if (!creature.canSearch()) {
        //     this.fail();
        //     return;
        // }
        if (this.type === 'tile') {
            var map = this.game.map;
            var element = this.element;
            //search through map for element
            //map reduce
            var locations = _.filter(_.values(map.tiles), function(tileArr){
                var x = tileArr[0] / Config.options.tileSize;
                var y = tileArr[1] / Config.options.tileSize;
                var size = Config.getRelativeGameSize();
                //no point in checking if tile location is somewhere no one sees
                if (x < size.x && y < size.y) {
                    var tile = map.getTile(x, y);
                    if (tile.properties.type === element) {
                        return tileArr;
                    }
                }
            });
            if (locations.length > 0) {
                this.blackboard.searchLocations = locations;
                this.succeed();
            } else {
                this.fail();
            }
        } else {
            throw new Error ('Nothing else has been defined yet'); //TODO
        }
    };
    
    Search.prototype.reset = function() {
        this.start();
    };

    return Search;
});