var Credits = function(game)
{

};

Credits.prototype = {
	create: function()
	{	//Just a shitload of text pal.
		var str = "CREDITS:\n";
		var credits = "Lead Programmer: Ivan Lopez\nMap Design/Programming: Benjamin Chen\nAudio/Programming: Elliot Segal\nArt: Kevin Chu";
		var text = game.add.bitmapText(game.world.centerX, game.world.centerY-200,'carrier', str, 24);
		text.align = 'center';
		text.anchor.setTo(0.5);
		text.lineSpacing +=5;
		var nextText = game.add.bitmapText(game.world.centerX, text.y + text.height+82,'carrier', credits, 18);
		nextText.anchor.setTo(0.5);
		this.return = game.input.keyboard.addKey(Phaser.Keyboard.Z);
		var pressToText = game.add.bitmapText(game.world.centerX, game.world.height - 20,'carrier', 'Press Z to return' , 12);
		pressToText.anchor.setTo(0.5);
	},
	update: function()
	{

		if(this.return.isDown)
		{
			game.state.start("Main");
		}
	}
}