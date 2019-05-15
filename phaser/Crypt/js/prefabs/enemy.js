'use strict'

var Enemy = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);
	//Arcade
	game.physics.arcade.enableBody(this);
	this.body.gravity.y = 900;
	this.body.collideWorldBounds = true;
	this.enemySpeed = 100;
	this.maxHealth = 100;
	this.setHealth(100);	

	//Enemy States
	//Enemy states include: Standing, Attack, Path, Pain, Shoot, Chase, Die, Special.
	//possible cut: Standing, Path
	//can possibly replace path with a waypoint system
	
	this.stateMachine = new StateMachine('patrol', {
		//idle: new IdleState(),
		patrol: new PatrolState(),
		chase: new ChaseState(),
		//attack: new AttackState(),
		//pain: new PainState(),
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

Enemy.prototype.standing = function()
{

}

Enemy.prototype.attack = function()
{

}

Enemy.prototype.patrol = function(enemy, waypoint) //Pass in Platform group during collisions
{
	//Counts every Tile as a platform. So currently does not work, need to rearrange it as a waypoint system instead.
	
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
		enemy.body.velocity.x = enemy.enemySpeed;
		if(game.physics.arcade.distanceBetween(enemy, _player) < 10 && enemy.bottom == _player.bottom)
		{
			enemy.stateMachine.transition('chase');
		}
		//console.log('patrol');
		game.physics.arcade.collide(enemy, reverseWaypoints, enemy.patrol);
	}
}

Enemy.prototype.pain = function()
{

}

Enemy.prototype.shoot = function()
{

}

Enemy.prototype.chase = function()
{
	
	if(_player.x < this.x && this.body.velocity.x >= 0)
	{
		this.body.velocity.x = -this.enemySpeed;
	}
	else if(_player.x > this.x && this.body.velocity.x <=0)
	{
		this.body.velocity.x = this.enemySpeed;
	}
}

class ChaseState extends State {
	enter(game, enemy)
	{
		enemy.chase();
		//animations
	}

	execute(game, enemy)
	{
		enemy.chase();
	}
}

Enemy.prototype.die = function()
{

}

Enemy.prototype.stateMachine = function()
{
	
}