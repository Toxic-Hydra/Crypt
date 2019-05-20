
var Play = function(game)
{
	var mapLayer;
	var doors;
	//var zombie;
};

var _player;
var _enemies;
var reverseWaypoints;
var upgrades;
var corpses;

Play.prototype = {

	create: function()
	{
		this.doors = game.add.group();
		_enemies = game.add.group();
		reverseWaypoints = game.add.group();
		upgrades = game.add.group();
		corpses = game.add.group();

		LevelLoader.createMap(this);

		var enterDoor = this.doors.getBottom();
		_player = new Player(game, enterDoor.x, enterDoor.y - 5, 'character');
		//zombie = new Zombie(game, game.world.centerX, game.world.centerY, 'tempEnemy');

		game.camera.flash('#000000', 1000);
	},

	update: function()
	{
		//Player Ground Collisions
		game.physics.arcade.collide(_player, this.mapLayer);
		game.physics.arcade.collide(_enemies, this.mapLayer);
		game.physics.arcade.overlap(_player, _enemies);
		game.physics.arcade.collide(upgrades, this.mapLayer);
		game.physics.arcade.collide(corpses, this.mapLayer);
		//game.physics.arcade.collide(zombie, this.mapLayer);


	},
	render: function()
	{
		//game.debug.body(_player);
		//game.debug.body(_player.meleeRect);
		//game.debug.physicsGroup(_enemies);
		//game.debug.physicsGroup(reverseWaypoints);
		//game.debug.body(zombie);
	},


}
