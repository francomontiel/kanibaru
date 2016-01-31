function Cutscene(game, time, image) {
	this.game = game;
	this.duration = time;
	this.image = null;
	this.imageName = image;
	this.state = 0;
	this.timer = 0;
}

Cutscene.prototype.render = function() {
	this.image = this.game.add.sprite(0, 0, this.imageName);
	this.image.alpha = 0;
	this.image.fixedToCamera = true;
}

Cutscene.prototype.start = function() {
	this.game.isWaiting = true;
}

Cutscene.prototype.update = function() {
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.skip();
	}
	if (this.state == 0) {
		if (this.image.alpha >= 1) {
			this.state = 1;
			this.image.alpha = 0.5;
		} else {
			this.image.alpha += 0.05;
		}
	} else if (this.state == 1) {
		if (this.timer > this.duration) {
			this.state = 2;
		} else {
			this.timer++;
		}
	} else if (this.state == 2) {
		if (this.image.alpha <= 0) {
			this.game.isWaiting = false;
			this.image.alpha = 0;
		} else {
			this.image.alpha -= 0.05;
		}
	}
}

Cutscene.prototype.skip = function () {
	this.state = 2;
}