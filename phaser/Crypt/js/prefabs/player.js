'use strict'

var Player = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);

	this.anchor.setTo(0.5);
	this.scale.setTo(4);
	this.smoothed = false;
	game.physics.arcade.enableBody(this);
	this.body.gravity.y = 900;
	this.body.maxVelocity.x = 1000;
	this.body.maxVelocity.y = 5000;
	this.body.collideWorldBounds = true;
	this.characterSpeed = 500;
	//upgradeable variables.
	this.jumpAmount = 1;
	this.damageGun = 10;
	
	this.jumping = false;
	this.inAir = false;
	this.bullets = 6;
	this.gun = game.add.weapon(this.bullets,'bullet');
	this.gun.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.gun.trackSprite(this,0,0,false); //Tracks player, can set offsets here but will need to set angle offset in shooting()
	this.gun.bulletSpeed = 400;
	this.gun.fireRate = 500;
	
	this.moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.moveRight = game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);

	this.shootDirection = game.input.keyboard.createCursorKeys();

	
	game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function()
{
	this.movement();
	this.jump();
	this.shooting();

}

Player.prototype.movement = function()
{
	if(this.moveLeft.isDown)
	{
		//animation left
		this.body.velocity.x = this.characterSpeed;
	}
	else if(this.moveRight.isDown)
	{
		//animation right
		this.body.velocity.x = -this.characterSpeed;
	}
	else
	{
		//animation idle
		this.body.velocity.x = 0;
	}



}

Player.prototype.shooting = function()
{
	if(this.shootDirection.right.isDown)
	{
		this.gun.fireAngle = Phaser.ANGLE_RIGHT;
		this.gun.fire();
	}
	else if(this.shootDirection.up.isDown)
	{
		this.gun.fireAngle = Phaser.ANGLE_UP;
		this.gun.fire();
	}
	else if(this.shootDirection.left.isDown)
	{
		this.gun.fireAngle = Phaser.ANGLE_LEFT;
		this.gun.fire();
	}
	else if(this.shootDirection.down.isDown)
	{
		this.gun.fireAngle = Phaser.ANGLE_DOWN;
		this.gun.fire();
	}

	

}

Player.prototype.jump = function()
{
	this.isGrounded = this.body.touching.down;
	if(this.isGrounded) {
		this.jumps = this.jumpAmount;
		this.jumping = false;
		this.inAir = false;

	}
	else {
		
		this.inAir = true;
		
		
	}

	
    if(this.jumps > 0 && game.input.keyboard.downDuration(this.moveUp, 150)) {
        this.body.velocity.y = -400;
        this.body.velocity.x = 100;
        this.jumping = true;
        //Jump particle effect needs to happen only once per press
        
        if(game.input.keyboard.justPressed(this.moveUp))
        {
        	//jump animation start or other visuals

        }
        
    } 
    
    if(this.jumping && game.input.keyboard.upDuration(this.moveUp)) {
    	this.jumps--;
    	this.jumping = false;

    }
}