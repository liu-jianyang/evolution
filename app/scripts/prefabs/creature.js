define(['phaser', 
        'config',
        ], function(Phaser, 
                    Config) {
    'use strict';
    
    function Creature(game, x, y, imageRef, deadRef) {
        var trueX = x * Config.options.tileSize;
        var trueY = y * Config.options.tileSize;
        this.sprite = Phaser.Sprite.call(this, game, trueX, trueY, imageRef);
        // this.anchor.setTo(0.5, 0.5);
        this.deadRef = deadRef;
        this.notifyHunger = [false, false, false];
    }

    Creature.prototype = Object.create(Phaser.Sprite.prototype);
    Creature.prototype.constructor = Creature;
    
    Creature.WIDTH = 32;
    Creature.HEIGHT = 29;
    Creature.MOVE_DURATION = 150;
    Creature.MAX_HUNGER = 100;
    Creature.DEFAULT_SPEED = 1;
    Creature.DEFAULT_HUNGER_RATE = -1;
    Creature.DEFAULT_VISION_RANGE = 10;
    
    Creature.prototype.setHunger = function(hunger) {
        this.hunger = hunger;
    };
    
    Creature.prototype.getHunger = function() {
        return this.hunger;
    };

    Creature.prototype.changeHunger = function(num) {
        this.hunger += num;
    };

    Creature.prototype.setHungerRate = function(rate) {
        this.hungerRate = rate;
    };
    
    Creature.prototype.getHungerRate = function() {
        return this.hungerRate || Creature.DEFAULT_HUNGER_RATE;
    };
    
    Creature.prototype.setSpeed = function(rate) {
        this.speed = rate;
    };
    
    Creature.prototype.getSpeed = function() {
        return this.speed || Creature.DEFAULT_SPEED;
    };

    Creature.prototype.setX = function(position) {
        this.x = this.x * Config.options.tileSize;
    };
    
    Creature.prototype.getX = function() {
        return this.x / Config.options.tileSize;
    };
    
    Creature.prototype.setY = function(position) {
        this.y = this.y * Config.options.tileSize;
    };
    
    Creature.prototype.getY = function() {
        return this.y / Config.options.tileSize;
    };
    
    Creature.prototype.getFoodOptions = function() {
        return this.foodTypes;
    };
    
    Creature.prototype.setFoodOptions = function(food) {
        if (!this.foodTypes) {
            this.foodTypes = [];
        }
        if (typeof(food) === 'string') {
            this.foodTypes.push(food);
        } else {
            this.foodTypes.concat(food);
        }
    };
    
    Creature.prototype.setVisionRange = function(range) {
        this.visionRange = range;
    };
    
    Creature.prototype.getVisionRange = function() {
        return this.visionRange || Creature.DEFAULT_VISION_RANGE;
    };
    
    Creature.prototype.getPowerLevel = function() { //TODO
        return this.powerLevel || 1;
    };
    
    //creature movement
    Creature.prototype.move = function(direction) {
        var distanceCovered = this.getSpeed() * Config.options.tileSize;
        this.playAnimation(direction);
        switch(direction) {
            case 'North':
                this.y += distanceCovered;
                break;
            case 'South':
                this.y -= distanceCovered;
                break;
            case 'East':
                this.x += distanceCovered;
                break;
            case 'West':
                this.x -= distanceCovered;
                break;
            default:
                break;
        }
        this.getHungry();
    };
    
    Creature.prototype.playAnimation = function(direction) {
        //to be overridden
    };

    Creature.prototype.getHungry = function() {
        if (this.getHunger()) {
            this.changeHunger(this.getHungerRate());
            if (this.getHunger() === 0) {
                console.log('Creature dies');
                this.die();
            } else if (this.getHunger() < 10 && !this.notifyHunger[2]) {
                console.log('Starving to death');
                this.notifyHunger[2] = true;
            } else if (this.getHunger() < (this.minHungerLevel / 2) && !this.notifyHunger[1]) {
                console.log('Near starving');
                this.notifyHunger[1] = true;
            } else if (this.getHunger() < this.minHungerLevel && !this.notifyHunger[0]) {
                console.log('Getting hungry...');
                this.notifyHunger[0] = true;
            }
        }
    };
    
    Creature.prototype.withinRange = function(enemy) {
        return ((this.getX() === enemy.getX()) && (Phaser.Math.difference(this.getY(), enemy.getY()) === 1)) || 
               ((this.getY() === enemy.getY()) && (Phaser.Math.difference(this.getX(), enemy.getX()) === 1));
    }
    
    Creature.prototype.eat = function() {
        //to be overridden
    };
    
    Creature.prototype.isAlive = function() {
        return this.alive;
    };
    
    Creature.prototype.canMove = function() {
        return true; //TODO
    }
    
    Creature.prototype.canSearch = function() {
        return true; //TODO
    }
    
    Creature.prototype.die = function() {
        this.damage(this.health);
        this.loadTexture(this.deadRef);
        this.visible = true;
    };
    
    Creature.prototype.setBehavior = function(behavior) {
        this.behavior = behavior;
        //TODO: Timeout not working anymore for some reason
        this.timeoutBehavior = Config.doEveryTimeout(this.behavior.rand, 500, this);
    };
    
    Creature.prototype.update = function() {
        if (this.behavior) {
            if (this.behavior.getState() == null) {
                // hasn't started yet so we start it
                this.behavior.start();
            }
            this.behavior.act(this);
        }
    };
    
    return Creature;
});