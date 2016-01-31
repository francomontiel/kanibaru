function Duke(game){
	this.game = game;
	this.health = 100;
	this.headSprite = null;
	this.torsoSprite = null;
	this.legsSprite = null;
	this.head = 'normalHead';
	this.torso = 'normalTorso';
	this.legs = 'normalLegs';
	this.speed = 150;
	this.facing = 0; //Left=0; Right=1; Up=2; Down=3
	this.sprite = null;
	this.timeDamaged = 0;
	this.weapons = [];
	this.currentWeapon = 0;
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

	this.game.Duke.timeDamaged--;
	if (this.game.Duke.timeDamaged > 40) {
		this.game.redSplash.alpha = 0.2;
	} else {
		this.game.redSplash.alpha = 0;
	}
};

Duke.prototype.handleKeyDown = function() {
	this.isMoving = false;
	if (this.game.cursors.up.isDown){
		this.facing = 2;
		this.isMoving = true;

		//this.game.Duke.headSprite.body.velocity.y = -this.speed;
		//this.game.Duke.torsoSprite.body.velocity.y = -this.speed;
		//this.game.Duke.legsSprite.body.velocity.y = -this.speed;
		this.game.Duke.colliderSprite.body.velocity.y = -this.speed;

		this.headSprite.play('normalHeadUp');
		this.torsoSprite.play('normalTorsoUp');
		this.legsSprite.play('normalLegsUp');
	}
	else if (this.game.cursors.down.isDown){
		this.facing = 3;
		this.isMoving = true;

		//this.game.Duke.headSprite.body.velocity.y = this.speed;
		//this.game.Duke.torsoSprite.body.velocity.y = this.speed;
		//this.game.Duke.legsSprite.body.velocity.y = this.speed;
		this.game.Duke.colliderSprite.body.velocity.y = this.speed;

		this.headSprite.play('normalHeadDown');
		this.torsoSprite.play('normalTorsoDown');
		this.legsSprite.play('normalLegsDown');
	}
	else if (this.game.cursors.left.isDown){
		this.facing = 0;
		this.isMoving = true;

		//this.game.Duke.headSprite.body.velocity.x = -this.speed;
		//this.game.Duke.torsoSprite.body.velocity.x = -this.speed;
		//this.game.Duke.legsSprite.body.velocity.x = -this.speed;
		this.game.Duke.colliderSprite.body.velocity.x = -this.speed;

		this.headSprite.play('normalHeadLeft');
		this.torsoSprite.play('normalTorsoLeft');
		this.legsSprite.play('normalLegsLeft');
	}
	else if (this.game.cursors.right.isDown){
		this.facing = 1;
		this.isMoving = true;

		//this.game.Duke.headSprite.body.velocity.x = this.speed;
		//this.game.Duke.torsoSprite.body.velocity.x = this.speed;
		//this.game.Duke.legsSprite.body.velocity.x = this.speed;
		this.game.Duke.colliderSprite.body.velocity.x = this.speed;

		this.headSprite.play('normalHeadRight');
		this.torsoSprite.play('normalTorsoRight');
		this.legsSprite.play('normalLegsRight');
	} else if (!this.isMoving) {
		// this.headSprite.animations.stop();
		// this.torsoSprite.animations.stop();
		// this.legsSprite.animations.stop();
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

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.chargeTime++;
	}

	this.headSprite.x = this.colliderSprite.x - this.headSprite.width / 2;
	this.headSprite.y = this.colliderSprite.y - this.headSprite.height / 2;
	this.torsoSprite.x = this.headSprite.x;
	this.torsoSprite.y = this.headSprite.y;
	this.legsSprite.x = this.headSprite.x;
	this.legsSprite.y = this.headSprite.y;
}

Duke.prototype.handleKeyUp = function(e) {
	if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
		var dangle = 25 - Math.min(25, this.game.Duke.chargeTime / 8);
		var dspeed = Math.min(300, this.game.Duke.chargeTime * 5);
		this.game.Duke.chargeTime++;
		this.game.Duke.weapons[this.game.Duke.currentWeapon].fire(this.game.Duke.colliderSprite, this.game.Duke.facing, dangle, dspeed);
		this.game.Duke.chargeTime = 0;
	}
}

