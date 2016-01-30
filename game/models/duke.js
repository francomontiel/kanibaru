function Duke(game){
	this.game = game;
	this.health = 100;
	this.headSprite = null;
	this.torsoSprite = null;
	this.legsSprite = null;
	this.head = 'normalHead';
	this.torso = 'normalTorso';
	this.legs = 'normalLegs';
	this.sprite = null;
}

Duke.prototype.update = function(){
	if(this.game.cursors.up.isDown){
		this.game.Duke.headSprite.y -= 10;
		this.game.Duke.torsoSprite.y -= 10;
		this.game.Duke.legsSprite.y -= 10;
	}

	if(this.game.cursors.down.isDown){
		this.game.Duke.headSprite.y += 10;
		this.game.Duke.torsoSprite.y += 10;
		this.game.Duke.legsSprite.y += 10;
	}

	if(this.game.cursors.left.isDown){
		this.game.Duke.headSprite.x -= 10;
		this.game.Duke.torsoSprite.x -= 10;
		this.game.Duke.legsSprite.x -= 10;
	}

	if(this.game.cursors.right.isDown){
		this.game.Duke.headSprite.x += 10;
		this.game.Duke.torsoSprite.x += 10;
		this.game.Duke.legsSprite.x += 10;
	}
};

Duke.prototype.render = function(){
	this.headSprite = this.game.add.sprite(0, 0, this.head);
	this.torsoSprite = this.game.add.sprite(0, 0, this.torso);
	this.legsSprite = this.game.add.sprite(0, 0, this.legs);
	// this sprite will be the one that interacts with the world
	// this.sprite = this.game.add.sprite(0, 0, 'collider');
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