/*
*Team Name: Undecided
*Team Members: Ivan Lopez, Kevin Chu, Elliot Segal, Benjamin Chen
*Github Repo: https://github.com/Toxic-Hydra/Crypt
*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

//game.state.add("Main", MainMenu);
game.state.add("preload", PreLoad);
game.state.add("play", Play);

game.state.start("preload");