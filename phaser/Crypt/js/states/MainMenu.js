var MainMenu = function() {
	var selection;
	var start;
	var tutorial;
	var credits;
	var HowToText;
	var logo;
};

MainMenu.prototype = {

	create: function()
	{
		this.menu = this.time.now + 200;
		game.world.width = game.width;
        game.world.height = game.height;
        logo = game.add.sprite(game.world.centerX, game.world.centerY-150, 'Menu' , 'logo');
        logo.anchor.setTo(0.5);
		start = game.add.sprite(game.world.centerX, game.world.centerY, 'Menu' , 'start');
		start.anchor.setTo(0.5);
		tutorial = game.add.sprite(game.world.centerX,game.world.centerY + start.height+5, 'Menu' ,'tutorial' );
		tutorial.anchor.setTo(0.5);
		credits = game.add.sprite(game.world.centerX, tutorial.y + tutorial.height + 5,'Menu' , 'credits');
		credits.anchor.setTo(0.5);
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
        HowToText = game.add.bitmapText(game.world.centerX, game.world.height - 20, 'carrier', 
        	'Up and Down arrow keys to navigate Menu.\nZ to select. Click on screen to toggle fullscreen.', 10);
        HowToText.anchor.setTo(0.5);
        HowToText.align = 'center';
		selection = 1;
		this.keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.begin = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	},

	update: function()
	{
		//three menu choices, Start Game, Start w/Tutorial, Credits
		//TINT
		if(selection == 1)
		{
			start.tint = Phaser.Color.WHITE;
			tutorial.tint = Phaser.Color.GRAY;
			credits.tint = Phaser.Color.GRAY;
			
		}
		else if(selection == 2)
		{
			start.tint = Phaser.Color.GRAY;
			tutorial.tint = Phaser.Color.WHITE;
			credits.tint = Phaser.Color.GRAY;
			
		}
		else if(selection == 3)
		{
			start.tint = Phaser.Color.GRAY;
			tutorial.tint = Phaser.Color.GRAY;
			credits.tint = Phaser.Color.WHITE;
			
		}
		

		//Navigate Menu up or down
		if(this.keyDown.isDown && this.menu < this.time.now)
		{
			this.menu = this.time.now + 200;
			this.navDown();
		}
		else if(this.keyUp.isDown && this.menu < this.time.now)
		{
			this.menu = this.time.now + 200;
			this.navUp();
		}

		//State Transition
		if(this.begin.isDown)
		{
			if(selection == 1)
			{
				game.state.start("newLife");
			}
			else if(selection == 2)
			{
				//FIGURE OUT THIS STATE
			}
			else if(selection == 3)
			{
				//ADD CREDITS
			}

		}

	},
	navDown: function()
	{
		selection += 1;
		if(selection > 3)
		{
			selection = 1;
		}
	},
	navUp: function()
	{
		selection -= 1;
		if(selection < 1)
		{
			selection = 3;
		}

	}



}