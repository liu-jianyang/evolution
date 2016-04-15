'use strict';

define(['phaser', 'config'], function(Phaser, Config) {
    function Preload() {}
    
    Preload.prototype = {
        preload: function() {
            console.log('a');
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setScreenSize(true);
            
            // var paths = Config.options.paths;
            
            //TODO: show loading screen
            
            
            //load game assets
            this.load.tilemap('level', '/app/data/images/sprites/rpg.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', '/app/data/images/sprites/tileset.png');
            this.load.image('player', '/app/data/images/sprites/player.png');
            this.load.image('sheep', '/app/data/images/sprites/sheep front.png');
        },
        
        create: function() {
            this.game.state.start('level');
        },
        
        loadUpdate: function() {
            Config.options.onLoadUpdate.call(Config, this.load.progress);
        },
        
        shutdown: function() {
            Config.options.onLoadComplete.call(Config);
        }
    };
    
    return Preload;
});
