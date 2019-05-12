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

Enemy.prototype.path = function()
{

}

Enemy.prototype.pain = function()
{

}

Enemy.prototype.shoot = function()
{

}

Enemy.prototype.chase = function()
{

}

Enemy.prototype.die = function()
{

}

Enemy.prototype.stateMachine = function()
{
	
}