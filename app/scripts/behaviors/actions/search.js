/*global _*/

define(['phaser', 'behaviors/core/behavior', 'behaviors/core/behaviortree', 'config'], function(Phaser, Behavior, BehaviorTree, Config) {
    'use strict';

    function Search(game, blackboard, params) {
        //type tile, element grass?
        Behavior.call(this, game);
        this.game = game;
        this.blackboard = blackboard;
        this.params = params;
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
        var blackboard = this.blackboard;
        var searchOptions = blackboard.get('searchOptions');
        if (!searchOptions || searchOptions.length === 0) {
            this.fail();
            return;
        }
        var id = this.params;
        blackboard.set(id, []);
        var map = this.game.map;
        var type, element, locations = [];
        _.each(searchOptions, function(option) {
            type = option.type;
            if (type === 'tile') {
                element = option.element;
                //search through map for element
                //map reduce
                locations = locations.concat(_.filter(_.values(map.tiles), function(tileArr){
                    var x = tileArr[0] / Config.options.tileSize;
                    var y = tileArr[1] / Config.options.tileSize;
                    var size = Config.getRelativeGameSize();
                    //no point in checking if tile location is somewhere no one sees
                    if (x < size.x && y < size.y) {
                        return map.getTile(x, y).properties.type === element;
                    }
                }));
            } else {
                this.fail();
                throw new Error ('Nothing else has been defined yet'); //TODO
            }
        });
        
        if (locations.length > 0) {
            //convert to relative
            var arr = _.map(locations, function(loc) {
                return {x: loc[0] / Config.options.tileSize, y: loc[1] / Config.options.tileSize};
            });
            blackboard.set(id, arr);
            this.succeed();
        } else {
            this.fail();
        }
    };
    
    Search.prototype.reset = function() {
        this.start();
    };

    return Search;
});