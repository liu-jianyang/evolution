define(['phaser', 
        'prefabs/creature',
        'behaviors/core/behaviortree', 
        'config'], function(Phaser, Creature, BehaviorTree, Config) {
    'use strict';

    function Elephant(game, x, y, map) {
        var imageRef = 'elephant';
        var deadRef = 'deadelephant';
        Creature.call(this, game, x, y, imageRef, deadRef);
        this.game = game;
        this.map = map;
        this.setName('Elephant');
        this.setHunger(80);
        this.setHealth(500);
        this.setAttack(50);
        this.setDefense(80);
        this.setHungerRate(-2);
        this.setFoodOptions({type: 'tile', element: 'grass'});
        this.setVisionRange(2);
        var bt = new BehaviorTree(game, {
            root: {
                name: 'UntilFail',
                type: 'decorator'
            },
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
                            name: 'UntilSucceed',
                            type: 'condition',
                            children: [
                                {
                                    name: 'AttackEnemy',
                                    params: 'EnemyVisible',
                                    type: 'action'
                                }
                            ]
                        }
                    ]
                }
                        
                
            ]
        })
        this.setBehavior(bt.getRoot());
    }

    Config.inheritPrototype(Elephant, Creature);

    Elephant.prototype.constructor = Elephant;
    Elephant.prototype.parent = Elephant.prototype;
    
    Elephant.prototype.playAnimation = function(direction) {
        // this.animations.play(direction);
    };
    
    // Elephant.prototype.withinRange = function(enemy) {
        
    // }
    
    Elephant.prototype.eat = function() {
        //if hungry and can eat tile or whatever's on tile, eat
        if (this.getHunger() < this.minHungerLevel) {
            var tile = this.map.getTile(this.getX(), this.getY());
            if (hasProperties(tile)) {
                var isTileFoodOption = _.find(this.foodOptions, function(option) {
                    return option.element === tile.properties.type;
                }) ? true : false;
                if (isTileFoodOption) {
                    this.changeHunger(20);
                    return true;
                }
            }
            
        }
        return false;
    };
    
    function hasProperties(tile) {
        return tile && tile.properties && tile.properties.type;
    }
    
    return Elephant;
});