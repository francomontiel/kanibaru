function Duke(game){
	this.game = game;
	this.health = 100;
	this.headSprite = null;
	this.torsoSprite = null;
	this.legsSprite = null;
	this.head = 'singleHead';
	this.torso = 'singleTorso';
	this.legs = 'singleLegs';
	this.speed = 150;
	this.facing = 0; //Left=0; Right=1; Up=2; Down=3
	this.sprite = null;
	this.timeDamaged = 0;
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

	this.game.Duke.timeDamaged--;
	if (this.game.Duke.timeDamaged > 40) {
		this.game.redSplash.alpha = 0.2;
	} else {
		this.game.redSplash.alpha = 0;
	}
};

Duke.prototype.handleKeyDown = function() {
	if(this.game.cursors.up.isDown){
		this.facing = 2;

		//this.game.Duke.headSprite.body.velocity.y = -this.speed;
		//this.game.Duke.torsoSprite.body.velocity.y = -this.speed;
		//this.game.Duke.legsSprite.body.velocity.y = -this.speed;
		this.game.Duke.colliderSprite.body.velocity.y = -this.speed;

		this.headSprite.play('normalHeadUp');
		this.torsoSprite.play('normalTorsoUp');
		this.legsSprite.play('normalLegsUp');
	} else if(this.game.cursors.down.isDown){
		this.facing = 3;

		//this.game.Duke.headSprite.body.velocity.y = this.speed;
		//this.game.Duke.torsoSprite.body.velocity.y = this.speed;
		//this.game.Duke.legsSprite.body.velocity.y = this.speed;
		this.game.Duke.colliderSprite.body.velocity.y = this.speed;

		this.headSprite.play('normalHeadDown');
		this.torsoSprite.play('normalTorsoDown');
		this.legsSprite.play('normalLegsDown');
	} else if(this.game.cursors.left.isDown){
		this.facing = 0;

		//this.game.Duke.headSprite.body.velocity.x = -this.speed;
		//this.game.Duke.torsoSprite.body.velocity.x = -this.speed;
		//this.game.Duke.legsSprite.body.velocity.x = -this.speed;
		this.game.Duke.colliderSprite.body.velocity.x = -this.speed;

		this.headSprite.play('normalHeadLeft');
		this.torsoSprite.play('normalTorsoLeft');
		this.legsSprite.play('normalLegsLeft');
	} else if(this.game.cursors.right.isDown){
		this.facing = 1;

		//this.game.Duke.headSprite.body.velocity.x = this.speed;
		//this.game.Duke.torsoSprite.body.velocity.x = this.speed;
		//this.game.Duke.legsSprite.body.velocity.x = this.speed;
		this.game.Duke.colliderSprite.body.velocity.x = this.speed;

		this.headSprite.play('normalHeadRight');
		this.torsoSprite.play('normalTorsoRight');
		this.legsSprite.play('normalLegsRight');
	} else {
		this.headSprite.animations.stop();
		this.torsoSprite.animations.stop();
		this.legsSprite.animations.stop();

		switch (this.facing) {
			case 0:
				this.headSprite.frame = 0;
				this.torsoSprite.frame = 0;
				this.legsSprite.frame = 0;
				break;
			case 1:
				this.headSprite.frame = 1;
				this.torsoSprite.frame = 0;
				this.legsSprite.frame = 0;
				break;
			case 2:
				this.headSprite.frame = 2;
				this.torsoSprite.frame = 0;
				this.legsSprite.frame = 0;
				break;
			case 3:
				this.headSprite.frame = 3;
				this.torsoSprite.frame = 0;
				this.legsSprite.frame = 0;
				break;
			default:
		}
	}

	this.headSprite.x = this.colliderSprite.x - this.headSprite.width / 2;
	this.headSprite.y = this.colliderSprite.y - this.headSprite.height / 2;
	this.torsoSprite.x = this.headSprite.x;
	this.torsoSprite.y = this.headSprite.y;
	this.legsSprite.x = this.headSprite.x;
	this.legsSprite.y = this.headSprite.y;
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

	//this.headSprite.animations.add('normalHeadLeft', [0], 10, true);
	//this.headSprite.animations.add('normalHeadRight', [1], 10, true);
	//this.headSprite.animations.add('normalHeadUp', [2], 10, true);
	//this.headSprite.animations.add('normalHeadDown', [3], 10, true);

	//this.torsoSprite.animations.add('normalTorsoLeft', [1, 0, 2, 0], 10, true);
	//this.torsoSprite.animations.add('normalTorsoRight', [1, 0, 2, 0], 10, true);
	//this.torsoSprite.animations.add('normalTorsoUp', [1, 0, 2, 0], 10, true);
	//this.torsoSprite.animations.add('normalTorsoDown', [1, 0, 2, 0], 10, true);

	//this.legsSprite.animations.add('normalLegsLeft', [1, 0, 2, 0], 10, true);
	//this.legsSprite.animations.add('normalLegsRight', [1, 0, 2, 0], 10, true);
	//this.legsSprite.animations.add('normalLegsUp', [1, 0, 2, 0], 10, true);
	//this.legsSprite.animations.add('normalLegsDown', [1, 0, 2, 0], 10, true);

	this.headSprite.animations.add('normalHeadLeft', [0], 10, true);
	this.headSprite.animations.add('normalHeadRight', [0], 10, true);
	this.headSprite.animations.add('normalHeadUp', [0], 10, true);
	this.headSprite.animations.add('normalHeadDown', [0], 10, true);

	this.torsoSprite.animations.add('normalTorsoLeft', [0], 10, true);
	this.torsoSprite.animations.add('normalTorsoRight', [0], 10, true);
	this.torsoSprite.animations.add('normalTorsoUp', [0], 10, true);
	this.torsoSprite.animations.add('normalTorsoDown', [0], 10, true);

	this.legsSprite.animations.add('normalLegsLeft', [0], 10, true);
	this.legsSprite.animations.add('normalLegsRight', [0], 10, true);
	this.legsSprite.animations.add('normalLegsUp', [0], 10, true);
	this.legsSprite.animations.add('normalLegsDown', [0], 10, true);

	this.colliderSprite.anchor.setTo(0.5, 0.5);
	this.colliderSprite.x = this.headSprite.x + this.headSprite.width / 2;
	this.colliderSprite.y = this.headSprite.y + this.headSprite.height / 2;
	//this.colliderSprite.angle = 135;
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
		console.log(this.game.Duke.health);
		this.game.Duke.timeDamaged = 50;
	}
}