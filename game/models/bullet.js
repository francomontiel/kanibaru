var Bullet = function (game, key, damage) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

    this.playerDamage = damage;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};

Bullet.prototype.update = function () {

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

};

var Weapon = {};

Weapon.BlueBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Blue Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 400;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet1', 15), true);
    }

    return this;

};

Weapon.BlueBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.BlueBullet.prototype.constructor = Weapon.BlueBullet;

Weapon.BlueBullet.prototype.fire = function (source, facing) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + source.width / 2 + 10;
    var y = source.y + source.height / 2 + 10;

    this.getFirstExists(false).fire(x, y, facing * 90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};