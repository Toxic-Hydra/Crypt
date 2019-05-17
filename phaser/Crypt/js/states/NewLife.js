'use strict'

var NewLife = function(game) {

};

NewLife.prototype = {

	create: function()
	{
        // Reset run data
        gameData.room = 0;
        gameData.player.upgrades = [ ];
        // randomize player appearance here

        game.stage.backgroundColor = '#8594a3';
        var text = game.add.text(game.world.width / 2, 200, 'A new hero arises\n\nPress spacebar to enter the crypt', { fontSize: 24, fill: '#000', align: 'center' });
        text.anchor.set(0.5);

        // Wait for spacebar press, then go to Play state
        var key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.addOnce(this.startRun, this);

				game.camera.flash('#000000', 1000);
    },

    startRun: function()
    {
        game.state.start('play');
    }
}
