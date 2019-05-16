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
		game.load.image('shotPower' , 'assets/img/shotpower.png');

		game.load.image('enterDoor', 'assets/img/enterDoor.png');
		game.load.image('exitDoor', 'assets/img/exitDoor.png');

		game.load.audio('shoot' , 'assets/audio/shoot1.mp3');
		
		game.load.tilemap('map1', 'assets/map/EnemyTest.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map2', 'assets/map/Map2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map3', 'assets/map/Map3.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create: function()
	{
		game.state.start("newLife");
	}
}