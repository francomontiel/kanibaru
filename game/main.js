var Game, game;

Game = {
  States: States
};

window.game = game = new Phaser.Game(490, 290, Phaser.AUTO, '');

game.state.add('Boot', Game.States.Boot);

game.state.start('Boot');