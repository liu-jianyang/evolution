'use strict';

define([], function() {
    function Config() {
        this.options = {
            env: 'development',
            parent: 'game-area',
            paths: {
                sprites: '/app/data/images/sprites',
                audio: '/app/data/audio/sprites'
            },
            sfxVolume: 1,
            musicVolume: 0.8,
            tileSize: 32,
            gameSpeed: 1, //max? Update per second
            gameSize: {x: 800, y: 600},
            onLoadUpdate: function() {
            },
            onLoadComplete: function() {
            }
        };
    }
    
    Config.prototype.getRelativeGameSize = function() {
        var x = this.options.gameSize.x / this.options.tileSize;
        var y = this.options.gameSize.y / this.options.tileSize;
        return {x: x, y: y};
    }
    
    Config.prototype.doEveryTimeout = function(fction, timeout, params) {
        var variable;
        return function() {
            if (!variable) {
                console.log('running function');
                fction(params);
                variable = setTimeout(function() {
                    variable = undefined;
                }, timeout);
            }
        }
    }

    Config.prototype.setMusicVolume = function(volume) {
        this.options.musicVolume = volume;
    };

    Config.prototype.setSfxVolume = function(volume) {
        this.options.sfxVolume = volume;
    };
    
    Config.prototype.inheritPrototype = function(childObject, parentObject) {
        // As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject
        // So the copyOfParent object now has everything the parentObject has 
        var copyOfParent = Object.create(parentObject.prototype);
    
        //Then we set the constructor of this new object to point to the childObject.
        // Why do we manually set the copyOfParent constructor here, see the explanation immediately following this code block.
        copyOfParent.constructor = childObject;
    
        // Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)
        childObject.prototype = copyOfParent;
    }
    
    return new Config();
});
