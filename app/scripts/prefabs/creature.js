define(['phaser', 
        'config',
        'behaviors/nodes/move',
        'behaviors/nodes/wander'
        ], function(Phaser, 
                    Config,
                    Move,
                    Wander) {
    'use strict';
    var behavior;
    function Creature(game, x, y, imageRef, deadRef, map) {
        this.sprite = Phaser.Sprite.call(this, game, x, y, imageRef);
        // this.anchor.setTo(0.5, 0.5);
        this.HUNGER = 80;
        this.deadRef = deadRef;
        this.map = map;
        this.setBehavior(new Wander(this.game));
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
    Creature.FOOD_TYPES = ['grass'];

    
    Creature.prototype.getX = function() {
        return this.x;
    }
    
    Creature.prototype.getY = function() {
        return this.y;
    }
    
    Creature.prototype.getFoodOptions = function() {
        
    }
    
    //creature movement
    Creature.prototype.move = function(direction) {
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
        this.getHungry();
    };

    Creature.prototype.getHungry = function() {
        this.HUNGER = this.HUNGER - Creature.HUNGER_RATE;
        this.eat();
        if (this.HUNGER === 0) {
            console.log('Creature dies');
            this.die();
        } else if (this.HUNGER < 10) {
            console.log('Starving to death');
        } else if (this.HUNGER < 20) {
            console.log('Near starving');
        } else if (this.HUNGER < 50) {
            console.log('Getting hungry...');
            this.setBehavior(new Move(this.game, 3*32, 4*32));
        }
    }
    
    Creature.prototype.eat = function() {
        //if hungry and can eat tile or whatever's on tile, eat
        if (this.HUNGER < 50) {
            var tile = this.map.getTile(this.x / 32, this.y / 32);
            if (tile && tile.properties && tile.properties.type && Creature.FOOD_TYPES.indexOf(tile.properties.type) !== -1) {
                this.HUNGER += 20;
                console.log('Eat food');
            }
        }
    }
    
    Creature.prototype.isAlive = function() {
        return true;
    }
    
    Creature.prototype.die = function() {
        this.damage(this.health);
        this.loadTexture(this.deadRef);
        this.visible = true;
        this.behavior.succeed();
    }
    
    Creature.prototype.setBehavior = function(behavior) {
        this.behavior = behavior;
    }
    
    Creature.prototype.update = function() {
        if (this.alive) {
            // if (this.behavior.isSuccess()) {
            //     this.behavior.reset();
            // }
            if (this.behavior && this.behavior.getState() == null) {
                console.log('Starting behavior');
                // hasn't started yet so we start it
                this.behavior.start();
            }
    
            this.behavior.act(this);
        }
    }
    
    return Creature;
});