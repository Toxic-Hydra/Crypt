/*
 * Team Name: Undecided
 * Team Members: Ivan Lopez, Kevin Chu, Elliot Segal, Benjamin Chen
 * Github Repo: https://github.com/Toxic-Hydra/Crypt
 */

var gameData = {
    room: 0,
    bestRoom: 0,
    roomName: "",
    player: {
        // put other data needed to create the player (appearance info) here
        health: 100,
        upgrades: [ ]
    },
    corpses: [ ],
    maps: [ 'map2', 'expanse', 'map1', 'map3', 'map4', 'map5', 'map6', 'map7', 'map8', 'map9' ]
};

var game = new Phaser.Game(1024, 768, Phaser.AUTO, '');//800 x 600

game.state.add("Main", MainMenu);
game.state.add("preload", PreLoad);
game.state.add("newLife", NewLife);
game.state.add("play", Play);
game.state.add("death", Death);
game.state.add("credits", Credits);

game.state.start("preload");