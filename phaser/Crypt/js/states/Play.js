var Play = function(game)
{
	var mapLayer;
};

var _player;
var _enemies;

Play.prototype = {



	create: function()
	{
		//need platforms to activate jump.
		game.stage.backgroundColor = '#8594a3';
		_player = new Player(game, game.world.centerX, game.world.centerY, 'character');
		_enemies = game.add.group();
		//_enemies = new Enemy(game, game.world.centerX - 20, game.world.centerY, 'tempEnemy');
		//_enemies.add(enemy);

		map = game.add.tilemap('enemytestMap');
		map.addTilesetImage('colored', 'colored_transparent');
		map.setCollisionBetween(1, 1023);
		mapLayer = map.createLayer('Tile Layer 1');
		mapLayer.resizeWorld();

		map.createFromObjects('enemies', 218, 'tempEnemy', 0, true, false, _enemies, Enemy);
	},
	
	update: function()
	{
		//Player Ground Collisions
		game.physics.arcade.collide(_player, mapLayer);
		game.physics.arcade.collide(_enemies, mapLayer);
		game.physics.arcade.collide(_enemies, _player);


	},
	render: function()
	{
		game.debug.body(_player);	
		game.debug.body(_player.meleeRect);
		game.debug.body(_enemies);
	},

}