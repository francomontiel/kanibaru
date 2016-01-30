function BasicEnemyX(game, health, x, y, xRange, speed, direction) {
	this.game = game;
	this.health = health;
	this.x = x;
	this.y = y;
	this.limitL = x - xRange;
	this.limitR = x + xRange;
	this.xRange = xRange;
	this.speed = speed;
	this.direction = direction; //0=left; 1=right
	this.sprite = null;
	this.spriteName = 'basicEnemy';
}

BasicEnemyX.prototype.render = function() {
	this.sprite = this.game.add.sprite(this.x, this.y, 'enemy1');

	this.game.physics.arcade.enable(this.sprite);

	this.sprite.animations.add('move', [0, 1], 10, true);

	if (this.direction) {
		this.moveRight();
	} else {
		this.moveLeft();
	}
	this.sprite.play('move');
}

BasicEnemyX.prototype.update = function() {
	if (this.x <= this.limitL) {
		this.moveRight();
	}
	if (this.x >= this.limitR) {
		this.moveLeft();
	}
}

BasicEnemyX.prototype.moveRight = function() {
	this.sprite.body.velocity.x = this.speed;
}

BasicEnemyX.prototype.moveLeft = function() {
	this.sprite.body.velocity.x = -this.speed;
}