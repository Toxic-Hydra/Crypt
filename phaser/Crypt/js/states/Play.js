
var Play = function(game)
{
	var mapLayer;
	var doors;
};

var _player;
var _enemies;
var reverseWaypoints;
var upgrades;
var corpses;
var traps;

Play.prototype = {

	create: function()
	{
		this.doors = game.add.group();
		corpses = game.add.group();
		_enemies = game.add.group();
		reverseWaypoints = game.add.group();
		upgrades = game.add.group();
		traps = game.add.group();

		LevelLoader.createMap(this);

		var enterDoor = this.doors.getBottom();
		_player = new Player(game, enterDoor.x, enterDoor.y - 5, 'character');
		

		//DAT.GUI PLAYER
		/*var gui = new dat.GUI(); //Curently disabled as a new one is created every level transition and death. only use for testing
		gui.add(_player, 'characterSpeed', 0, 500);
		gui.add(_player, 'jumpAmount');
		gui.add(_player, 'damageGun');
		gui.add(_player, 'maxHealth');
		gui.add(_player, 'health');*/


		game.camera.flash('#000000', 500);
	},

	update: function()
	{
		//Player Ground Collisions
		game.physics.arcade.collide(_player, this.mapLayer);
		game.physics.arcade.collide(_enemies, this.mapLayer);
		game.physics.arcade.overlap(_player, _enemies);
		game.physics.arcade.collide(upgrades, this.mapLayer);
		game.physics.arcade.collide(corpses, this.mapLayer);



	},
	render: function()
	{
		//game.debug.body(_player);
		//game.debug.body(_player.meleeRect);
		//game.debug.body(_player.meleeRectVert);
		//game.debug.physicsGroup(_enemies);
		//game.debug.physicsGroup(reverseWaypoints);
		//game.debug.body(zombie);
	},


}
