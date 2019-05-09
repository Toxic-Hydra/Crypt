'use strict'

var Player = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);
	//Sprite properties
	this.anchor.setTo(0.5);
	this.scale.setTo(4);
	this.smoothed = false;

	//Physics
	game.physics.arcade.enableBody(this);
	this.body.gravity.y = 900;
	this.body.maxVelocity.x = 1000;
	this.body.maxVelocity.y = 5000;
	this.body.collideWorldBounds = true;
	this.characterSpeed = 500;
	//upgradeable variables.
	this.jumpAmount = 1;
	this.damageGun = 10;
	//jump variables
	this.jumping = false;
	this.inAir = false;

	this.weaponState = "gun"; //default weapon
	//Weapon: Gun variables
	this.bullets = 6;
	this.gun = game.add.weapon(this.bullets,'bullet');
	this.gun.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.gun.trackSprite(this,0,0,false); //Tracks player, can set offsets here but will need to set angle offset in shooting()
	this.gun.bulletSpeed = 400;
	this.gun.fireRate = 500;
	//Weapon: Melee variables
	/*
	*What to do, create a state, idle, or attacking, Default: idle
	*Create invisible sprite instance
	*have sprite spawn for frame of animation, while colision damage enemy
	*what we can do is have the attack function place the sprite for a split second.
	*
	*/
	this.meleeRect = game.add.sprite(0,0, null);
	//this.addChild(this.meleeRect);
	game.physics.arcade.enableBody(this.meleeRect);
	//SetSize(width, height, <offsetX>, <offsetY>)
	this.meleeRect.body.setSize(50,10, 0, -5);

	//Movement Keys
	this.moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.moveRight = game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
	//Attack Keys
	this.shootDirection = game.input.keyboard.createCursorKeys();
	//Change weapon
	this.weaponChange = game.input.keyboard.addKey(Phaser.Keyboard.R);

	
	game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;



Player.prototype.update = function()
{
	this.movement();
	this.jump();
	this.shooting(this.weaponState);

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

Player.prototype.shooting = function(state)
{
	//Basic weapon switch functionality.
	if(this.weaponChange.justPressed())
	{
		if(state === "gun" )
		{
			this.weaponState = "melee";
		}
		else if( state === "melee")
		{
			this.weaponState = "gun";
		}
	}

	if(state === "gun"){
		if(this.shootDirection.right.isDown)
		{

			this.gun.fireAngle = Phaser.ANGLE_RIGHT;
			//this.gun.fire();
			this.gun.fireOffset(16,-4);
		}
		else if(this.shootDirection.up.isDown)
		{
			this.gun.fireAngle = Phaser.ANGLE_UP;
			this.gun.fireOffset(16,-4);//Need to set these offsets according to the sprite animations
		}
		else if(this.shootDirection.left.isDown)
		{
			this.gun.fireAngle = Phaser.ANGLE_LEFT;
			this.gun.fireOffset(16,-4);
		}
		else if(this.shootDirection.down.isDown)
		{
			this.gun.fireAngle = Phaser.ANGLE_DOWN;
			this.gun.fireOffset(16,-4);
		}
	}
	else if(state === "melee"){
		if(this.shootDirection.right.isDown)
		{
			//TIMER LOGIC
			this.meleeRect.x = this.x;
			this.meleeRect.y = this.y;
		}
		else
		{
			this.meleeRect.x = 0;
			this.meleeRect.y = 0;
		}
	}
	

}

Player.prototype.jump = function()
{
	this.isGrounded = this.body.touching.down;
	//console.log(this.isGrounded);
	if(this.isGrounded) {
		this.jumps = this.jumpAmount;
		this.jumping = false;
		this.inAir = false;

	}
	else {
		
		this.inAir = true;
		
		
	}

	
    if(this.jumps > 0 && this.up.downDuration( 150)) {
        this.body.velocity.y = -400;
        this.jumping = true;
        //Jump particle effect needs to happen only once per press
        
        if(this.up.justPressed())
        {
        	//jump animation start or other visuals

        }
        
    } 
    
    if(this.jumping && this.up.upDuration()) {
    	this.jumps--;
    	this.jumping = false;

    }
}