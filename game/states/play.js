
States.Play = function(game){
};


States.Play.prototype = {
	init: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function(){
		this.game.background = this.game.add.sprite(this.game.world.centerX - 190, this.game.world.centerY - 40, 'title');
		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.cursors = game.input.keyboard.createCursorKeys();

		this.game.obstacles = this.game.add.group();
		this.game.obstacles.enableBody = true;

		var obstacle = this.game.obstacles.create(300, 200, 'obstacle');
		obstacle.body.immovable = true;

		this.game.enemies = [];
		var enemy = new BasicEnemyX(game, 50, 400, 400, 100, 100, 0, 10);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new BasicEnemyY(game, 50, 600, 300, 100, 100, 0, 10);
		enemy.render();
		this.game.enemies.push(enemy);
	},
	update: function(){
		this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.game.obstacles);
		this.game.enemies.forEach(this.checkPlayerEnemyCollision);

		this.game.Duke.update();
		this.game.enemies.forEach(function(element, index, array) {element.update()});
	}
};

States.Play.prototype.checkPlayerEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.collide(this.game.Duke.colliderSprite, element.sprite, this.game.Duke.handleEnemyCollision, null, this);
}