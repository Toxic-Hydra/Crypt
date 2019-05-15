var WayPoint = function(game, x, y, key)
{
	Phaser.Sprite.call(this,game, x, y, key);
	game.physics.arcade.enableBody(this);
	this.effect = "reverse";
	this.body.immovable = true;
	game.add.existing(this);
}

WayPoint.prototype = Object.create(Phaser.Sprite.prototype);
WayPoint.prototype.constructor = WayPoint;