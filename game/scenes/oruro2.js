States.Oruro2 = function(game){
};

States.Oruro2.prototype = {
	init: function() {
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function(){
		this.game.background = this.game.add.tileSprite(0, 0, 2048, 1474, 'oruro2');
		this.game.world.setBounds(0, 0, 2048, 1474);

		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.Duke.reset(1865, 87, 100);
		
		this.game.cursors = game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.game.Duke.colliderSprite);

		this.game.obstacles = this.game.add.group();
		this.game.obstacles.enableBody = true;
		this.createObstacle(0, 685, 350, 400);
		this.createObstacle(437, 757, 247, 200);
		this.createObstacle(400, 367, 300, 405);
		this.createObstacle(0, 50, 145, 229);
		this.createObstacle(158, 371, 135, 91);
		this.createObstacle(301, 160, 151, 71);
		this.createObstacle(55, 533, 137, 71);
		this.createObstacle(620, 0, 211, 208);
		this.createObstacle(868, 420, 231, 247);
		this.createObstacle(870, 813, 211, 205);
		this.createObstacle(853, 1269, 1195, 205);
		this.createObstacle(1097, 1073, 951, 203);
		this.createObstacle(1093, 0, 715, 623);
		this.createObstacle(1553, 830, 47, 51);
		this.createObstacle(1703, 950, 100, 43);

		//me lo paro "El taxi" me lo paroo
		this.game.taxi = this.createObstacle(72, 1108, 54, 54);

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

		this.game.music = this.game.add.audio('sanjose');
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

States.Oruro2.prototype.checkPlayerEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, element.sprite, this.game.Duke.handleEnemyCollision, null, this);
}

States.Oruro2.prototype.checkEnemyObstacleCollision = function(element, index, array) {
	this.game.physics.arcade.collide(element.sprite, this.game.obstacles);
}

States.Oruro2.prototype.createObstacle = function(x, y, width, height) {
	var obstacle = this.game.add.tileSprite(x, y, width, height, 'obstacle');
	obstacle.alpha = 0;
	this.game.obstacles.add(obstacle);
	obstacle.body.immovable = true;
	return obstacle;
}

States.Oruro2.prototype.handleItemCollision = function (duke, item) {

    this.game.Duke.health += item.health;
    this.game.Duke.speed += item.speed;

    if (item.weapon > -1) {
    	this.game.Duke.changeWeapon(item.weapon);
    }

    item.kill();
};

States.Oruro2.prototype.nextScene = function(duke, taxi) {
	globalDuke = this.game.Duke;
	this.state.start('CathedralOpen');
}