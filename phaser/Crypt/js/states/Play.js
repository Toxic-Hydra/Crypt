var Play = function(game)
{
	var player;
	var tempFloor;
};

Play.prototype = {

	

	create: function()
	{
		//need platforms to activate jump.
		game.stage.backgroundColor = '#8594a3';
		player = new Player(game, game.world.centerX, game.world.centerY, 'character');
		console.log(player);

		tempFloor = game.add.sprite(0, game.world.height - 64, 'tempGround');
		game.physics.arcade.enable(tempFloor);
		tempFloor.body.immovable = true;
	},
	
	update: function()
	{
		//Player Ground Collisions
		game.physics.arcade.collide(player, tempFloor);


	}
}