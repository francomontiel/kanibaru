var Collectible = function (game, x, y, health, speed, weapon, key, bodyPart, indentifier) {
	//bodyPart should be 'head', 'torso', 'legs' or null. indentifier is the sprite name

	this.bodyPart = bodyPart;
	this.indentifier = indentifier;

	this.game = game;

	Phaser.Sprite.call(this, game, 0, 0, key);

	this.x = x;
	this.y = y;

	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

	this.health = health;
	this.speed = speed;
	this.weapon = weapon;
}

Collectible.prototype = Object.create(Phaser.Sprite.prototype);
Collectible.prototype.constructor = Collectible;

/*Collectible.prototype.activate = function (duke, item) {

    this.game.Duke.health += item.health;
    this.game.Duke.speed += item.speed;

    if (item.weapon > -1) {
    	this.game.Duke.changeWeapon(item.weapon);
    }

    item.kill();
};

Collectible.prototype.update = function () {
	this.game.physics.arcade.overlap(this.game.Duke.currentWeapon, this, this.activate, null, this);
}**/