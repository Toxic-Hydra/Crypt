'use strict'

var PreLoad = function(game){

};

PreLoad.prototype = {	//WE CAN ADD THE LOADING SCREEN HERE

	preload: function()
	{
		//Fucking load everything dude
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
		//Bitmap font from phaser examples. No idea who made it.
		game.load.bitmapFont('carrier', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

		game.load.audio('jump', 'assets/audio/sfx/jump.wav', 0.5);
		game.load.audio('shoot', 'assets/audio/sfx/shoot.wav', 0.5);
		game.load.audio('melee', 'assets/audio/sfx/melee.wav', 0.5);
		game.load.audio('player_hit', 'assets/audio/sfx/player_hit.wav', 0.5);
		game.load.audio('enemy_hit', 'assets/audio/sfx/enemy_hit.wav', 0.5);
		game.load.audio('collect_powerup', 'assets/audio/sfx/collect.wav', 0.5);
		game.load.audio('collect_corpse', 'assets/audio/sfx/collect_corpse.wav', 0.5);
		game.load.audio('music', 'assets/audio/game_music.mp3', 0);

		game.load.tilemap('Tutorial', 'assets/map/Tutorial.json', null, Phaser.Tilemap.TILED_JSON);
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

		// music (will continue to play in other states)
		//Seems I was wrong about allowMultiple = false stoping the original music. Instead it just layers
		//adding it here did end up being the correct solution.
		var music = game.add.audio('music');
		music.volume = 0.1;
        music.allowMultiple = false;
        music.loop = true;
        music.play();

		

	},
	update: function()
	{
		if(this.cache.isSoundDecoded('music')){
			game.state.start("Main");
		}
	}
}
