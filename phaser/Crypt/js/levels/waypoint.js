var WayPoint = function(game, x, y, key) //Waypoints tell enemy ai what to do.
{
	Phaser.Sprite.call(this,game, x, y, 'items', 'waypoint');
	game.physics.arcade.enableBody(this);
	this.effect = "reverse";
	this.body.immovable = true;
	game.add.existing(this);
}

WayPoint.prototype = Object.create(Phaser.Sprite.prototype);
WayPoint.prototype.constructor = WayPoint;