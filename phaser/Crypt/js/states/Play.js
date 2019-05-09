var Play = function(game)
{
	var player;
	var mapLayer;
};

Play.prototype = {



	create: function()
	{
		//need platforms to activate jump.
		game.stage.backgroundColor = '#8594a3';
		player = new Player(game, game.world.centerX, game.world.centerY, 'character');
		console.log(player);

		// tempFloor = game.add.sprite(0, game.world.height - 64, 'tempGround');
		// game.physics.arcade.enable(tempFloor);
		// tempFloor.body.immovable = true;
		map = game.add.tilemap('testMap');
		map.addTilesetImage('oubliette', 'testMapTiles');
		map.setCollisionBetween(1, 40);
		mapLayer = map.createLayer('Tile Layer 1');
		mapLayer.resizeWorld();
	},
	
	update: function()
	{
		//Player Ground Collisions
		game.physics.arcade.collide(player, mapLayer);


	},
	render: function()
	{
		game.debug.body(player);	
		game.debug.body(player.meleeRect);
	}
}