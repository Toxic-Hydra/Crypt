'use strict'

var Enemy = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);
	//Arcade
	game.physics.arcade.enableBody(this);
	this.anchor.setTo(0.5);
	this.body.gravity.y = 900;
	this.body.collideWorldBounds = true;
	this.enemySpeed = 100;
	this.maxHealth = 100; //Should be upgraded each map, percentage can be done with * 1.05 for 5% etc.
	this.setHealth(100);
	this.chaseRange = 30;
	this.playerDamage = 10;	

	//Enemies should have a upgrade drop chance

	//Enemy States
	//Enemy states include: Standing, Attack, Path, Pain, Shoot, Chase, Die, Special.
	//possible cut: Standing, Path
	//can possibly replace path with a waypoint system
	
	this.stateMachine = new StateMachine('patrol', {
		//idle: new IdleState(),
		patrol: new PatrolState(),
		chase: new ChaseState(),
		attack: new AttackState(),
		pain: new PainState(),
		//die: new DieState(),
		//shooting: new ShootState(),
	}, [game, this ]);

	game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function()
{
	this.stateMachine.step();
}

Enemy.prototype.patrol = function(enemy, waypoint) //Pass in Platform group during collisions
{
	
	if(waypoint.effect == "reverse")
	{
		if(enemy.body.touching.left || enemy.body.touching.right)
		{
			enemy.enemySpeed *= -1;
		}
		
	}
}
	

class PatrolState extends State
{
	enter(scene, enemy)
	{
		//enemy.patrol();
		
	}

	execute(scene, enemy)
	{
		
		if(game.physics.arcade.distanceBetween(enemy, _player) < enemy.chaseRange && enemy.bottom == _player.bottom)
		{
			enemy.stateMachine.transition('chase');
		}
		

		game.physics.arcade.collide(enemy, reverseWaypoints, enemy.patrol);
		enemy.body.velocity.x = enemy.enemySpeed;
	}
}


class PainState extends State{  //Lets play with this state a bit more. needs some more work to make it look interesting.
	enter(game, enemy)
	{
		enemy.tint = Phaser.Color.RED;
		enemy.body.velocity.x = 0;
		//Experiment with tweening the character red for a longer looking pain state.
	}

	execute(game, enemy)
	{
		//can add timers here for a stun state or other such variables
		game.time.events.add(500, function(){
			enemy.tint = Phaser.Color.WHITE;
			enemy.stateMachine.transition('chase');
		});
		
	}
}


Enemy.prototype.chase = function(enemy)
{
	
	if(_player.x < enemy.x && enemy.body.velocity.x >= 0)
	{
		enemy.enemySpeed *= -1;
	}
	else if(_player.x > enemy.x && enemy.body.velocity.x <=0)
	{
		enemy.enemySpeed *=-1;
	}
}

class ChaseState extends State {
	enter(game, enemy)
	{
		//animations
	}

	execute(game, enemy)
	{
		if(game.physics.arcade.distanceBetween(enemy, _player) > enemy.chaseRange)
		{
			enemy.stateMachine.transition('patrol');
		}

		game.physics.arcade.collide(enemy, _player, function(enemy){
			enemy.stateMachine.transition('attack');
		});
		
		enemy.chase(enemy);
		enemy.body.velocity.x = enemy.enemySpeed;

	}
}


class AttackState extends State {
	enter(game, enemy)
	{
	
	}

	execute(game, enemy)
	{
		//sets the speed to 0, if colliding deals damage to player.
		enemy.body.velocity.x = 0;
		//Attack
		_player.damage(enemy.playerDamage);
		if(enemy.enemySpeed > 0)
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


/*Enemy.prototype.kill = function() //we have the ability to override base functions, add animations and sounds for death here.
{
  this.alive = false;
    this.exists = false;
    this.visible = false;

    if (this.events)
    {
        this.events.onKilled$dispatch(this);
    }

    return this;
}*/