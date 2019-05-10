var Corpse = function(game, x, y ){
	Phaser.Sprite.call(this, game, x, y, 'corpse');

}

Corpse.prototype = Object.create(Phaser.Sprite.prototype);
Corpse.prototype.constructor = Corpse;