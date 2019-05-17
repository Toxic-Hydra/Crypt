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
        game.stage.smoothed = false;
        game.input.onDown.add(function(){
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            if(game.scale.isFullScreen)
            {
                game.scale.stopFullScreen();
            }
            else
            {
                game.scale.startFullScreen(false);
            }
        });
        var text = game.add.bitmapText(game.world.centerX, 200, 'carrier', 'A new hero arises\n\nPress spacebar to enter the crypt', 16); //game.add.text(game.world.width / 2, 200, 'A new hero arises\n\nPress spacebar to enter the crypt', { fontSize: 24, fill: '#000', align: 'center' });
        text.align = 'center';
        text.smoothed = false;
        text.tint = Phaser.Color.BLACK;
        text.anchor.set(0.5);
        
        // Wait for spacebar press, then go to Play state
        var key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key.onDown.addOnce(this.startRun, this);
    },
    
    startRun: function()
    {
        game.state.start('play');
    }
}