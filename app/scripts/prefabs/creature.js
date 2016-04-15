define(['phaser', 'config'], function(Phaser, Config) {
    'use strict';
    var behavior;
    function Creature(game, x, y, imageRef) {
        Phaser.Sprite.call(this, game, x, y, imageRef);
        // this.anchor.setTo(0.5, 0.5);
        this.HUNGER = 80;
    }

    Creature.prototype = Object.create(Phaser.Sprite.prototype);
    Creature.prototype.constructor = Creature;
    
    Creature.WIDTH = 32;
    Creature.HEIGHT = 29;
    Creature.MOVE_DURATION = 150;
    Creature.SPEED = 1;
    Creature.DISTANCE_COVERED = Creature.SPEED * Config.options.tileSize;
    Creature.MAX_HUNGER = 100;
    Creature.HUNGER_RATE = 1;
    
    Creature.prototype.getX = function() {
        return this.x;
    }
    
    Creature.prototype.getY = function() {
        return this.y;
    }
    
    //creature movement
    Creature.prototype.move = function(direction) {
        this.getHungry();
        // this.animations.play(direction);
        switch(direction) {
            case 'North':
                this.y += Creature.DISTANCE_COVERED;
                break;
            case 'South':
                this.y -= Creature.DISTANCE_COVERED;
                break;
            case 'East':
                this.x += Creature.DISTANCE_COVERED;
                break;
            case 'West':
                this.x -= Creature.DISTANCE_COVERED;
                break;
            default:
                break;
        }
    };

    Creature.prototype.getHungry = function() {
        this.HUNGER = this.HUNGER - Creature.HUNGER_RATE;
        if (this.HUNGER === 0) {
            console.log('Creature dies');
            this.die();
        } else if (this.HUNGER < 10) {
            console.log('Starving to death');
        } else if (this.HUNGER < 20) {
            console.log('Near starving');
        } else if (this.HUNGER < 50) {
            console.log('Getting hungry...');
        }
    }
    
    Creature.prototype.isAlive = function() {
        return true;
    }
    
    Creature.prototype.die = function() {
        this.destroy();
    }
    
    Creature.prototype.setBehavior = function(behavior) {
        this.behavior = behavior;
    }
    
    Creature.prototype.update = function() {
        if (this.behavior.isSuccess()) {
            return;
        }
        if (this.behavior && this.behavior.getState() == null) {
            console.log('Starting behavior');
            // hasn't started yet so we start it
            this.behavior.start();
        }

        this.behavior.act(this);
    }
    
    return Creature;
});