States.Mine = function(game){
};

States.Mine.prototype = {
	init: function() {
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function(){
		this.game.background = this.game.add.tileSprite(0, 0, 1340, 1000, 'mine');
		this.game.world.setBounds(0, 0, 1340, 1000);

		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.Duke.changeWeapon(0);
		this.game.Duke.reset(30, 909, 100);
		
		this.game.cursors = game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.game.Duke.colliderSprite);

		this.game.obstacles = this.game.add.group();
		this.game.obstacles.enableBody = true;
		this.createObstacle(0, 0, 559, 757);
		this.createObstacle(553, 289, 450, 81);
		this.createObstacle(850, 505, 53, 495);
		this.createObstacle(895, 600, 121, 400);
		this.createObstacle(1013, 745, 227, 255);
		this.createObstacle(1169, 0, 71, 493);
		this.createObstacle(561, 0, 691, 67);
		this.createObstacle(529, 47, 153, 255);
		this.createObstacle(841, 100, 161, 89);

		//me lo paro "El taxi" me lo paroo
		//this.game.taxi = this.createObstacle();

		this.game.collectibles = this.game.add.group();
		this.game.collectibles.enableBody = true;
		this.game.sword = new Collectible(game, 767, 171, 0, 0, -1, 'sword');
		this.game.collectibles.add(new Collectible(game, 50, 850, 100, -10, -1, 'barrilMoreno', 'legs', 'morenoLegs'));
		this.game.collectibles.add(new Collectible(game, 50, 900, 0, 0, 1, 'mascaraDiablo', 'head', 'diabloHead'));


		this.game.enemies = [];
		enemy = new ShootingEnemy(game, 50, 600, 480, 1);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new ShootingEnemy(game, 50, 740, 480, 1);
		enemy.render();
		this.game.enemies.push(enemy);

		var enemy = new FollowingEnemy(game, 100, 1150, 650, 50, 200, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);
		var enemy = new FollowingEnemy(game, 200, 1050, 650, 50, 300, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);

		enemy = new BasicEnemyY(game, 75, 130, 910, 150, 150, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new BasicEnemyY(game, 75, 220, 910, 150, 300, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new BasicEnemyY(game, 75, 340, 910, 150, 250, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new BasicEnemyY(game, 75, 490, 910, 150, 150, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);

		enemy = new BasicEnemyX(game, 100, 910, 170, 300, 300, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);
		enemy = new BasicEnemyX(game, 100, 910, 250, 300, 200, 1, 5);
		enemy.render();
		this.game.enemies.push(enemy);

		this.game.tio = new TioSupay(game, 350, 550, 750, 100, 2)
		this.game.tio.render();
		this.game.enemies.push(this.game.tio);
		this.game.tio.sprite.visible = false;

		this.game.redSplash = this.game.add.sprite(0, 0, 'redSplash');
		this.game.redSplash.alpha = 0;
		this.game.redSplash.fixedToCamera = true;

		this.game.music = this.game.add.audio('chiruchiru');
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
			//this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.game.taxi, this.nextScene, null, this);
			this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, this.game.sword, this.collectSword, null, this);
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

States.Mine.prototype.checkPlayerEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, element.sprite, this.game.Duke.handleEnemyCollision, null, this);
}

States.Mine.prototype.checkEnemyObstacleCollision = function(element, index, array) {
	this.game.physics.arcade.collide(element.sprite, this.game.obstacles);
}

States.Mine.prototype.createObstacle = function(x, y, width, height) {
	var obstacle = this.game.add.tileSprite(x, y, width, height, 'obstacle');
	obstacle.alpha = 0;
	this.game.obstacles.add(obstacle);
	obstacle.body.immovable = true;
	return obstacle;
}

States.Mine.prototype.handleItemCollision = function (duke, item) {
	if(item.bodyPart){
		this.game.Duke.changeSprite(item.indentifier, item.bodyPart);
	}

    this.game.Duke.health += item.health;
    this.game.Duke.speed += item.speed;

    if (item.weapon > -1) {
    	this.game.Duke.changeWeapon(item.weapon);
    }

    item.kill();
};

States.Mine.prototype.collectSword = function (duke, item) {
    item.kill();
    this.game.tio.sprite.visible = true;
    this.game.tio.weapon.visible = true;
};

/*States.Terminal.prototype.nextScene = function(duke, taxi) {
	this.state.start('');
}*/