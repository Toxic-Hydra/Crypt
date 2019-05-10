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
	


	game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function()
{

}

