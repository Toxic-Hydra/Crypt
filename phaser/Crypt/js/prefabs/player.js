'use strict'

var Player = function(game, x, y, key)
{
	Phaser.Sprite.call(this, game, x, y, key);
	//Sprite properties
	this.anchor.setTo(0.5);
	this.smoothed = false;
	

	//Physics
	game.physics.arcade.enableBody(this);
	this.body.gravity.y = 900;
	this.body.maxVelocity.x = 1000;
	this.body.maxVelocity.y = 5000;
	this.body.collideWorldBounds = true;
	this.characterSpeed = 200;
	//upgradeable variables.
	this.jumpAmount = 2;
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
	this.gun = game.add.weapon(this.bullets,'items', 'bullet');
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
	this.canAttack = true;
	this.meleeRect = game.add.sprite(0,0, null);
	this.meleeRectVert = game.add.sprite(0,0, null);
	//this.addChild(this.meleeRect);
	game.physics.arcade.enableBody(this.meleeRect);
	game.physics.arcade.enableBody(this.meleeRectVert);
	//SetSize(width, height, <offsetX>, <offsetY>)
	this.meleeRect.body.setSize(50,10, 0, -5);
	this.meleeRectVert.body.setSize(10, -50, 0, -5);
	this.meleeRect.kill();
	this.meleeRectVert.kill();
	this.meleeAttackRate = 250;
	this.meleeTime = game.time.create(false);
	this.meleeTime.loop(this.meleeAttackRate, this.meleeAttackFlag, this);
	this.meleeTime.start();

	//Sfx
	this.jumpSound = game.add.audio('jump');
	this.gunSound = game.add.audio('shoot');
	this.meleeSound = game.add.audio('melee');
	this.hurtSound = game.add.audio('player_hit');
	this.enemyHurtSound = game.add.audio('enemy_hit');
	this.collectPowerupSound = game.add.audio('collect_powerup');
	this.collectCorpseSound = game.add.audio('collect_corpse');
	this.jumpSound.volume = 0.2;
	this.collectPowerupSound.volume = 0.5;
	this.collectCorpseSound.volume = 0.6;

	//Movement Keys
	this.moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	this.moveRight = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	//Attack Keys
	this.shootDirectionleft = game.input.keyboard.addKey(Phaser.Keyboard.Z);// = game.input.keyboard.createCursorKeys();
	this.shootDirectionright = game.input.keyboard.addKey(Phaser.Keyboard.C);
	this.shootDirectionup = game.input.keyboard.addKey(Phaser.Keyboard.X);
	this.gun.onFire.add(function(){
		_player.gunSound.play();
		 game.camera.shake(0.01, 200);
	});
	//Change weapon
	this.weaponChange = game.input.keyboard.addKey(Phaser.Keyboard.R);
	//Pain state immune
	this.immune = false;
	game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
	
	this.loadPlayerData();

	var meterBitmap = game.add.bitmapData(62, 16);//100
	//console.log(this.health);
	//console.log(meterBitmap.width);
	meterBitmap.ctx.beginPath();
	meterBitmap.ctx.rect(0,0, meterBitmap.width, meterBitmap.height);
	meterBitmap.ctx.fillStyle = '#FF0000';
	meterBitmap.ctx.fill();

	//HUD HEALTH
	this.healthBar = game.add.sprite(30,17, meterBitmap);
	this.healthBar.fixedToCamera = true;
	this.barBackground = game.add.sprite(14,14, 'healthbar');
	this.barBackground.fixedToCamera = true;
	
	//ANIMATIONS
	//this.animations.add('left', Phaser.Animation.generateFrameNames('left', 1, 3), 5, true);
	this.lastDirection = 'right';
	this.animations.add('left', Phaser.Animation.generateFrameNames('left', 1, 6), 6, true);
	this.animations.add('right' , Phaser.Animation.generateFrameNames('right', 1, 6), 6, true);
	this.animations.add('idlel' , ['idleleft'] , 1, true);
	this.animations.add('idler' , ['idleright'] , 1, true);
	this.animations.add('rjump' , Phaser.Animation.generateFrameNames('rjump', 1,6), 6, true);
	this.animations.add('ljump' , Phaser.Animation.generateFrameNames('ljump', 1, 6), 6, true);
	this.animations.add('mright', Phaser.Animation.generateFrameNames('mright', 1, 3), 12, true);
	this.animations.add('mleft' , Phaser.Animation.generateFrameNames('mleft', 1, 3), 12, true);

	//COLLECTION PARTICLES
	this.particleBit = game.add.bitmapData(4,4);
	this.particleBit.ctx.beginPath();
	this.particleBit.ctx.rect(0,0, this.particleBit.width, this.particleBit.height);
	this.particleBit.ctx.fillStyle = '#ffffff';
	this.particleBit.ctx.fill();
	game.cache.addBitmapData('particle2', this.particleBit);

	


	game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.loadPlayerData = function()
{
	// Load run-specific data
	this.health = gameData.player.health;
	for (var i = 0; i < gameData.player.upgrades.length; i++)
	{
		this.applyUpgrade(gameData.player.upgrades[i]);
	}
}


Player.prototype.update = function()
{

	this.updateBar();
	this.movement();
	this.jump();
	this.shooting(this.weaponState);
	//collisions and overlaps.
	game.physics.arcade.overlap(this.gun.bullets, _enemies, this.damageEnemy, null, this);
	game.physics.arcade.collide(this.meleeRect, _enemies, this.meleeDamage, null, this);
	game.physics.arcade.overlap(this.meleeRectVert, _enemies, this.meleeDamage, null, this);
	game.physics.arcade.collide(this, upgrades, this.upgrade, null, this);
	game.physics.arcade.overlap(this, corpses, this.consumeCorpse, null, this);
	

}

Player.prototype.movement = function() //if jumping limit speed
{
	if(!this.immune){
		if(this.moveLeft.isDown)
		{
			//animation left

			this.body.velocity.x = this.characterSpeed;
			this.lastDirection = 'right';
			this.animations.play('right');
		}
		else if(this.moveRight.isDown)
		{
			//animation right
			this.body.velocity.x = -this.characterSpeed;
			this.lastDirection = 'left';
			this.animations.play('left');
		}
		else
		{
			//animation idle
			if(this.body.velocity.y == 0 && !this.shootDirectionleft.isDown && !this.shootDirectionright.isDown){
				if(this.lastDirection == 'right')
					this.animations.play('idler');
				else if(this.lastDirection == 'left')
					this.animations.play('idlel');
			}
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

	//Actual shooting. handgun, shotgun.
	if(state === "gun"){
		if(this.currentgun == "gun"){
			if(this.shootDirectionright.isDown)
			{
				this.lastDirection = 'right';
				if(this.body.velocity.x == 0){
					this.animations.play('idler');
				}
				else
					this.animations.play('right');
				this.gun.fireAngle = Phaser.ANGLE_RIGHT;
				this.gun.fireOffset(16,-4);
			}
			else if(this.shootDirectionleft.isDown)
			{
				this.lastDirection = 'left';
				if(this.body.velocity.x == 0) {
					this.animations.play('idlel');
				}
				else
					this.animations.play('left');
				this.gun.fireAngle = Phaser.ANGLE_LEFT;
				this.gun.fireOffset(-16,-4);
			}
			
		}
		else if(this.currentgun == "shotgun")
		{

			if(this.shootDirectionright.isDown)
			{
				this.lastDirection = 'right';
				this.animations.play('right');
				this.gun.fireAngle = Phaser.ANGLE_RIGHT;
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
				this.gun.fireOffset(16,-4);
			}
			else if(this.shootDirectionleft.isDown)
			{
				this.lastDirection = 'left';
				this.animations.play('left');
				this.gun.fireAngle = Phaser.ANGLE_LEFT;
				this.gun.fireOffset(-16,-4);
				this.gun.fireOffset(-16,-4);
				this.gun.fireOffset(-16,-4);
				this.gun.fireOffset(-16,-4);
				this.gun.fireOffset(-16,-4);
				this.gun.fireOffset(-16,-4);
			}

		}

	}
	else if(state === "melee"){//Currently only right attack deals damage.
		if(this.shootDirectionright.isDown && this.canAttack)
		{
			//TIMER LOGIC
			//Timer prevents killed hitbox to respawn instantly.
			//this.meleeRect.body.setSize(50, 10, 0, -5);
			this.lastDirection = 'right';
			this.animations.play('mright');
			this.meleeRect.reset(this.x, this.y);
			this.canAttack = false;
			this.meleeTime.resume();
			this.meleeSound.play();
		}
		else if(this.shootDirectionleft.isDown && this.canAttack)
		{
			this.lastDirection = 'left';
			this.animations.play('mleft');
			//this.meleeRect.body.setSize(-50, 10, 0, -5);
			this.meleeRect.reset(this.x - this.meleeRect.width*2, this.y);
			this.canAttack = false;
			this.meleeTime.resume();
			this.meleeSound.play();
		}
		

		else
		{
			if(this.meleeRect.alive)
			{
				this.meleeRect.kill();
			}
			if(this.meleeRectVert.alive)
			{
				this.meleeRectVert.kill();
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
        this.body.velocity.y = -300;
        this.jumping = true;
        //Jump particle effect needs to happen only once per press
        
        if(this.up.justPressed())
        {
        	//jump animation start or other visuals
        	//CHECK LAST DIRECTION
        	if(this.lastDirection == 'right')
        	{
        		this.animations.play('rjump');
        	}
        	else if(this.lastDirection == 'left')
        	{
        		this.animations.play('ljump');
        	}
        	this.jumpSound.play();

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
	this.enemyHurtSound.play();
}

Player.prototype.meleeDamage = function(sword, enemy)
{
	
	sword.kill();
	//console.log(25 + (0.25*this.damageGun));
	enemy.damage(25 + (0.25 * this.damageGun));
	enemy.stateMachine.transition('pain');
	this.enemyHurtSound.play();
	if(enemy.x < this.x)
	{
		//launch enemy left
		enemy.body.velocity.x = -150;
		enemy.body.velocity.y = -200;
	}
	else if(enemy.x > this.x)
	{
		//launch right
		enemy.body.velocity.x = 150;
		enemy.body.velocity.y = -200;
	}
	

	
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
	if(upgradeName != "heal")
	{
		gameData.player.upgrades.push(upgradeName);
	}
	// Actually apply it
	this.applyUpgrade(upgradeName);
	upgrade.kill();
	this.collectPowerupSound.play();
	//PARTICLES
	//EMITTER
	this.emitter = game.add.emitter(this.x, this.y, 20);
	this.emitter.makeParticles(game.cache.getBitmapData('particle2'));
	this.emitter.minParticleAlpha = 0.2;
	this.emitter.lifespan = 500;
	this.emitter.gravity = -400;
	this.emitter.explode();
}
Player.prototype.applyUpgrade = function(upgradeName)
{
	if (upgradeName == "atkspeed")
	{
		//Pretty much the method to use
		//just compare the name and apply the upgrade.
		this.damageGun +=0.15 * this.damageGun;
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
	if(upgradeName == "jump")
	{
		this.jumpAmount += 1;
	}
	if(upgradeName == "fireUp")
	{
		this.gun.fireRate *= 0.95; //decreases cooldown by 5 percent
	}
	if(upgradeName == "maxHealth");
	{
		this.maxHealth += 10;
		//this.heal(10);
	}
	if(upgradeName == "heal")
	{
		this.heal(0.25 * this.maxHealth);
	}
}

Player.prototype.consumeCorpse = function(player, corpse)
{
	if (!corpse.corpseInfo.consumed)
	{
		corpse.setConsumed();
		corpse.applyUpgradeToPlayer(this);
		this.collectCorpseSound.play();
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
		
		this.hurtSound.play();
	}
}

Player.prototype.updateBar = function()
{
	var percentage = (this.maxHealth - this.health) / this.maxHealth;
	var bar = 62 - (62 * percentage);
	var offset = 62 - bar;
	//console.log(this.health);
	this.healthBar.key.context.clearRect(0,0, this.healthBar.width, this.healthBar.height);
	this.healthBar.key.context.fillRect(0, 0, bar, 16);
	this.healthBar.key.dirty = true;
}

Player.prototype.kill = function()
{
	Phaser.Sprite.prototype.kill.call(this);
	LevelLoader.playerDied(true);
}