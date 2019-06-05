'use strict'

var Death = function(game) {

};

Death.prototype = {

	create: function()
	{
        if (gameData.room > gameData.bestRoom)
        {
            gameData.bestRoom = gameData.room;
        }

        // Reset world size
        game.world.width = game.width;
        game.world.height = game.height;

        var str = 'You have died (room ' + (gameData.room + 1) + ')\n\n'
        str += 'Best run: room ' + (gameData.bestRoom + 1) + '\n\n\n';
        str += 'Press Z to continue\n\n';
        str += 'Press C to return to menu\n\n';
        var text = game.add.bitmapText(game.world.width / 2, 400, 'carrier' , str, 24);
        text.align = 'center';
        text.anchor.set(0.5);

        var key = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        key.onDown.addOnce(this.newLife, this);
        var key = game.input.keyboard.addKey(Phaser.Keyboard.C);
        key.onDown.addOnce(this.exitRun, this);

		game.camera.flash('#000000', 1000);
    },

    newLife: function()
    {
        game.state.start('newLife');
    },

    exitRun: function()
    {
        game.state.start('Main');
    }
}
