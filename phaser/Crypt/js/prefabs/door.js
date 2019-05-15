var Door = function(game, x, y, key) {
	Phaser.Sprite.call(this, game, x, y, key);
    game.physics.arcade.enableBody(this);
}

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Door.prototype.update = function()
{
    if (game.physics.arcade.overlap(this, _player))
    {
        LevelLoader.nextRoom();
    }
}