Duke.prototype.render = function(){
	this.colliderSprite = this.game.add.sprite(10, 230, 'dukeCollider');
	this.headSprite = this.game.add.sprite(10, 230, this.head);
	this.torsoSprite = this.game.add.sprite(10, 230, this.torso);
	this.legsSprite = this.game.add.sprite(10, 230, this.legs);

	this.colliderSprite.alpha = 0;

	this.game.physics.arcade.enable(this.colliderSprite);
	this.game.physics.arcade.enable(this.headSprite);
	this.game.physics.arcade.enable(this.torsoSprite);
	this.game.physics.arcade.enable(this.legsSprite);

	this.colliderSprite.immovable = true;
	this.colliderSprite.body.collideWorldBounds = true;

	this.headSprite.animations.add('normalHeadLeft', [0], 1, true);
	this.headSprite.animations.add('normalHeadRight', [1], 1, true);
	this.headSprite.animations.add('normalHeadUp', [2], 1, true);
	this.headSprite.animations.add('normalHeadDown', [3], 1, true);

	this.torsoSprite.animations.add('normalTorsoLeft', [9, 10, 9, 11], 1, true);
	this.torsoSprite.animations.add('normalTorsoRight', [3, 4, 3, 5], 1, true);
	this.torsoSprite.animations.add('normalTorsoUp', [0, 1, 0, 2], 1, true);
	this.torsoSprite.animations.add('normalTorsoDown', [6, 7, 6, 8], 1, true);

	this.legsSprite.animations.add('normalLegsLeft', [9, 10, 9, 11], 1, true);
	this.legsSprite.animations.add('normalLegsRight', [3, 4, 3, 5], 1, true);
	this.legsSprite.animations.add('normalLegsUp', [0, 1, 0, 2], 1, true);
	this.legsSprite.animations.add('normalLegsDown', [6, 7, 6, 8], 1, true);

	// this.headSprite.animations.add('normalHeadLeft', [0], 10, true);
	// this.headSprite.animations.add('normalHeadRight', [0], 10, true);
	// this.headSprite.animations.add('normalHeadUp', [0], 10, true);
	// this.headSprite.animations.add('normalHeadDown', [0], 10, true);

	// this.torsoSprite.animations.add('normalTorsoLeft', [0], 10, true);
	// this.torsoSprite.animations.add('normalTorsoRight', [0], 10, true);
	// this.torsoSprite.animations.add('normalTorsoUp', [0], 10, true);
	// this.torsoSprite.animations.add('normalTorsoDown', [0], 10, true);

	// this.legsSprite.animations.add('normalLegsLeft', [0], 10, true);
	// this.legsSprite.animations.add('normalLegsRight', [0], 10, true);
	// this.legsSprite.animations.add('normalLegsUp', [0], 10, true);
	// this.legsSprite.animations.add('normalLegsDown', [0], 10, true);

	this.colliderSprite.anchor.setTo(0.5, 0.5);
	this.colliderSprite.x = this.headSprite.x + this.headSprite.width / 2;
	this.colliderSprite.y = this.headSprite.y + this.headSprite.height / 2;
	//this.colliderSprite.angle = 135;

	//this.weapons.push(new Weapon.FirestoneBullet(this.game));
	this.weapons.push(new Weapon.StoneBullet(this.game));
	this.weapons.push(new Weapon.FirestoneBullet(this.game));
	for (var i = 1; i < this.weapons.length; i++) {
		this.weapons[i].visible = false;
	}

	this.game.input.keyboard.onUpCallback = this.game.Duke.handleKeyUp;
};

Duke.prototype.changeHead = function(newHead){
	this.head = newHead;
	this.headSprite.kill();
	this.headSprite = this.game.add.sprite(150, 150, newHead);	
};

Duke.prototype.changeTorso = function(newTorso){
	this.torso = newTorso;
	this.torsoSprite.kill();
	this.torsoSprite = this.game.add.sprite(150, 150, newTorso);	
};

Duke.prototype.changeLegs = function(newLegs){
	this.legs = newLegs;
	this.legsSprite.kill();
	this.legsSprite = this.game.add.sprite(150, 150, newLegs);	
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
	this.weapons[this.currentWeapon].visible = false;
	this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
	this.weapons[this.currentWeapon].setAll('exists', false);

	this.currentWeapon = weapon;
	this.weapon[this.currentWeapon].visible = true;
}