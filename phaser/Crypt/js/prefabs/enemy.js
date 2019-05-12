'use strict'

var Enemy = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);
	//Arcade
	game.physics.arcade.enableBody(this);
	this.body.gravity.y = 900;
	this.body.collideWorldBounds = true;
	this.enemySpeed = 300;
	this.maxHealth = 100;
	this.setHealth(100);	

	//Enemy States
	//Enemy states include: Standing, Attack, Path, Pain, Shoot, Chase, Die, Special.
	this.state = "Standing";
	


	game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function()
{

}

Enemy.prototype.standing = function()
{

}

Enemy.prototype.attack = function()
{

}

Enemy.prototype.patrol = function(platform) //Pass in Platform group during collisions
{
	if(this.body.velocity.x > 0 && this.right > platform.right)
	{
		this.body.velocity.x *= -1;
	}
	else if(this.body.velocity.x < 0 && this.left < platform.left)
	{
		this.body.velocity *= -1;
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
	this.state = "chase";
	if(_player.x < this.x && this.body.velocity.x >= 0)
	{
		this.body.velocity.x = -this.enemySpeed;
	}
	else if(_player.x > this.x && this.body.velocity.x <=0)
	{
		this.body.velocity.x = this.enemySpeed;
	}
}

Enemy.prototype.die = function()
{

}

Enemy.prototype.stateMachine = function()
{
	if(_player.bottom == this.bottom && game.physics.arcade.distanceBetween(enemy, _player) < 100)
	{
		this.chase();
	}
}