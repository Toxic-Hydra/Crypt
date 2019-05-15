
var Play = function(game)
{
	var mapLayer;
	var doors;
};

var _player;
var _enemies;
var reverseWaypoints;

Play.prototype = {

	create: function()
	{
		this.doors = game.add.group();
		_enemies = game.add.group();
		reverseWaypoints = game.add.group();
		
		LevelLoader.createMap(this);
		
		var enterDoor = this.doors.getBottom();
		_player = new Player(game, enterDoor.x, enterDoor.y - 5, 'character');
	},
	
	update: function()
	{
		//Player Ground Collisions
		game.physics.arcade.collide(_player, this.mapLayer);
		game.physics.arcade.collide(_enemies, this.mapLayer);
		game.physics.arcade.overlap(_player, _enemies);


	},
	render: function()
	{
		game.debug.body(_player);	
		game.debug.body(_player.meleeRect);
		game.debug.physicsGroup(_enemies);
		//game.debug.physicsGroup(reverseWaypoints);
	},
	

}