var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

//game.state.add("Main", MainMenu);
game.state.add("play", Play);

game.state.start("play");