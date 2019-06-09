
LevelLoader = new Object();
LevelLoader.tutorial = false;

LevelLoader.playerDied = function(leaveCorpse)
{
    if (leaveCorpse && !LevelLoader.tutorial)
    {
        var corpse = {
            room: gameData.roomName,
            x: _player.x,
            y: _player.y,
            consumed: false,
            upgrades: gameData.player.upgrades.slice()
        };
        gameData.corpses.push(corpse);
    }

    game.camera.fade('#000000', 250);
    game.camera.onFadeComplete.addOnce(LevelLoader.playerDiedFade);
}

LevelLoader.nextRoom = function()
{
    //_player.visible = false;
    game.camera.fade('#000000', 250);
    game.camera.onFadeComplete.addOnce(LevelLoader.nextRoomFade);
}

LevelLoader.resetRun = function()
{
    LevelLoader.tutorial = false;
    gameData.player.health = 100;
    gameData.room = 0;
    gameData.player.upgrades = [ ];
} 

LevelLoader.chooseMap = function()
{
    if (LevelLoader.tutorial)
    {
        return 'Tutorial';
    }
    // This list should be randomized each run, but for testing it's convenient not to
    var maps = [ 'map2', 'expanse', 'map1', 'map3', 'map4', 'map5', 'map6', 'map7', 'map8', 'map9' ];
    shuffle(maps);
    return maps[gameData.room % maps.length];
}

LevelLoader.createMap = function(playState)
{
    gameData.roomName = this.chooseMap();
    var map = game.add.tilemap(gameData.roomName);
    map.addTilesetImage('colored', 'colored_transparent');
    map.addTilesetImage('Dungeon' , 'dungeon');
    map.setCollisionByExclusion([47,48,49,57,58,59,68,69,78,79], true, 'Tile Layer 1');
    var back = map.createLayer('background'); //SHould have thought of this more, now it kinda fucks the framework if a map doesnt include a background layer
    game.world.sendToBack(back);
    playState.mapLayer = map.createLayer('Tile Layer 1');
    playState.mapLayer.resizeWorld();

    //Dynamically load in Enemies, navigation waypoints, upgrades, traps, and the doors.
    map.createFromObjects('enemies', 1035, 'small', 0, true, false, _enemies, Enemy);
    map.createFromObjects('enemies', 1034, 'big', 0, true, false, _enemies, Zombie);
    map.createFromObjects('enemies', 1033, 'bat', 0, true, false, _enemies, Pursuer);
    map.createFromObjects('reverse', 1037, 'waypoint', 0, true, false, reverseWaypoints, WayPoint );
    map.createFromObjects('upgrades', 1029, 'items', 'atkSpeedUp', true, false, upgrades, Upgrade);
    map.createFromObjects('upgrades', 1036, 'items', 'shotPower', true, false, upgrades, ShotUpgrade);
    map.createFromObjects('upgrades', 1027, 'items', 'extraJump', true, false, upgrades, Upgrade);
    map.createFromObjects('upgrades', 1025, 'items', 'bulletspeed', true, false, upgrades, ShotUpgrade);
    map.createFromObjects('upgrades', 1028, 'items', 'maxhealth', true, false, upgrades, Upgrade);
    map.createFromObjects('upgrades', 1026, 'items', 'heal', true, false, upgrades, ShotUpgrade);
    map.createFromObjects('doors', 290, 'enterDoor', 0, true, false, playState.doors);
    map.createFromObjects('doors', 291, 'exitDoor', 0, true, false, playState.doors, Door);
    map.createFromObjects('traps', 23, 'spike', 0, true, false, traps, Spikes);

    if (LevelLoader.tutorial)
    {
        LevelLoader.createTutorialText();
    }
    else
    {
        LevelLoader.loadCorpses();
    }
}

LevelLoader.loadCorpses = function()
{
    for (var i = 0; i < gameData.corpses.length; i++)
    {
        var corpse = gameData.corpses[i];
        if (corpse.room == gameData.roomName)
        {
            new Corpse(game, corpse);
        }
    }
}

LevelLoader.createTutorialText = function()
{
    game.add.bitmapText(50, 390, 'carrier', " Use arrow keys\n\nto move and jump", 12);
    game.add.bitmapText(520, 330, 'carrier', "You can jump again\n\n    in the air", 12);
    game.add.bitmapText(30, 100, 'carrier', "  Use Z,C to attack \n\n    horizontally\n\nand R to switch between\n\n   melee and ranged", 12);
    game.add.bitmapText(400, 120, 'carrier', "Find powerups or gravestones\n\n to improve your character\n\n Enemies get stronger every Room", 12);
}

LevelLoader.playerDiedFade = function()
{
    if (LevelLoader.tutorial)
    {
        // Reload the tutorial
        game.state.start("play");
    }
    else
    {
        game.state.start("death");
    }
}

LevelLoader.nextRoomFade = function()
{
    if (LevelLoader.tutorial)
    {
        // Return to menu
        game.state.start("Main");
    }
    else
    {
        gameData.room += 1;
        game.state.start("play");
    }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}