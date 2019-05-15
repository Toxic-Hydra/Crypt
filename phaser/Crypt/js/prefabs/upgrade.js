var Upgrade = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);

	game.physics.arcade.enable(this);

	//Define the name of the upgrade. Actual upgrading takes place in the player class.
	this.upgradeName = "atkspeed";
	this.body.gravity.y = 900;
}

Upgrade.prototype = Object.create(Phaser.Sprite.prototype);
Upgrade.prototype.constructor = Upgrade;
