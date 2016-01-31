function FollowingEnemy(game, health, x, y, wSpeed, rSpeed, facing, damage) {
	this.game = game;
	this.health = health;
	this.x = x;
	this.y = y;
	this.walk = wSpeed;
	this.run = rSpeed;
	this.damage = damage;
	this.sprite = null;
	this.spriteName = 'ghost';
	this.facing = facing; //Left=0; Right=1; Up=2; Down=3
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
	this.sprite.health = this.health;

	this.game.physics.arcade.enable(this.sprite);
	this.sprite.body.immovable = true;
	this.sprite.body.collideWorldBounds = true;

	this.sprite.animations.add('move', [0, 1], 10, true);
	this.sprite.play('move');
}

FollowingEnemy.prototype.update = function() {
	this.look();
	if (this.sprite.health <= 0) {
		this.sprite.kill();
	}
}

FollowingEnemy.prototype.move = function(direction) {
	switch (this.facing) {
		case 0:
			this.walkLeft();
			break;
		case 1:
			this.walkRight();
			break;
		case 2:
			this.walkUp();
			break;
		case 3:
			this.walkDown();
			break;
		default:
	}
	this.canMove.left = true;
	this.canMove.right = true;
	this.canMove.up = true;
	this.canMove.down = true;
}

FollowingEnemy.prototype.stop = function() {
	this.sprite.body.velocity.x = 0;
	this.sprite.body.velocity.y = 0;
}

FollowingEnemy.prototype.walkRight = function() {
	this.stop();
	this.sprite.body.velocity.x = this.walk;
}

FollowingEnemy.prototype.walkLeft = function() {
	this.stop();
	this.sprite.body.velocity.x = -this.walk;
}

FollowingEnemy.prototype.walkUp = function() {
	this.stop();
	this.sprite.body.velocity.y = -this.walk;
}

FollowingEnemy.prototype.walkDown = function() {
	this.stop();
	this.sprite.body.velocity.y = this.walk;
}

FollowingEnemy.prototype.runRight = function() {
	this.stop();
	this.sprite.body.velocity.x = this.run;
}

FollowingEnemy.prototype.runLeft = function() {
	this.stop();
	this.sprite.body.velocity.x = -this.run;
}

FollowingEnemy.prototype.runUp = function() {
	this.stop();
	this.sprite.body.velocity.y = -this.run;
}

FollowingEnemy.prototype.runDown = function() {
	this.stop();
	this.sprite.body.velocity.y = this.run;
}

FollowingEnemy.prototype.look = function() {
	if (this.game.Duke.colliderSprite.x < this.sprite.x &&
		Math.abs(this.game.Duke.colliderSprite.y - this.sprite.y) - this.game.Duke.colliderSprite.height / 2) {
		this.facing = 0;
		this.runLeft();
	} else if (this.game.Duke.colliderSprite.x > this.sprite.x &&
		Math.abs(this.game.Duke.colliderSprite.y - this.sprite.y) < this.game.Duke.colliderSprite.height / 2) {
		this.facing = 1;
		this.runRight();
	} else {
		if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
			switch (this.facing) {
				case 0:
					this.canMove.left = false;
					break;
				case 1:
					this.canMove.right = false;
					break;
				case 2:
					this.canMove.up = false;
					break;
				case 3:
					this.canMove.down = false;
					break;
				default:
					
			}

			if (this.canMove.up) {
				this.facing = 2;
				this.move();
			} else if (this.canMove.down) {
				this.facing = 3;
				this.move();
			} else if (this.canMove.left) {
				this.facing = 0;
				this.move();
			} else if (this.canMove.right) {
				this.facing = 1;
				this.move();
			}
		}
	}
}