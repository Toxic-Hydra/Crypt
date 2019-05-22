var Upgrade = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);

	game.physics.arcade.enable(this);

	//Define the name of the upgrade. Actual upgrading takes place in the player class.
	this.upgradeName = "atkspeed";
	this.body.gravity.y = 900;
	game.add.existing(this);
}

Upgrade.prototype = Object.create(Phaser.Sprite.prototype);
Upgrade.prototype.constructor = Upgrade;


var ShotUpgrade = function(game, x, y, key)
{
	Upgrade.call(this, game, x, y, key);
	this.upgradeName = "shotgun";
}
ShotUpgrade.prototype = Object.create(Upgrade.prototype);
ShotUpgrade.prototype.constructor = ShotUpgrade;

var JumpUpgrade = function(game, x, y, key)
{
	Upgrade.call(this, game, x, y, key);
	this.upgradeName = "jump";
}
JumpUpgrade.prototype = Object.create(Upgrade.prototype);
JumpUpgrade.prototype.constructor = JumpUpgrade;

var FireRate = function(game, x, y, key)
{
	Upgrade.call(this, game, x, y, key);
	this.upgradeName = "fireUp";
}
FireRate.prototype = Object.create(Upgrade.prototype)
FireRate.prototype.constructor = FireRate;

var MaxHealth = function(game, x, y, key)
{
	Upgrade.call(this, game, x, y, key);
	this.upgradeName = "maxHealth";
}
MaxHealth.prototype = Object.create(Upgrade.prototype)
MaxHealth.prototype.constructor = MaxHealth;

var Heal = function(game, x, y, key)
{
	Upgrade.call(this, game, x, y, key);
	this.upgradeName = "heal";
}
Heal.prototype = Object.create(Upgrade.prototype);
Heal.prototype.constructor = Heal;