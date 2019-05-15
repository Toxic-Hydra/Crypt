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
		game.load.image('colored_transparent' , 'assets/img/tiles/colored_transparent.png');
		game.load.image('tempEnemy' , 'assets/img/placeholderEnemy.png');
		game.load.image('waypoint', 'assets/img/pathcollider.png');
		game.load.image('atkSpeedUp', 'assets/img/upatkspeed.png');
		game.load.audio('shoot' , 'assets/audio/shoot1.mp3');
		
		game.load.tilemap('testMap', 'assets/map/TestMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('enemytestMap', 'assets/map/EnemyTest.json', null, Phaser.Tilemap.TILED_JSON);//This map has enemy placements using gid: 218 as the enemy.
    	game.load.image('testMapTiles', 'assets/img/tiles/oubliette_tileset.png');
	},
	create: function()
	{
		game.state.start("play"); //Really this should be MainMenu, but for placeholder testing it will be play.
	}
}