States.CathedralOpen = function(game){
};

States.CathedralOpen.prototype = {
	init: function() {
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function(){
		this.game.background = this.game.add.tileSprite(0, 0, 2200, 1430, 'cathedralOpen');
		this.game.world.setBounds(0, 0, 2200, 1430);

		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.Duke.reset(1567, 1317, 100);
		
		this.game.cursors = game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.game.Duke.colliderSprite);

		this.game.obstacles = this.game.add.group();
		this.game.obstacles.enableBody = true;
		this.createObstacle(751, 747, 785, 335);
		this.createObstacle(1513, 789, 311, 178);
		this.createObstacle(813, 0, 707, 183);
		this.createObstacle(763, 285, 763, 263);
		this.createObstacle(1513, 345, 327, 177);
		this.createObstacle(516, 773, 33, 390);
		this.createObstacle(516, 220, 33, 390);
		this.createObstacle(337, 587, 91, 243);
		this.createObstacle(0, 0, 225, 1429);
		this.createObstacle(1803, 0, 154, 267);
		this.createObstacle(2093, 0, 107, 311);

		//me lo paro "El taxi" me lo paroo
		this.game.taxi = this.createObstacle(1960, 86, 146, 106);

		this.game.collectibles = this.game.add.group();
		//this.game.collectibles.enableBody = true;
		//this.game.collectibles.add(new Collectible(game, 650, 800, 0, 0, 0, 'sling'));

		this.game.enemies = [];
		//var enemy = new BasicEnemyX(game, 50, 195, 406, 100, 100, 0, 1);
		//var enemy = new ShootingEnemy(game, 50, 195, 406 ,0);
		//enemy.render();
		//this.game.enemies.push(enemy);

		this.game.redSplash = this.game.add.sprite(0, 0, 'redSplash');
		this.game.redSplash.alpha = 0;
		this.game.redSplash.fixedToCamera = true;

		this.game.music = this.game.add.audio('idilio');
		this.game.music.loop = true;
		this.game.music.play();
		this.game.isWaiting = false;

		//this.game.currentCutscene = new Cutscene(this.game, 1000, 'cutscene1');
		//this.game.currentCutscene.render();
		//this.game.currentCutscene.start();
	},
	update: function(){
		if (!this.game.isWaiting) {
			this.game.redSplash.alpha = 0;
			this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.game.taxi, this.nextScene, null, this);
			this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.game.obstacles);
			this.game.enemies.forEach(this.checkPlayerEnemyCollision);
			this.game.enemies.forEach(this.checkEnemyObstacleCollision);
			//this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, this.game.collectibles, this.handleItemCollision, null, this);

			this.game.Duke.update();
			this.game.enemies.forEach(function(element, index, array) {element.update()});
		} else {
			this.game.Duke.colliderSprite.body.velocity.x = 0;
	   		this.game.Duke.colliderSprite.body.velocity.y = 0;	
			this.game.currentCutscene.update();
		}
	}
};

States.CathedralOpen.prototype.checkPlayerEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, element.sprite, this.game.Duke.handleEnemyCollision, null, this);
}

States.CathedralOpen.prototype.checkEnemyObstacleCollision = function(element, index, array) {
	this.game.physics.arcade.collide(element.sprite, this.game.obstacles);
}

States.CathedralOpen.prototype.createObstacle = function(x, y, width, height) {
	var obstacle = this.game.add.tileSprite(x, y, width, height, 'obstacle');
	obstacle.alpha = 0;
	this.game.obstacles.add(obstacle);
	obstacle.body.immovable = true;
	return obstacle;
}

States.CathedralOpen.prototype.handleItemCollision = function (duke, item) {

    this.game.Duke.health += item.health;
    this.game.Duke.speed += item.speed;

    if (item.weapon > -1) {
    	this.game.Duke.changeWeapon(item.weapon);
    }

    item.kill();
};

States.CathedralOpen.prototype.nextScene = function(duke, taxi) {
	globalDuke = this.game.Duke;
	this.state.start('Mine');
}