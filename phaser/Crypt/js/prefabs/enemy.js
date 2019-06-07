'use strict'
//Main Enemy prefab, extendable class that allows us to quickly make new enemies. Limited by art tho.
var Enemy = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);
	this.smoothed = false;
	//Arcade Physics
	game.physics.arcade.enableBody(this);
	this.anchor.setTo(0.5);
	this.body.gravity.y = 900;
	this.body.collideWorldBounds = true;
	this.enemySpeed = 100;
	this.maxHealth = 50 +(35 *(gameData.room)); //Should be upgraded each map, percentage can be done with * 1.05 for 5% etc. gamedata.room + 1
	this.setHealth(this.maxHealth);
	this.chaseRange = 60;
	this.playerDamage = 10 + (15 * (gameData.room));	
	this.dropChance = game.rnd.frac(0,1);//Enemies have a chance to drop items.


	
	//State machine design inspired by Wolfenstein 3d. very cool.
	//Enemy States
	//Enemy states include: Standing, Attack, Path, Pain, Shoot, Chase, Die, Special.
	//Not all need to be implemented here, can be implemented in individual enemy prefabs.
	//can possibly replace path with a waypoint system
	
	this.stateMachine = new StateMachine('patrol', {
		
		patrol: new PatrolState(),
		chase: new ChaseState(),
		attack: new AttackState(),
		pain: new PainState(),
		
	}, [game, this ]);

	//ANIMATIONS
	this.animations.add('left', Phaser.Animation.generateFrameNames('left', 1, 3), 5, true);
	this.animations.add('right', Phaser.Animation.generateFrameNames('right', 1, 3), 5, true);

	


	game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function()
{
	this.stateMachine.step();//Goto statemachine state.
}

Enemy.prototype.patrol = function(enemy, waypoint) 
{
	//Navigation waypoints are used to allow enemies to detect where on the platforms they are, and what to do.
	if(waypoint.effect == "reverse")
	{
		if(enemy.body.touching.left)
		{
			enemy.animations.play('right');
			enemy.enemySpeed *= -1;
		}
		else if(enemy.body.touching.right)
		{
			enemy.animations.play('left');
			enemy.enemySpeed *= -1;
		}
		
	}
}
	

class PatrolState extends State
{
	enter(scene, enemy)
	{
		//Not perfect, enemies still moonwalk every once in a while. *shrug*
		enemy.animations.play('right');
		if(enemy.body.velocity.x > 0){
			enemy.animations.play('right');
		}
		else if(enemy.body.velocity.x < 0)
		{
			enemy.animations.play('left');
		}
	}

	execute(scene, enemy)
	{
		//Conditions to switch states	
		if(game.physics.arcade.distanceBetween(enemy, _player) < enemy.chaseRange && enemy.bottom == _player.bottom)
		{
			enemy.stateMachine.transition('chase');
		}
		

		game.physics.arcade.collide(enemy, reverseWaypoints, enemy.patrol);
		enemy.body.velocity.x = enemy.enemySpeed;
	}
}

Enemy.prototype.turn = function(enemy) // when Called, turns enemy towards player
{
	if(_player.x < enemy.x)
	{
		enemy.animations.play('left');
	}
	else if(_player.x > enemy.x)
	{
		enemy.animations.play('right');
	}
}

class PainState extends State{ 
	enter(game, enemy)
	{
		//Flash enemies red, and stun them
		enemy.tint = Phaser.Color.RED;
		enemy.body.velocity.x = 0;
		enemy.turn(enemy);
		
	}

	execute(game, enemy)
	{
		//Timer until the red tint is reset and state transition.
		game.time.events.add(500, function(){
			enemy.tint = Phaser.Color.WHITE;
			enemy.stateMachine.transition('chase');
		});
		
	}
}


Enemy.prototype.chase = function(enemy)
{
	//Check enemy position and velocity, then invert it towards player
	if(_player.x < enemy.x && enemy.body.velocity.x >= 0)
	{
		this.animations.play('right');
		enemy.enemySpeed *= -1;
	}
	else if(_player.x > enemy.x && enemy.body.velocity.x <=0)
	{
		this.animations.play('left');
		enemy.enemySpeed *=-1;
	}
}

class ChaseState extends State {
	enter(game, enemy)
	{
		
	}

	execute(game, enemy)
	{	//When triggered activates this.chase which chases player until they leave the chase range
		if(game.physics.arcade.distanceBetween(enemy, _player) > enemy.chaseRange)
		{
			enemy.stateMachine.transition('patrol');
		}

		game.physics.arcade.collide(enemy, _player, function(enemy){ //If close enough, attack
			enemy.stateMachine.transition('attack');
		});
		
		enemy.chase(enemy);
		enemy.body.velocity.x = enemy.enemySpeed;

	}
}


class AttackState extends State {
	enter(game, enemy)
	{
		enemy.turn(enemy); //turn towards player.
	}

	execute(game, enemy)
	{
		//sets the speed to 0, if colliding deals damage to player.
		enemy.body.velocity.x = 0;
		//Attack
		_player.damage(enemy.playerDamage);
		gameData.player.health = _player.health;
		//console.log(enemy.playerDamage);
		if(enemy.enemySpeed > 0) //Direction to launch player
		{
			_player.pain(-1);

		}
		else if(enemy.enemySpeed < 0)
		{
			_player.pain(1);
		}
		enemy.stateMachine.transition('patrol');
	}
}

//knockback Enemy, called for sword attacks


Enemy.prototype.kill = function() //we have the ability to override base functions, add animations and sounds for death here.
{
	
	//Particle Colors
	this.particleBit = game.add.bitmapData(8,8);
	this.particleBit.ctx.beginPath();
	this.particleBit.ctx.rect(0,0, this.particleBit.width, this.particleBit.height);
	this.particleBit.ctx.fillStyle = '#FF0000';
	this.particleBit.ctx.fill();
	game.cache.addBitmapData('particle', this.particleBit);

	//DEATH EMITTER
	this.emitter = game.add.emitter(this.x, this.y, 20);
	this.emitter.makeParticles(game.cache.getBitmapData('particle'));
	this.emitter.gravity = 400;
	
	
	this.emitter.explode();

	this.alive = false;
    this.exists = false;
    this.visible = false;
    console.log(this.dropChance);
    

    if(this.dropChance <= 0.40)
    {
		//spawn a random upgrade
		//currently 6 upgrades
		var randomUp = game.rnd.integerInRange(1,6);

		if(randomUp == 1) var Up = new Upgrade(game, 		this.x, this.y, 'items','atkSpeedUp');
		if(randomUp == 2) var Up = new ShotUpgrade(game, 	this.x, this.y, 'items', 'shotPower');
		if(randomUp == 3) var Up = new JumpUpgrade(game, 	this.x, this.y, 'items','extraJump');
		if(randomUp == 4) var Up = new FireRate(game, 		this.x, this.y, 'items','bulletspeed');
		if(randomUp == 5) var Up = new MaxHealth(game,		this.x, this.y, 'items', 'maxhealth');
		if(randomUp == 6) var Up = new Heal(game, 			this.x, this.y,	'items','heal');


		upgrades.add(Up);
    }

    if (this.events)
    {
        this.events.onKilled$dispatch(this);
    }


    return this;
}