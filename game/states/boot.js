var States = {};

States.Boot = function(game){
	
};

States.Boot.prototype = {
	preload: function(){
		this.game.load = this.game.load.image('title', '/assets/images/KANIBARU.png');
		//this.game.load = this.game.load.image('normalHead', 'assets/images/duke/normalHead.png');
		//this.game.load = this.game.load.image('normalTorso', 'assets/images/duke/normalTorso.png');
		//this.game.load = this.game.load.image('normalLegs', 'assets/images/duke/normalLegs.png');
		this.game.load = this.game.load.spritesheet('normalHead', 'assets/images/duke/normalHeadSheet.png', 110, 110);
		this.game.load = this.game.load.spritesheet('normalTorso', 'assets/images/duke/normalTorsoSheet.png', 110, 110);
		this.game.load = this.game.load.spritesheet('normalLegs', 'assets/images/duke/normalLegsSheet.png', 110, 110);
		this.game.load = this.game.load.spritesheet('dukeCollider', 'assets/images/duke/collider.png');
	},
	create: function(){
		this.state.start('Play');
	}
};

// La idea de este State es que solo se lo utilize para cargar los assets necesarios para el inicio del juego