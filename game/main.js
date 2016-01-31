var Game, game;

Game = {
  States: States
};

window.game = game = new Phaser.Game(900, 650, Phaser.AUTO, '');

game.state.add('Boot', Game.States.Boot);
game.state.add('Play', Game.States.Play);
game.state.add('Terminal', Game.States.Terminal);

game.state.start('Boot');