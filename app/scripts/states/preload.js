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
            this.load.image('dialogWindow', '/app/data/images/sprites/Menu_2.png');
            
            //stat bars
            this.load.image('healthBar', '/app/data/images/sprites/blood_red_bar.png');
            
            //mods
            this.load.image('buff', '/app/data/images/sprites/mods/buff.png');
            this.load.image('debuff', '/app/data/images/sprites/mods/debuff.png');
            this.load.image('confuse', '/app/data/images/sprites/mods/confuse.png');
            this.load.image('invisibility', '/app/data/images/sprites/mods/invisibility.png');
            this.load.image('levitation', '/app/data/images/sprites/mods/levitation.png');
            this.load.image('repelMissiles', '/app/data/images/sprites/mods/repel_missiles.png');
            this.load.image('silence', '/app/data/images/sprites/mods/silence.png');
            this.load.image('slow', '/app/data/images/sprites/mods/slow.png');
            this.load.image('statueForm', '/app/data/images/sprites/mods/statue_form.png');
            this.load.image('stoneskin', '/app/data/images/sprites/mods/stoneskin.png');
            this.load.image('swiftness', '/app/data/images/sprites/mods/swiftness.png');
            this.load.image('haste', '/app/data/images/sprites/mods/haste.png');

            //elephant
            this.load.image('elephant', '/app/data/images/sprites/elephant/elephant.png');
            this.load.image('deadelephant', '/app/data/images/sprites/elephant/elephant_demonic.png');
            
            //hydra
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
