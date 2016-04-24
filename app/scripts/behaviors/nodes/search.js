define(['phaser', 'behaviors/behavior', 'underscore', 'config'], function(Phaser, Behavior, _, Config) {
    'use strict';
    var self, type, element;
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
                var map = self.game.map;
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
                    self.setReturnElements(locations);
                    self.succeed();
                } else {
                    self.fail();
                }
            } else {
                throw new Error ('Nothing else has been defined yet');
            }
        }
    }
    
    Search.prototype.reset = function() {
        self.start();
    }

    return Search;
});