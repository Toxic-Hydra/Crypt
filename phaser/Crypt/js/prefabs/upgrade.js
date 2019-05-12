var Upgrade = function(game)
{
	Phaser.Sprite.call(this, game, 32, 50, 'upgrade');

	game.physics.arcade.enable(this);

	//Define the name of the upgrade. Actual upgrading takes place in the player class.
	this.upgradeName = "atkspeed";
}