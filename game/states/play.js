
States.Play = function(game){
};


States.Play.prototype = {
	create: function(){
		this.game.background = this.game.add.sprite(this.game.world.centerX - 190, this.game.world.centerY - 40, 'title');
		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.cursors = game.input.keyboard.createCursorKeys();
	},
	update: function(){
		this.game.Duke.update();
	}
};