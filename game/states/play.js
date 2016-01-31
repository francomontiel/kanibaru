
States.Play = function(game){
};


States.Play.prototype = {
	init: function() {
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function(){
		this.state.start('CathedralClosed');
		//this.game.background = this.game.add.sprite(this.game.world.centerX - 190, this.game.world.centerY - 40, 'title');
		/*this.game.background = this.game.add.tileSprite(0, 0, 1500, 1199, 'map1');
		this.game.world.setBounds(0, 0, 1500, 1199);
		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.cursors = game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.game.Duke.colliderSprite);

		this.game.obstacles = this.game.add.group();
		this.game.obstacles.enableBody = true;

		//var obstacle = this.game.obstacles.create(300, 200, 'obstacle');
		//obstacle.body.immovable = true;

		this.game.enemies = [];
		var enemy = new BasicEnemyX(game, 50, 200, 330, 150, 100, 0, 10);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new BasicEnemyY(game, 50, 600, 350, 100, 100, 0, 10);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new FollowingEnemy(game, 50, 400, 200, 100, 300, 0, 50);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new ShootingEnemy(game, 50, 100, 150, 1);
		enemy.render();
		this.game.enemies.push(enemy);

		this.game.redSplash = this.game.add.sprite(0, 0, 'redSplash');
		this.game.redSplash.alpha = 0;
		this.game.redSplash.fixedToCamera = true;*/
	},
	update: function(){
		/*this.game.redSplash.alpha = 0;
		this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.game.obstacles);
		this.game.enemies.forEach(this.checkPlayerEnemyCollision);
		this.game.enemies.forEach(this.checkEnemyObstacleCollision);

		this.game.Duke.update();
		this.game.enemies.forEach(function(element, index, array) {element.update()});*/
	}
};

States.Play.prototype.checkPlayerEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, element.sprite, this.game.Duke.handleEnemyCollision, null, this);
}

States.Play.prototype.checkEnemyObstacleCollision = function(element, index, array) {
	this.game.physics.arcade.collide(element.sprite, this.game.obstacles);
}