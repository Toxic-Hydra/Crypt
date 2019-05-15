
LevelLoader = new Object();

LevelLoader.playerDied = function()
{
    game.state.start("death");
}

LevelLoader.nextRoom = function()
{
    gameData.room += 1;
    game.state.start("play");
}

LevelLoader.chooseMap = function()
{
    // This list should be randomized each run, but for testing it's convenient not to
    var maps = [ 'map1', 'map2', 'map3' ];
    return maps[gameData.room % maps.length];
}

LevelLoader.createMap = function(playState)
{
    var map = game.add.tilemap(this.chooseMap());
    map.addTilesetImage('colored', 'colored_transparent');
    map.setCollisionBetween(1, 1023);
    playState.mapLayer = map.createLayer('Tile Layer 1');
    playState.mapLayer.resizeWorld();

    map.createFromObjects('enemies', 218, 'tempEnemy', 0, true, false, _enemies, Enemy);
    map.createFromObjects('reverse', 442, 'waypoint', 0, true, false, reverseWaypoints, WayPoint );
    map.createFromObjects('upgrades', 1, 'atkSpeedUp', 0, true, false, upgrades, Upgrade);
    map.createFromObjects('doors', 290, 'enterDoor', 0, true, false, playState.doors);
    map.createFromObjects('doors', 291, 'exitDoor', 0, true, false, playState.doors, Door);
}
