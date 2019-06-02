var Corpse = function(game, corpseInfo){
	Phaser.Sprite.call(this, game, corpseInfo.x, corpseInfo.y, 'items' ,'corpse');
	//Sprite properties
	this.anchor.setTo(0.5);
	this.scale.setTo(1);
	this.smoothed = false;

	//Physics
	game.physics.arcade.enableBody(this);
	this.body.gravity.y = 900;

	this.corpseInfo = corpseInfo;
	if (this.corpseInfo.consumed)
	{
		this.tint = 0x808080;
	}

	//game.add.existing(this);
	corpses.add(this);
}

Corpse.prototype = Object.create(Phaser.Sprite.prototype);
Corpse.prototype.constructor = Corpse;

Corpse.prototype.setConsumed = function()
{
	this.corpseInfo.consumed = true;
	this.tint = 0x808080;
}

Corpse.prototype.applyUpgradeToPlayer = function(player)
{
	// Choose one upgrade randomly
	if (this.corpseInfo.upgrades.length == 0) return;
	var upgrade = this.corpseInfo.upgrades[Math.floor(Math.random() * this.corpseInfo.upgrades.length)];
	player.applyUpgrade(upgrade);
}
