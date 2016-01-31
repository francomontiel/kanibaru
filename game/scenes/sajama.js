States.Sajama = function(game){
};

States.Sajama.prototype = {
	init: function() {
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function(){
		this.game.background = this.game.add.tileSprite(0, 0, 1100, 762, 'sajama');
		this.game.world.setBounds(0, 0, 1100, 762);

		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.Duke.reset(25, 613, 100);
		
		this.game.cursors = game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.game.Duke.colliderSprite);

		this.game.obstacles = this.game.add.group();
		this.game.obstacles.enableBody = true;
		this.createObstacle(0, 0, 1100, 415);
		this.createObstacle(800, 374, 235, 198);

		//me lo paro "El taxi" me lo paroo
		//this.game.taxi = this.createObstacle(593, 584, 59, 53);

		this.game.collectibles = this.game.add.group();
		this.game.collectibles.enableBody = true;
		this.game.collectibles.add(new Collectible(game, 590, 580, 0, 0, 0, 'sling'));

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
			this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, this.game.collectibles, this.handleItemCollision, null, this);

			this.game.Duke.update();
			this.game.enemies.forEach(function(element, index, array) {element.update()});
		} else {
			this.game.Duke.colliderSprite.body.velocity.x = 0;
	   		this.game.Duke.colliderSprite.body.velocity.y = 0;	
			this.game.currentCutscene.update();
		}
	}
};

States.Sajama.prototype.checkPlayerEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, element.sprite, this.game.Duke.handleEnemyCollision, null, this);
}

States.Sajama.prototype.checkEnemyObstacleCollision = function(element, index, array) {
	this.game.physics.arcade.collide(element.sprite, this.game.obstacles);
}

States.Sajama.prototype.createObstacle = function(x, y, width, height) {
	var obstacle = this.game.add.tileSprite(x, y, width, height, 'obstacle');
	obstacle.alpha = 0;
	this.game.obstacles.add(obstacle);
	obstacle.body.immovable = true;
	return obstacle;
}

States.Sajama.prototype.handleItemCollision = function (duke, item) {

    this.game.Duke.health += item.health;
    this.game.Duke.speed += item.speed;

    if (item.weapon > -1) {
    	this.game.Duke.changeWeapon(item.weapon);
    }

    item.kill();
    this.nextScene();
};

States.Sajama.prototype.nextScene = function(duke, taxi) {
	//globalDuke = this.game.Duke;
	this.game.music.stop();
	this.state.start('Oruro2');
}