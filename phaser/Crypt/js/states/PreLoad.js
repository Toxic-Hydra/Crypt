'use strict'

var PreLoad = function(game){

};

PreLoad.prototype = {	//WE CAN ADD THE LOADING SCREEN HERE

	preload: function()
	{
		//CURENTLY ONLY LOADING PLACEHOLDER ASSETS
		console.log('preload');
		game.load.atlas('character', 'assets/img/atlas/character.png', 'assets/img/atlas/character.json');
		game.load.image('bullet', 'assets/img/bullet.png');
	},
	create: function()
	{
		game.state.start("play"); //Really this should be MainMenu, but for placeholder testing it will be play.
	}
}