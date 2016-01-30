var States = {};

States.Boot = function(game){
	
};

States.Boot.prototype = {
	preload: function(){
		this.game.load = this.game.load.image('title', '/assets/images/KANIBARU.png');
		this.game.load = this.game.load.image('normalHead', 'assets/images/duke/normalHead.png');
		this.game.load = this.game.load.image('normalTorso', 'assets/images/duke/normalTorso.png');
		this.game.load = this.game.load.image('normalLegs', 'assets/images/duke/normalLegs.png');
	},
	create: function(){
		this.state.start('Play');
	}
};

// La idea de este State es que solo se lo utilize para cargar los assets necesarios para el inicio del juego