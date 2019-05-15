/*
 * Team Name: Undecided
 * Team Members: Ivan Lopez, Kevin Chu, Elliot Segal, Benjamin Chen
 * Github Repo: https://github.com/Toxic-Hydra/Crypt
 */

var gameData = {
    room: 0,
    player: {
        // put other data needed to create the player (appearance info) here
        upgrades: [ ]
    },
    corpses: [ ]
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

//game.state.add("Main", MainMenu);
game.state.add("preload", PreLoad);
game.state.add("newLife", NewLife);
game.state.add("play", Play);
game.state.add("death", Death);

game.state.start("preload");