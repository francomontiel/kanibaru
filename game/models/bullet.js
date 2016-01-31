var Bullet = function (game, key, damage) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

    this.damage = damage;

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
    if (Math.abs(this.body.velocity.y) + Math.abs(this.body.velocity.x) < 5) {
        this.kill();
    }

};

var Weapon = {};

Weapon.BlueBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Blue Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 500;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet1', 5), true);
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

Weapon.Hellfire = function (game) {

    Phaser.Group.call(this, game, game.world, 'Hellfire', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 1000;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'hellfire', 20), true);
    }

    this.setAll('scaleSpeed', -0.05);

    return this;

};

Weapon.Hellfire.prototype = Object.create(Phaser.Group.prototype);
Weapon.Hellfire.prototype.constructor = Weapon.Hellfire;

Weapon.Hellfire.prototype.fire = function (source, dangle) {

    if (this.game.time.time < this.nextFire) { return; }

    var x1 = source.x + source.width / 4;
    var y1 = source.y + source.height * 3 / 4;

    var x2 = source.x + source.width * 3 / 4;
    var y2 = source.y + source.height * 3 / 4;

    this.getFirstExists(false).fire(x2, y2, 30 + dangle, this.bulletSpeed, 50, 0);
    this.getFirstExists(false).fire(x2, y2, 60 + dangle, this.bulletSpeed, -50, 0);
    this.getFirstExists(false).fire(x2, y2, 330 + dangle, this.bulletSpeed, 0, 70);
    this.getFirstExists(false).fire(x2, y2, 300 + dangle, this.bulletSpeed, 0, -70);
    this.getFirstExists(false).fire(x1, y1, 210 + dangle, this.bulletSpeed, 40, 0);
    this.getFirstExists(false).fire(x1, y1, 240 + dangle, this.bulletSpeed, -40, 0);
    this.getFirstExists(false).fire(x1, y1, 150 + dangle, this.bulletSpeed, 0, 60);
    this.getFirstExists(false).fire(x1, y1, 120 + dangle, this.bulletSpeed, 0, -60);

    this.nextFire = this.game.time.time + this.fireRate;
};

Weapon.StoneBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Stone Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 400;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bulletStone1', 15), true);
        this.getChildAt(i).body.bounce.setTo(0.2, 0.2);
        this.getChildAt(i).body.drag.x = 30;
        this.getChildAt(i).body.drag.y = 30;
    }

    return this;

};

Weapon.StoneBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.StoneBullet.prototype.constructor = Weapon.StoneBullet;

Weapon.StoneBullet.prototype.fire = function (game, source, facing, dangle, dspeed) {

    if (game.time.time < this.nextFire) { return; }

    var x = source.x;// + 10;
    var y = source.y;// + 10;
    var angle = 0;
    var gx = 0;
    var gy = 0;
    switch (facing) {
        case 0:
            angle = 180 + dangle;
            //gy = 50;
            break;
        case 1:
            angle = 0 + dangle;
            //gy = -50;
            break;
        case 2:
            angle = 270 + dangle;
            //gx = -50
            break;
        case 3:
            angle = 90 + dangle;
            //gx = 50;
            break;
        default:
    }

    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed + dspeed, gx, gy);

    this.nextFire = this.game.time.time + this.fireRate;
};

Weapon.FirestoneBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Fire Stone Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 700;
    this.fireRate = 400;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bulletFireStone1', 35), true);
        this.getChildAt(i).body.bounce.setTo(0.1, 0.1);
        this.getChildAt(i).body.drag.x = 50;
        this.getChildAt(i).body.drag.y = 50;
    }

    return this;

};

Weapon.FirestoneBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.FirestoneBullet.prototype.constructor = Weapon.FirestoneBullet;

Weapon.FirestoneBullet.prototype.fire = function (source, facing, dangle, dspeed) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;// + 10;
    var y = source.y;// + 10;
    var angle = 0;
    var gx = 0;
    var gy = 0;
    switch (facing) {
        case 0:
            angle = 180 + dangle;
            //gy = 50;
            break;
        case 1:
            angle = 0 + dangle;
            //gy = -50;
            break;
        case 2:
            angle = 270 + dangle;
            //gx = -50
            break;
        case 3:
            angle = 90 + dangle;
            //gx = 50;
            break;
        default:
    }

    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed + dspeed, gx, gy);

    this.nextFire = this.game.time.time + this.fireRate;
};