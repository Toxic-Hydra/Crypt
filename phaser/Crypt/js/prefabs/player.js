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
	this.maxHealth = 100;
	this.health = 100;
	//jump variables
	this.jumping = false;
	this.inAir = false;

	this.weaponState = "gun"; //default weapon
	this.currentgun = "gun";
	//Weapon: Gun variables
	this.bullets = 6;
	this.gun = game.add.weapon(this.bullets,'bullet');
	this.gun.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.gun.trackSprite(this,0,0,false); //Tracks player, can set offsets here but will need to set angle offset in shooting()
	this.gun.bulletSpeed = 400;
	this.gun.fireRate = 500;
	this.gunSound = game.add.audio('shoot');
	//this.gun.bulletInheritSpriteSpeed = true;
	//Weapon: Melee variables
	/*
	*What to do, create a state, idle, or attacking, Default: idle
	*Create invisible sprite instance
	*have sprite spawn for frame of animation, while colision damage enemy
	*what we can do is have the attack function place the sprite for a split second.
	*
	*/
	this.canAttack = true;
	this.meleeRect = game.add.sprite(0,0, null);
	//this.addChild(this.meleeRect);
	game.physics.arcade.enableBody(this.meleeRect);
	//SetSize(width, height, <offsetX>, <offsetY>)
	this.meleeRect.body.setSize(50,10, 0, -5);
	this.meleeRect.kill();
	this.meleeAttackRate = 500;
	this.meleeTime = game.time.create(false);
	this.meleeTime.loop(this.meleeAttackRate, this.meleeAttackFlag, this);
	this.meleeTime.start();


	//Movement Keys
	this.moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.moveRight = game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
	//Attack Keys
	this.shootDirection = game.input.keyboard.createCursorKeys();
	//Change weapon
	this.weaponChange = game.input.keyboard.addKey(Phaser.Keyboard.R);
	//Pain state immune
	this.immune = false;
	game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
	
	this.loadPlayerData();

	game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.loadPlayerData = function()
{
	// Load run-specific data
	for (var i = 0; i < gameData.player.upgrades.length; i++)
	{
		this.applyUpgrade(gameData.player.upgrades[i]);
	}
}


Player.prototype.update = function()
{
	if (this.y > game.world.height - this.height - 10)
	{
		// fell off the screen 
		LevelLoader.playerDied();
	}

	this.movement();
	this.jump();
	this.shooting(this.weaponState);
	game.physics.arcade.overlap(this.gun.bullets, _enemies, this.damageEnemy, null, this);
	game.physics.arcade.overlap(this.meleeRect, _enemies, this.meleeDamage, null, this);
	game.physics.arcade.collide(this, upgrades, this.upgrade, null, this);

	

}

Player.prototype.movement = function() //if jumping limit speed
{
	if(!this.immune){
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
		if(this.currentgun == "gun"){
			if(this.shootDirection.right.isDown)
			{

				this.gun.fireAngle = Phaser.ANGLE_RIGHT;
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
		else if(this.currentgun == "shotgun")
		{

			if(this.shootDirection.right.isDown)
			{

				this.gun.fireAngle = Phaser.ANGLE_RIGHT;
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
			}
			else if(this.shootDirection.up.isDown)
			{
				this.gun.fireAngle = Phaser.ANGLE_UP;
				this.gun.fireOffset(16,-4);//Need to set these offsets according to the sprite animations
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
			}
			else if(this.shootDirection.left.isDown)
			{
				this.gun.fireAngle = Phaser.ANGLE_LEFT;
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
			}
			else if(this.shootDirection.down.isDown)
			{
				this.gun.fireAngle = Phaser.ANGLE_DOWN;
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
			}
		}

	}
	else if(state === "melee"){
		if(this.shootDirection.right.isDown && this.canAttack)
		{
			//TIMER LOGIC
			//Timer prevents killed hitbox to respawn instantly.
			this.meleeRect.reset(this.x, this.y);
			this.canAttack = false;
			this.meleeTime.resume();
		}
		else
		{
			if(this.meleeRect.alive)
			{
				this.meleeRect.kill();
			}
		}
	}
	
	

}

Player.prototype.jump = function()
{
	this.isGrounded = this.body.blocked.down;

	if(this.isGrounded) {
		this.jumps = this.jumpAmount;
		this.jumping = false;
		this.inAir = false;

	}
	else {
		
		this.inAir = true;
		
		
	}

	
    if(this.jumps > 0 && this.up.downDuration(150)) {
        this.body.velocity.y = -400;
        this.jumping = true;
        //Jump particle effect needs to happen only once per press
        
        if(this.up.justPressed())
        {
        	//jump animation start or other visuals
        	this.gunSound.play();

        }
        
    } 
    
    if(this.jumping && this.up.upDuration()) {
    	this.jumps--;
    	this.jumping = false;

    }
}

Player.prototype.damageEnemy = function(bullet, enemy) //sprite goes before group
{
	
	bullet.kill();
	enemy.damage(this.damageGun);
	console.log(this.damageGun);
	enemy.stateMachine.transition('pain');
	
}

Player.prototype.meleeDamage = function(sword, enemy)
{
	
	sword.kill();
	enemy.damage(50);

	
}

Player.prototype.meleeAttackFlag = function()
{
	
	this.canAttack = true;
	this.meleeTime.pause();
}

Player.prototype.upgrade = function(player, upgrade)
{
	var upgradeName = upgrade.upgradeName;
	// Save the upgrade so the player will still have it when going into other rooms
	gameData.player.upgrades.push(upgradeName);
	// Actually apply it
	this.applyUpgrade(upgradeName);
	upgrade.kill();
}
Player.prototype.applyUpgrade = function(upgradeName)
{
	if (upgradeName == "atkspeed")
	{
		//Pretty much the method to use
		//just compare the name and apply the upgrade.
		this.damageGun +=10;
		console.log("player damage: " + this.damageGun);
		
	}
	if(upgradeName == "shotgun")
	{
		this.currentgun = "shotgun";
		this.bullets = 36;
		this.gun.createBullets(this.bullets);
		this.gun.bulletAngleVariance = 5;
		this.gun.fireRate = 1000;
		this.gun.multiFire = true;
		this.gun.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
		this.gun.bulletKillDistance = 300;
	}
}

Player.prototype.pain = function(direction)
{
	if(!_player.immune){
		_player.immune = true;
		_player.tint = Phaser.Color.RED;
		if(direction > 0)
		{
			_player.body.velocity.x = -150;
			_player.body.velocity.y = -200;
		}
		else if(direction < 0)
		{
			_player.body.velocity.x = 150;
			_player.body.velocity.y = -200;
		}

		game.time.events.add(300, function(){
			_player.tint = Phaser.Color.WHITE;
			_player.immune = false;
		}, this);
		
	}
}

Player.prototype.kill = function()
{
	LevelLoader.playerDied();
}