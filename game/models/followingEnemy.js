/*function FollowingEnemy(game, health, x, y, range, wSpeed, rSpeed, facing, damage) {
	this.game = game;
	this.health = health;
	this.x = x;
	this.y = y;
	this.limitL = x - range;
	this.limitR = x + range;
	this.walk = wSpeed;
	this.run = rSpeed;
	this.damage = damage;
	this.sprite = null;
	this.spriteName = 'enemy1';
	this.facing = 1; //Left=0; Right=1; Up=2; Down=3
	this.canMove = {
		left: true,
		right: true,
		up: true,
		down: true
	};
}

FollowingEnemy.prototype.render = function() {
	this.sprite = this.game.add.sprite(this.x, this.y, this.spriteName);
	this.sprite.playerDamage = this.damage;

	this.game.physics.arcade.enable(this.sprite);
	this.sprite.body.immovable = true;

	this.sprite.animations.add('move', [0, 1], 10, true);
	this.sprite.play('move');
}

FollowingEnemy.prototype.update = function() {
	if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
		if (this.canMove.up) {
		} else if (this.canMove.down) {
		} else if (this.canMove.left) {
		} else if (this.canMove.right) {
		}
	}

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

FollowingEnemy.prototype.tryMove = function(direction) {
	switch (direction) {
		case 0:
			facing
	}
}

FollowingEnemy.prototype.walkRight = function() {
	this.sprite.body.velocity.x = this.walk;
}

FollowingEnemy.prototype.walkLeft = function() {
	this.sprite.body.velocity.x = -this.walk;
}

FollowingEnemy.prototype.walkUp = function() {
	this.sprite.body.velocity.y = -this.walk;
}

FollowingEnemy.prototype.walkDown = function() {
	this.sprite.body.velocity.y = this.walk;
}

FollowingEnemy.prototype.runRight = function() {
	this.sprite.body.velocity.x = this.run;
}

FollowingEnemy.prototype.runLeft = function() {
	this.sprite.body.velocity.x = -this.run;
}

FollowingEnemy.prototype.runUp = function() {
	this.sprite.body.velocity.y = -this.run;
}

FollowingEnemy.prototype.runDown = function() {
	this.sprite.body.velocity.y = this.run;
}*/