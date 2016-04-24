define(['phaser', 
        'config',
        ], function(Phaser, 
                    Config,
                    Move,
                    Wander) {
    'use strict';
    
    function Creature(game, x, y, imageRef, deadRef) {
        this.sprite = Phaser.Sprite.call(this, game, x, y, imageRef);
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
    
    Creature.prototype.setHunger = function(hunger) {
        Creature.HUNGER = hunger;
    }
    
    Creature.prototype.getHunger = function() {
        return Creature.HUNGER;
    }
    
    Creature.prototype.changeHunger = function(num) {
        Creature.HUNGER += num;
    }

    Creature.prototype.setHungerRate = function(rate) {
        Creature.HUNGER_RATE = rate;
    }
    
    Creature.prototype.getHungerRate = function() {
        return Creature.HUNGER_RATE || Creature.DEFAULT_HUNGER_RATE;
    }
    
    Creature.prototype.setSpeed = function(rate) {
        Creature.SPEED = rate;
    }
    
    Creature.prototype.getSpeed = function() {
        return Creature.SPEED || Creature.DEFAULT_SPEED;
    }

    Creature.prototype.setX = function(position) {
        this.x = this.x * Config.options.tileSize;
    }
    
    Creature.prototype.getX = function() {
        return this.x / Config.options.tileSize;
    }
    
    Creature.prototype.setY = function(position) {
        this.y = this.y * Config.options.tileSize;
    }
    
    Creature.prototype.getY = function() {
        return this.y / Config.options.tileSize;
    }
    
    Creature.prototype.getFoodOptions = function() {
        return Creature.FOOD_TYPES;
    }
    
    Creature.prototype.setFoodOptions = function(food) {
        if (!Creature.FOOD_TYPES) {
            Creature.FOOD_TYPES = [];
        }
        if (typeof(food) === 'string') {
            Creature.FOOD_TYPES.push(food);
        } else {
            Creature.FOOD_TYPES.concat(food);
        }
    }
    
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
    }

    Creature.prototype.getHungry = function() {
        if (this.getHunger()) {
            this.changeHunger(this.getHungerRate());
            if (this.getHunger() === 0) {
                console.log('Creature dies');
                this.die();
            } else if (this.getHunger() < 10 && !this.notifyHunger[2]) {
                console.log('Starving to death');
                this.notifyHunger[2] = true;
            } else if (this.getHunger() < 20 && !this.notifyHunger[1]) {
                console.log('Near starving');
                this.notifyHunger[1] = true;
            } else if (this.getHunger() < 50 && !this.notifyHunger[0]) {
                console.log('Getting hungry...');
                this.notifyHunger[0] = true;
            }
        }
        
    }
    
    Creature.prototype.eat = function() {
        //to be overridden
    }
    
    Creature.prototype.isAlive = function() {
        return this.alive;
    }
    
    Creature.prototype.die = function() {
        this.damage(this.health);
        this.loadTexture(this.deadRef);
        this.visible = true;
    }
    
    Creature.prototype.setBehavior = function(behavior) {
        this.behavior = behavior;
        this.timeoutBehavior = doEveryTimeout(this.behavior.act, 1000, this);
    }
    
    Creature.prototype.update = function() {
        if (this.alive) {
            if (this.behavior) {
                if (this.behavior.getState() == null) {
                    // hasn't started yet so we start it
                    this.behavior.start();
                }
                this.timeoutBehavior();
            }
        };
        
    }
    
    var doEveryTimeout = function(fction, timeout, params) {
        var variable;
        return function() {
            if (!variable) {
                fction(params);
                variable = setTimeout(function() {
                    variable = undefined;
                }, timeout);
            }
        }
    }
    
    return Creature;
});