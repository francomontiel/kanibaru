var Game, game;

Game = {
  States: States
};

window.game = game = new Phaser.Game(900, 650, Phaser.AUTO, '');

game.state.add('Boot', Game.States.Boot);
game.state.add('Play', Game.States.Play);
game.state.add('Terminal', Game.States.Terminal);
game.state.add('Oruro1', Game.States.Oruro1);
game.state.add('Oruro2', Game.States.Oruro2);
game.state.add('CathedralOpen', Game.States.CathedralOpen);
game.state.add('CathedralClosed', Game.States.CathedralClosed);
game.state.add('Sajama', Game.States.Sajama);
game.state.add('Mine', Game.States.Mine);

game.state.start('Boot');