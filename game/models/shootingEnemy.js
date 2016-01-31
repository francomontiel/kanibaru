function ShootingEnemy(game, health, x, y, facing) {
	this.game = game;
	this.health = health;
	this.x = x;
	this.y = y;
	this.facing = facing;
	this.sprite = null;
	this.spriteName = 'bat';
	this.weapon = null;
}

ShootingEnemy.prototype.render = function() {
	this.sprite = this.game.add.sprite(this.x, this.y, this.spriteName);
	this.sprite.playerDamage = this.damage;
	this.sprite.health = this.health;

	this.weapon = new Weapon.BlueBullet(this.game);
	this.weapon.visible = true;

	this.game.physics.arcade.enable(this.sprite);
	this.sprite.body.immovable = true;

	this.sprite.animations.add('move', [0, 1, 2], 10, true);
	this.sprite.play('move');
}

ShootingEnemy.prototype.update = function() {
	if (this.sprite.health <= 0) {
		this.sprite.kill();
		this.weapon.kill();
	}
	this.weapon.fire(this.sprite, this.facing);
	this.game.physics.arcade.collide(this.game.Duke.colliderSprite, this.weapon, this.game.Duke.handleBulletCollision, null, this)
	this.game.physics.arcade.collide(this.weapon, this.game.obstacles, this.handleBulletObstacleCollision, null, this);
}

ShootingEnemy.prototype.handleBulletObstacleCollision = function(bullet, obstacle) {
	bullet.kill();
}