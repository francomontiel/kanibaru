function Duke(game){
	this.game = game;
	this.health = 100;
	this.headSprite = null;
	this.torsoSprite = null;
	this.legsSprite = null;
	this.headAnimation = 'normalHead';
	this.torsoAnimation = 'normalTorso';
	this.legsAnimation = 'normalLegs';
	this.speed = 550;
	this.facing = 0; //Left=0; Right=1; Up=2; Down=3
	this.sprite = null;
	this.timeDamaged = 0;
	this.weapons = [];
	this.currentWeapon = -1;
	this.isMoving = false;
	this.chargeTime = 0;
}

Duke.prototype.update = function(){
	if (this.game.Duke.health <= 0) {
		this.game.Duke.headSprite.kill();
		this.game.Duke.torsoSprite.kill();
		this.game.Duke.legsSprite.kill();
		this.game.Duke.colliderSprite.kill();
	}

	this.game.Duke.colliderSprite.body.velocity.y = 0;
	this.game.Duke.colliderSprite.body.velocity.x = 0;

	this.handleKeyDown();
	//this.handleKeyUp();
	if (this.game.Duke.currentWeapon > -1) {
		this.game.physics.arcade.collide(this.game.Duke.weapons[this.game.Duke.currentWeapon], this.game.obstacles);
		this.game.enemies.forEach(this.handleBulletEnemyCollision);
	}

	this.game.Duke.timeDamaged--;
	if (this.game.Duke.timeDamaged > 40) {
		this.game.redSplash.alpha = 0.2;
	} else {
		this.game.redSplash.alpha = 0;
	}
};

Duke.prototype.changeSprite = function(newSprite, type){
	if(type == 'legs'){
		this.legsAnimation = newSprite;
		this.legsSprite.kill();
		this.legsSprite = this.game.add.sprite(this.colliderSprite.x, this.colliderSprite.y, newSprite);
	}

	if(type == 'torso'){
		this.torsoAnimation = newSprite;
		this.torsoSprite.kill();
		this.torsoSprite = this.game.add.sprite(this.colliderSprite.x, this.colliderSprite.y, newSprite);
	}

	if(type == 'head'){
		this.headAnimation = newSprite;
		this.headSprite.kill();
		this.headSprite = this.game.add.sprite(this.colliderSprite.x, this.colliderSprite.y, newSprite);
	}

	this.loadAnimations();
};

Duke.prototype.loadAnimations = function(){
	this.headSprite.animations.add(this.headAnimation + 'Left', [0], 1, true);
	this.headSprite.animations.add(this.headAnimation + 'Right', [1], 1, true);
	this.headSprite.animations.add(this.headAnimation + 'Up', [2], 1, true);
	this.headSprite.animations.add(this.headAnimation + 'Down', [3], 1, true);

	this.torsoSprite.animations.add(this.torsoAnimation + 'Left', [9, 10, 9, 11], 10, true);
	this.torsoSprite.animations.add(this.torsoAnimation + 'Right', [3, 4, 3, 5], 10, true);
	this.torsoSprite.animations.add(this.torsoAnimation + 'Up', [0, 1, 0, 2], 10, true);
	this.torsoSprite.animations.add(this.torsoAnimation + 'Down', [6, 7, 6, 8], 10, true);

	this.legsSprite.animations.add(this.legsAnimation + 'Left', [9, 10, 9, 11], 10, true);
	this.legsSprite.animations.add(this.legsAnimation + 'Right', [3, 4, 3, 5], 10, true);
	this.legsSprite.animations.add(this.legsAnimation + 'Up', [0, 1, 0, 2], 10, true);
	this.legsSprite.animations.add(this.legsAnimation + 'Down', [6, 7, 6, 8], 10, true);
};

Duke.prototype.animate = function(direction){
	this.headSprite.play(this.headAnimation + direction);
	this.torsoSprite.play(this.torsoAnimation + direction);
	this.legsSprite.play(this.legsAnimation + direction);
}

Duke.prototype.handleKeyDown = function() {
	this.isMoving = false;
	if (this.game.cursors.up.isDown){
		this.facing = 2;
		this.isMoving = true;

		this.game.Duke.colliderSprite.body.velocity.y = -this.speed;

		this.animate('Up');
	}
	else if (this.game.cursors.down.isDown){
		this.facing = 3;
		this.isMoving = true;

		this.game.Duke.colliderSprite.body.velocity.y = this.speed;

		this.animate('Down');
	}
	else if (this.game.cursors.left.isDown){
		this.facing = 0;
		this.isMoving = true;

		this.game.Duke.colliderSprite.body.velocity.x = -this.speed;

		this.animate('Left');
	}
	else if (this.game.cursors.right.isDown){
		this.facing = 1;
		this.isMoving = true;

		this.game.Duke.colliderSprite.body.velocity.x = this.speed;

		this.animate('Right');
	} else if (!this.isMoving) {
		//Left=0; Right=1; Up=2; Down=3
		switch (this.facing) {
			case 0:
				this.headSprite.frame = 0;
				this.torsoSprite.frame = 9;
				this.legsSprite.frame = 9;
				break;
			case 1:
				this.headSprite.frame = 1;
				this.torsoSprite.frame = 3;
				this.legsSprite.frame = 3;
				break;
			case 2:
				this.headSprite.frame = 2;
				this.torsoSprite.frame = 0;
				this.legsSprite.frame = 0;
				break;
			case 3:
				this.headSprite.frame = 3;
				this.torsoSprite.frame = 6;
				this.legsSprite.frame = 6;
				break;
			default:
		}
	}

	if (this.game.Duke.currentWeapon > -1 && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.chargeTime++;
	}

	this.headSprite.x = this.colliderSprite.x - this.headSprite.width * 2 / 5;
	this.headSprite.y = this.colliderSprite.y - this.headSprite.height * 2 / 5;
	this.torsoSprite.x = this.headSprite.x;
	this.torsoSprite.y = this.headSprite.y;
	this.legsSprite.x = this.headSprite.x;
	this.legsSprite.y = this.headSprite.y;
}


