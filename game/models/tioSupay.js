function TioSupay(game, health, x, y, range, facing) {
	this.game = game;
	this.health = health;
	this.x = x;
	this.y = y;
	this.limitL = x - range;
	this.limitR = x + range;
	this.facing = facing;
	this.sprite = null;
	this.spriteName = 'supay';
	this.weapon = null;
	this.damage = 20;
	this.angle = 0;
	this.speed = 40;
	this.floatTime = 100;
}

TioSupay.prototype.render = function() {
	this.sprite = this.game.add.sprite(this.x, this.y, this.spriteName);
	this.sprite.playerDamage = this.damage;
	this.sprite.health = this.health;

	this.weapon = new Weapon.Hellfire(this.game);
	this.weapon.visible = false;

	this.game.physics.arcade.enable(this.sprite);
	this.sprite.body.immovable = true;
	this.sprite.body.velocity.y = 10;

	this.moveRight();

	this.sprite.play('move');
}

TioSupay.prototype.update = function() {
	if (this.sprite.health <= 0) {
		this.sprite.kill();
		this.weapon.kill();
	}
	this.floatTime--;
	if (this.floatTime < 0) {
		this.floatTime = 100;
		this.sprite.body.velocity.y *= -1;
	}

	this.angle++;
	if (this.angle >= 360) {
		this.angle = 0;
	}

	if (this.sprite.x <= this.limitL) {
		this.moveRight();
	}
	if (this.sprite.x >= this.limitR) {
		this.moveLeft();
	}

	this.weapon.fire(this.sprite, this.angle);
	this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.weapon, this.game.Duke.handleBulletCollision, null, this)
	this.game.physics.arcade.collide(this.weapon, this.game.obstacles, this.handleBulletObstacleCollision, null, this);
}

TioSupay.prototype.moveRight = function() {
	this.sprite.body.velocity.x = this.speed;
}

TioSupay.prototype.moveLeft = function() {
	this.sprite.body.velocity.x = -this.speed;
}

TioSupay.prototype.handleBulletObstacleCollision = function(bullet, obstacle) {
	bullet.kill();
}