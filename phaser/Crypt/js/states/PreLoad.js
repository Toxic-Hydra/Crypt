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

		game.load.image('healthbar' , 'assets/img/healthbar.png');
		

		game.load.image('enterDoor', 'assets/img/enterDoor.png');
		game.load.image('exitDoor', 'assets/img/exitDoor.png');

		game.load.bitmapFont('carrier', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

		game.load.audio('jump', 'assets/audio/sfx/jump.wav');
		game.load.audio('shoot', 'assets/audio/sfx/shoot.wav');
		game.load.audio('melee', 'assets/audio/sfx/melee.wav');
		game.load.audio('player_hit', 'assets/audio/sfx/player_hit.wav');
		game.load.audio('enemy_hit', 'assets/audio/sfx/enemy_hit.wav');
		game.load.audio('collect_powerup', 'assets/audio/sfx/collect.wav');
		game.load.audio('collect_corpse', 'assets/audio/sfx/collect_corpse.wav');
		game.load.audio('music', 'assets/audio/game_music.mp3');

		game.load.tilemap('map1', 'assets/map/EnemyTest.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('expanse', 'assets/map/Map1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map2', 'assets/map/Map2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map3', 'assets/map/Map3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map4', 'assets/map/Map4.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map5', 'assets/map/Map5.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map6', 'assets/map/Map6.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map7', 'assets/map/Map7.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map8', 'assets/map/Map8.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map9', 'assets/map/Map9.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create: function()
	{


		game.state.start("Main");//newLife



	}
}
