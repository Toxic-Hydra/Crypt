var Play = function(game)
{

};

Play.prototype = {

	

	create: function()
	{
		//need platforms to activate jump.
		game.stage.backgroundColor = '#8594a3';
		var player = new Player(game, game.world.centerX, game.world.centerY, 'character');
		console.log(player);
	},
	
	update: function()
	{

	}
}