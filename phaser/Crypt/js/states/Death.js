'use strict'

var Death = function(game) {

};

Death.prototype = {

	create: function()
	{
        var str = 'You have died (room ' + (gameData.room + 1) + ')\n\nPress spacebar to continue'
        var text = game.add.text(game.world.width / 2, 400, str, { fontSize: 24, fill: '#000', align: 'center' });
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
