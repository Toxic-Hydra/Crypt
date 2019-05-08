var Play = function(game)
{

};

Play.prototype = {

	preload: function()
	{
		console.log('preload');
		game.load.atlas('character', 'assets/img/atlas/character.png', 'assets/img/atlas/character.json');
		game.load.image('bullet', 'assets/img/bullet.png');
	},

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