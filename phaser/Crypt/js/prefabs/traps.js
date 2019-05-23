var Spikes = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);
	this.anchor.setTo(0.5);
	game.physics.arcade.enableBody(this);
	this.body.immovable = true;
	game.add.existing(this);
}
Spikes.prototype = Object.create(Phaser.Sprite.prototype);
Spikes.prototype.constructor = Spikes;

Spikes.prototype.update = function()
{
	game.physics.arcade.collide(_player.meleeRect, this, this.playerBounce); //this ones just for fun.
	game.physics.arcade.collide(_player, this, _player.kill);
}

Spikes.prototype.playerBounce = function(player, spike)
{
	//if collide
	player.body.velocity.y = -300;
}