Duke.prototype.handleKeyUp = function(e) {
	if (this.game.Duke.currentWeapon > -1 && e.keyCode == Phaser.Keyboard.SPACEBAR) {
		var dangle = 10 - Math.min(15, this.game.Duke.chargeTime / 3);
		var dspeed = Math.min(300, this.game.Duke.chargeTime * 10);
		this.game.Duke.chargeTime++;
		this.game.Duke.weapons[this.game.Duke.currentWeapon].fire(this.game, this.game.Duke.colliderSprite, this.game.Duke.facing, dangle, dspeed);
		this.game.Duke.chargeTime = 0;
	}
}

Duke.prototype.render = function(){
	this.colliderSprite = this.game.add.sprite(10, 230, 'dukeCollider');

	this.normalheadSprite = this.game.add.sprite(10, 230, 'normalHead');
	this.normaltorsoSprite = this.game.add.sprite(10, 230, 'normalTorso');
	this.normallegsSprite = this.game.add.sprite(10, 230, 'normalLegs');

	this.headSprite = this.normalheadSprite;
	this.torsoSprite = this.normaltorsoSprite;
	this.legsSprite = this.normallegsSprite;

	this.colliderSprite.alpha = 0;

	this.game.physics.arcade.enable(this.colliderSprite);
	this.game.physics.arcade.enable(this.headSprite);
	this.game.physics.arcade.enable(this.torsoSprite);
	this.game.physics.arcade.enable(this.legsSprite);

	this.colliderSprite.immovable = true;
	this.colliderSprite.body.collideWorldBounds = true;


	this.loadAnimations();


	this.colliderSprite.anchor.setTo(0.5, 0.5);
	this.colliderSprite.x = this.headSprite.x + this.headSprite.width / 2;
	this.colliderSprite.y = this.headSprite.y + this.headSprite.height / 2;
	//this.colliderSprite.angle = 135;

	//this.weapons.push(new Weapon.FirestoneBullet(this.game));
	this.weapons.push(new Weapon.StoneBullet(this.game));
	this.weapons.push(new Weapon.FirestoneBullet(this.game));
	for (var i = 0; i < this.weapons.length; i++) {
		if (i != this.currentWeapon) {
			this.weapons[i].visible = false;
		}
	}

	this.game.input.keyboard.onUpCallback = this.game.Duke.handleKeyUp;
};


Duke.prototype.handleEnemyCollision = function(duke, enemy){
	if (this.game.Duke.timeDamaged <= 0 && this.game.Duke.health > 0) {
		this.game.Duke.health -= enemy.playerDamage;
		this.game.Duke.timeDamaged = 50;
	}
}

Duke.prototype.handleBulletCollision = function(duke, bullet){
	bullet.kill();
	if (this.game.Duke.timeDamaged <= 0 && this.game.Duke.health > 0) {
		this.game.Duke.health -= bullet.damage;
		this.game.Duke.timeDamaged = 50;
		console.log(this.game.Duke.health);
	}
}

Duke.prototype.reset = function(x, y, health) {
	this.game.Duke.colliderSprite.x = x;
	this.game.Duke.colliderSprite.y = y;
	this.game.Duke.health = health;
}

Duke.prototype.changeWeapon = function(weapon) {
	if (this.game.Duke.currentWeapon > -1) {
		this.game.Duke.weapons[this.game.Duke.currentWeapon].visible = false;
		this.game.Duke.weapons[this.game.Duke.currentWeapon].callAll('reset', null, 0, 0);
		this.game.Duke.weapons[this.game.Duke.currentWeapon].setAll('exists', false);
	}

	this.game.Duke.currentWeapon = weapon;
	this.game.Duke.weapons[this.game.Duke.currentWeapon].visible = true;
}

Duke.prototype.handleBulletEnemyCollision = function(element, index, array) {
	this.game.physics.arcade.collide(element.sprite, this.game.Duke.weapons[this.game.Duke.currentWeapon], this.game.Duke.hurtEnemy, null, this);
}

Duke.prototype.hurtEnemy = function(enemy, bullet) {
	enemy.health -= bullet.damage;
	//bullet.kill();
}

var globalDuke;
