function BasicEnemyX(game, health, x, y, range, speed, direction, damage) {
	this.game = game;
	this.health = health;
	this.x = x;
	this.y = y;
	this.limitL = x - range;
	this.limitR = x + range;
	this.speed = speed;
	this.direction = direction; //0=left; 1=right
	this.damage = damage;
	this.sprite = null;
	this.spriteName = 'basicEnemy';
}

BasicEnemyX.prototype.render = function() {
	this.sprite = this.game.add.sprite(this.x, this.y, 'enemy1');
	this.sprite.playerDamage = this.damage;

	this.game.physics.arcade.enable(this.sprite);
	this.sprite.body.immovable = true;

	this.sprite.animations.add('move', [0, 1], 10, true);

	if (this.direction) {
		this.moveRight();
	} else {
		this.moveLeft();
	}
	this.sprite.play('move');
}

BasicEnemyX.prototype.update = function() {
	if (this.health <= 0) {
		this.sprite.kill();
	}
	if (this.sprite.x <= this.limitL) {
		this.moveRight();
	}
	if (this.sprite.x >= this.limitR) {
		this.moveLeft();
	}
}

BasicEnemyX.prototype.moveRight = function() {
	this.sprite.body.velocity.x = this.speed;
}

BasicEnemyX.prototype.moveLeft = function() {
	this.sprite.body.velocity.x = -this.speed;
}


function BasicEnemyY(game, health, x, y, range, speed, direction, damage) {
	this.game = game;
	this.health = health;
	this.x = x;
	this.y = y;
	this.limitU = y - range;
	this.limitD = y + range;
	this.speed = speed;
	this.direction = direction; //0=up; 1=down
	this.damage = damage;
	this.sprite = null;
	this.spriteName = 'basicEnemy';
}

BasicEnemyY.prototype.render = function() {
	this.sprite = this.game.add.sprite(this.x, this.y, 'enemy1');
	this.sprite.playerDamage = this.damage;

	this.game.physics.arcade.enable(this.sprite);
	this.sprite.body.immovable = true;

	this.sprite.animations.add('move', [0, 1], 10, true);

	if (this.direction) {
		this.moveDown();
	} else {
		this.moveUp();
	}
	this.sprite.play('move');
}

BasicEnemyY.prototype.update = function() {
	if (this.health <= 0) {
		this.sprite.kill();
	}
	if (this.sprite.y <= this.limitU) {
		this.moveDown();
	}
	if (this.sprite.y >= this.limitD) {
		this.moveUp();
	}
}

BasicEnemyY.prototype.moveDown = function() {
	this.sprite.body.velocity.y = this.speed;
}

BasicEnemyY.prototype.moveUp = function() {
	this.sprite.body.velocity.y = -this.speed;
}