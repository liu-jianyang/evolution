'use strict';

define(['phaser', 'config'], function(Phaser, Config) {
    function Preload() {}
    
    Preload.prototype = {
        preload: function() {
            console.log('Preloading...');
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setScreenSize(true);
            
            // var paths = Config.options.paths;
            
            //TODO: show loading screen
            
            
            //load game assets
            this.load.tilemap('level', '/app/data/images/sprites/rpg.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', '/app/data/images/sprites/tileset.png');

            this.load.image('elephant', '/app/data/images/sprites/elephant/elephant.png');
            this.load.image('deadelephant', '/app/data/images/sprites/elephant/elephant_demonic.png');
            
            this.load.image('hydra1', '/app/data/images/sprites/hydra/hydra1.png');
            this.load.image('hydra2', '/app/data/images/sprites/hydra/hydra2.png');
            this.load.image('hydra3', '/app/data/images/sprites/hydra/hydra3.png');
            this.load.image('hydra4', '/app/data/images/sprites/hydra/hydra4.png');
            this.load.image('hydra5', '/app/data/images/sprites/hydra/hydra5.png');
            this.load.image('deadhydra1', '/app/data/images/sprites/hydra/skeleton_hydra1.png');
            this.load.image('deadhydra2', '/app/data/images/sprites/hydra/skeleton_hydra2.png');
            this.load.image('deadhydra3', '/app/data/images/sprites/hydra/skeleton_hydra3.png');
            this.load.image('deadhydra4', '/app/data/images/sprites/hydra/skeleton_hydra4.png');
            this.load.image('deadhydra5', '/app/data/images/sprites/hydra/skeleton_hydra5.png');
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
