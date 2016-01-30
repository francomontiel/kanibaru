
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

		this.game.enemy = new BasicEnemyX(game, 50, 400, 400, 100, 100, 0);
		this.game.enemy.render();
	},
	update: function(){
		this.game.Duke.collided = 0;
		this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.game.obstacles, this.checkPlayerObstaclesCollision, null, this);
		this.game.Duke.update();
		this.game.enemy.update();
	}
};

States.Play.prototype.checkPlayerObstaclesCollision = function() {
		this.game.Duke.headSprite.body.velocity.y = 0;
		this.game.Duke.torsoSprite.body.velocity.y = 0;
		this.game.Duke.legsSprite.body.velocity.y = 0;
		this.game.Duke.headSprite.body.velocity.x = 0;
		this.game.Duke.torsoSprite.body.velocity.x = 0;
		this.game.Duke.legsSprite.body.velocity.x = 0;
		this.game.Duke.collided = 1;
	}