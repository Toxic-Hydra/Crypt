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
		game.load.image('corpse', 'assets/img/corpse.png');
		game.load.image('bullet', 'assets/img/bullet.png');
		game.load.image('spike', 'assets/img/spike.png');
		game.load.image('colored_transparent' , 'assets/img/tiles/colored_transparent.png');
		game.load.image('waypoint', 'assets/img/pathcollider.png');
		game.load.image('atkSpeedUp', 'assets/img/upatkspeed.png');
		game.load.image('shotPower' , 'assets/img/shotpower.png');
		game.load.image('extraJump' , 'assets/img/jumpup.png');
		game.load.image('bulletspeed' , 'assets/img/bulletspeed.png');
		game.load.image('maxhealth' , 'assets/img/maxhealth.png');
		game.load.image('heal' , 'assets/img/heal.png');
		game.load.image('menuStart', 'assets/img/start.png');
		game.load.image('menuTut', 'assets/img/tutorial.png');
		game.load.image('menuCred', 'assets/img/credits.png');
		game.load.image('menuFull', 'assets/img/fullscreen.png');
		game.load.image('logo', 'assets/img/logo.png');

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