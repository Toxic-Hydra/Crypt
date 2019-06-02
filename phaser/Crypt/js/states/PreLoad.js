'use strict'

var PreLoad = function(game){

};

PreLoad.prototype = {	//WE CAN ADD THE LOADING SCREEN HERE

	preload: function()
	{
		//CURENTLY ONLY LOADING PLACEHOLDER ASSETS
		//console.log('preload');
		game.load.atlas('character', 'assets/img/atlas/character.png', 'assets/img/atlas/character.json');
		game.load.atlas('small', 'assets/img/atlas/smallenemy.png', 'assets/img/atlas/smallenemy.json');
		game.load.atlas('big', 'assets/img/atlas/bigenemy.png' , 'assets/img/atlas/bigenemy.json');
		game.load.atlas('bat', 'assets/img/atlas/bat.png' , 'assets/img/atlas/bat.json');
		game.load.atlas('items', 'assets/img/atlas/assets.png' , 'assets/img/atlas/assets.json');
		game.load.atlas('Menu', 'assets/img/atlas/MainMenu.png' , 'assets/img/atlas/MainMenu.json')
		game.load.image('colored_transparent' , 'assets/img/tiles/colored_transparent.png');
		game.load.image('dungeon' , 'assets/img/tiles/DungeonTileset.png');

		game.load.image('enterDoor', 'assets/img/enterDoor.png');
		game.load.image('exitDoor', 'assets/img/exitDoor.png');

		game.load.bitmapFont('carrier', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

		game.load.audio('shoot' , 'assets/audio/shoot1.mp3');
		
		game.load.tilemap('map1', 'assets/map/EnemyTest.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('expanse', 'assets/map/Map1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map2', 'assets/map/Map2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map3', 'assets/map/Map3.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create: function()
	{
		game.state.start("Main");//newLife
	}
}