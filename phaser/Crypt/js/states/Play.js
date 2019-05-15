
var Play = function(game)
{
	var map;
};

var _player;
var _enemies;
var mapLayer;
var reverseWaypoints;


Play.prototype = {



	create: function()
	{
		//need platforms to activate jump.
		game.stage.backgroundColor = '#8594a3';
		_player = new Player(game, game.world.centerX, game.world.centerY, 'character');
		_enemies = game.add.group();
		reverseWaypoints = game.add.group();
		
		
		map = game.add.tilemap('enemytestMap');
		map.addTilesetImage('colored', 'colored_transparent');
		map.setCollisionBetween(1, 1023);
		mapLayer = map.createLayer('Tile Layer 1');
		mapLayer.resizeWorld();

		console.log(mapLayer);

		map.createFromObjects('enemies', 218, 'tempEnemy', 0, true, false, _enemies, Enemy);
		//gid:442 for reverse waypoints
		map.createFromObjects('reverse', 442, 'waypoint', 0, true, false, reverseWaypoints, WayPoint );
	},
	
	update: function()
	{
		//Player Ground Collisions
		game.physics.arcade.collide(_player, mapLayer);
		game.physics.arcade.collide(_enemies, mapLayer);
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