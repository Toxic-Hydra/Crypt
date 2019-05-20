var Corpse = function(game, corpseInfo){
	Phaser.Sprite.call(this, game, corpseInfo.x, corpseInfo.y, 'corpse');
	//Sprite properties
	this.anchor.setTo(0.5);
	this.scale.setTo(4);
	this.smoothed = false;

	//Physics
	game.physics.arcade.enableBody(this);
	this.body.gravity.y = 900;

	// TODO upgrades

	game.add.existing(this);
}

Corpse.prototype = Object.create(Phaser.Sprite.prototype);
Corpse.prototype.constructor = Corpse;
