var States = {};

States.Boot = {
	preload: function(){
		this.game.load = this.game.load.image('title', '/assets/images/KANIBARU.png');
	},
	create: function(){
		this.game.background = this.game.add.sprite(this.game.world.centerX - 190, this.game.world.centerY - 40, 'title');
	},
	update: function(){
	}
};