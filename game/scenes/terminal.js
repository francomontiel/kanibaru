States.Terminal = function(game){
};

States.Terminal.prototype = {
	init: function() {
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function(){
		this.game.background = this.game.add.tileSprite(0, 0, 1500, 1199, 'map1');
		this.game.world.setBounds(0, 0, 1500, 1199);

		this.game.Duke = new Duke(this.game);
		this.game.Duke.render(this.game);
		this.game.Duke.reset(595, 975, 100);
		
		this.game.cursors = game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.game.Duke.colliderSprite);

		this.game.obstacles = this.game.add.group();
		this.game.obstacles.enableBody = true;
		this.createObstacle(0, 0, 794, 300);
		this.createObstacle(1165, 0, 345, 1083);
		this.createObstacle(820, 490, 380, 320);
		this.createObstacle(0, 471, 322, 728);
		this.createObstacle(442, 581, 127, 237);
		this.createObstacle(442, 936, 127, 247);

		//El taxi
		this.createObstacle(1049, 21, 103, 115);

		this.game.collectibles = this.game.add.group();
		this.game.collectibles.enableBody = true;
		this.game.collectibles.add(new Collectible(game, 650, 800, 0, 0, 0, 'sling'));

		this.game.enemies = [];
		var enemy = new BasicEnemyX(game, 50, 195, 406, 100, 100, 0, 1);
		//var enemy = new ShootingEnemy(game, 50, 195, 406 ,0);
		enemy.render();
		this.game.enemies.push(enemy);

		this.game.redSplash = this.game.add.sprite(0, 0, 'redSplash');
		this.game.redSplash.alpha = 0;
		this.game.redSplash.fixedToCamera = true;

		this.game.music = this.game.add.audio('chiruchiru');
		this.game.music.loop = true;
		this.game.music.play();
		this.game.waiting = false;

		this.game.currentCutscene = new Cutscene(game, 1000, 'cutscene1');
		this.game.currentCutscene.render();
		this.game.currentCutscene.start();
	},
	update: function(){
		if (!this.game.waiting) {
			this.game.redSplash.alpha = 0;
			this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.game.obstacles);
			this.game.enemies.forEach(this.checkPlayerEnemyCollision);
			this.game.enemies.forEach(this.checkEnemyObstacleCollision);
			this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, this.game.collectibles, this.handleItemCollision, null, this);

			this.game.Duke.update();
			this.game.enemies.forEach(function(element, index, array) {element.update()});
		} else {
			this.game.currentCutscene.update();
		}
	}
};

States.Terminal.prototype.checkPlayerEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.overlap(this.game.Duke.colliderSprite, element.sprite, this.game.Duke.handleEnemyCollision, null, this);
}

States.Terminal.prototype.checkEnemyObstacleCollision = function(element, index, array) {
	this.game.physics.arcade.collide(element.sprite, this.game.obstacles);
}

States.Terminal.prototype.createObstacle = function(x, y, width, height) {
	var obstacle = this.game.add.tileSprite(x, y, width, height, 'obstacle');
	obstacle.alpha = 0;
	this.game.obstacles.add(obstacle);
	obstacle.body.immovable = true;
}

States.Terminal.prototype.handleItemCollision = function (duke, item) {

    this.game.Duke.health += item.health;
    this.game.Duke.speed += item.speed;

    if (item.weapon > -1) {
    	this.game.Duke.changeWeapon(item.weapon);
    }

    item.kill();
};