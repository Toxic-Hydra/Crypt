'use strict'

var Death = function(game) {

};

Death.prototype = {

	create: function()
	{

        // Reset world size
        game.world.width = game.width;
        game.world.height = game.height;

        var str = 'You have died (room ' + (gameData.room + 1) + ')\n\nPress spacebar to continue'
        var text = game.add.bitmapText(game.world.width / 2, 400, 'carrier' , str, 24);
        text.align = 'center';
        text.anchor.set(0.5);

        // Wait for spacebar press, then go to Play state
        var key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.addOnce(this.newLife, this);

				game.camera.flash('#000000', 1000);
    },

    newLife: function()
    {
        game.state.start('newLife');
    }
}
