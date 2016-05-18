define(['phaser', 
        'config',
        'behaviors/core/behaviortree'
        ], function(Phaser, Config, BehaviorTree) {
    'use strict';
    
    function Creature(game, x, y, imageRef, deadRef) {
        this.game = game;
        var trueX = x * Config.options.tileSize;
        var trueY = y * Config.options.tileSize;
        this.sprite = Phaser.Sprite.call(this, game, trueX, trueY, imageRef);
        
        // this.anchor.setTo(0.5, 0.5);
        this.deadRef = deadRef;
        this.maxHungerLevel = 100;
        this.minHungerLevel = this.maxHungerLevel / 2;
        this.notifyHunger = [false, false, false];
    }

    Creature.prototype = Object.create(Phaser.Sprite.prototype);
    Creature.prototype.constructor = Creature;
    
    Creature.WIDTH = 32;
    Creature.HEIGHT = 29;
    Creature.MOVE_DURATION = 150;
    Creature.DEFAULT_SPEED = 1;
    Creature.DEFAULT_HUNGER_RATE = -1;
    Creature.DEFAULT_VISION_RANGE = 10;
    
    Creature.prototype.setName = function(name) {
        this.name = name;
    };
    
    Creature.prototype.getName = function() {
        return this.name;
    }
    
    Creature.prototype.setHealth = function(health) {
        this.maxHealth = health;
        this.health = health;
    };
    
    Creature.prototype.setAttack = function(attack) {
        this.attack = attack;
    };
    
    Creature.prototype.setDefense = function(defense) {
        this.defense = defense;
    };
    
    Creature.prototype.changeHealth = function(amount) {
        this.health = Phaser.Math.min(this.maxHealth, this.health + amount);
        if (this.health <= 0) {
            this.die();
        }
    };
    
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
    };
    
    Creature.prototype.harm = function(enemy) {
        var damage = (this.attack || 1) - (enemy.defense || 1);
        enemy.changeHealth(-Phaser.Math.max(damage, 1));  
    };
    
    Creature.prototype.eat = function() {
        //to be overridden
    };
    
    Creature.prototype.isAlive = function() {
        return this.health > 0;
    };
    
    Creature.prototype.canMove = function() {
        return true; //TODO
    };
    
    Creature.prototype.canSearch = function() {
        return true; //TODO
    };
    
    Creature.prototype.die = function() {
        this.loadTexture(this.deadRef);
        this.visible = true;
    };
    
    Creature.prototype.setBehavior = function(behavior) {
        this.behavior = behavior;
    };
    
    Creature.prototype.update = function() {
        if (this.behavior) {
            if (this.behavior.getState() == null) {
                // hasn't started yet so we start it
                this.behavior.start();
            }
            this.behavior.act(this);
        } else {
            var bt = new BehaviorTree(this.game, {
                root: {
                    name: 'Repeat',
                    type: 'decorator'
                },
                children: [
                    {
                        name: 'Selector',
                        type: 'composite',
                        children: [
                            {
                                name: 'Sequence',
                                type: 'composite',
                                children: [
                                    {
                                        name: 'EnemyVisible',
                                        type: 'condition'
                                    },
                                    {
                                        name: 'AttackEnemy',
                                        params: 'EnemyVisible',
                                        type: 'action'
                                    }
                                ]
                            },
                            {
                                name: 'Sequence',
                                type: 'composite',
                                children: [
                                    {
                                        name: 'IsHungry',
                                        type: 'Condition'
                                    },
                                    {
                                        name: 'Search',
                                        type: 'action',
                                        params: 'searchLocations'
                                    },
                                    {
                                        name: 'MoveTo',
                                        type: 'action',
                                        params: ['searchLocations', 0]
                                    }
                                ]
                            },
                            {
                                name: 'Wander',
                                type: 'action'
                            }
                        ]
                    }
                ]
            });
            this.setBehavior(bt.getRoot());
        }
    };
    
    return Creature;
});