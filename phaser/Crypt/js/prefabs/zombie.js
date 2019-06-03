'use strict'

var Zombie = function(game, x, y, key)
{
	Enemy.call(this, game, x, y, key);

	this.enemyWeapon = game.add.weapon(6, 'items', 'bullet');
	this.canShoot = true;
	this.enemyWeapon.fireRate = 1000;
	this.enemyWeapon.bulletSpeed = 400;
	this.enemyWeapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
	/*this.enemyWeapon.onfire.add(function(){

	});*/
	this.enemyWeapon.trackSprite(this);
	this.enemyWeapon.fireAngle = 0;
	this.chaseRange = 30;

	this.animations.add('left', Phaser.Animation.generateFrameNames('left', 1, 6), 6, true);
	this.animations.add('right', Phaser.Animation.generateFrameNames('right', 1, 6), 6, true);

	this.stateMachine = new StateMachine('patrol', {
		//idle: new IdleState(),
		patrol: new ZombiePatrolState(),
		chase: new ChaseState(),
		attack: new AttackState(),
		pain: new PainState(),
		//die: new DieState(),
		shoot: new ShootState(),
	}, [game, this ]);


}

Zombie.prototype = Object.create(Enemy.prototype);
Zombie.prototype.constructor = Zombie;

class ZombiePatrolState extends State
{
	enter(scene, enemy)
	{
		//enemy.patrol();
		enemy.animations.play('right');
		
	}

	execute(scene, enemy)
	{
		if(enemy.bottom == _player.bottom)
		{
			enemy.stateMachine.transition('shoot');
		}
		
		if(game.physics.arcade.distanceBetween(enemy, _player) < enemy.chaseRange && enemy.bottom == _player.bottom)
		{
			enemy.stateMachine.transition('chase');
		}
		

		game.physics.arcade.collide(enemy, reverseWaypoints, enemy.patrol);
		enemy.body.velocity.x = enemy.enemySpeed;
	}
}

class ShootState extends State
{
	enter(game, enemy)
	{
		//cannot move while shooting
		enemy.animations.stop();
	}

	execute(game, enemy)
	{
		//Will fire if zombie and player are on same platform.
		if(enemy.bottom != _player.bottom)
		{
			enemy.stateMachine.transition('chase');
		}

		enemy.body.velocity.x = 0;

		if(enemy.canShoot){
			if(enemy.x < _player.x)
			{

				if(enemy.enemySpeed <=0)
				{
					enemy.animations.play('right');
					enemy.enemySpeed *=-1;
				}
				
				enemy.enemyWeapon.fireAngle = 0;
				enemy.enemyWeapon.fire();
			}
			else if(_player.x < enemy.x)
			{
				if(enemy.enemySpeed >= 0)
				{
					enemy.animations.play('left');
					enemy.enemySpeed *= -1;
				}
				
				enemy.enemyWeapon.fireAngle = -180;
				enemy.enemyWeapon.fire();
			}
		}

		console.log(enemy.enemySpeed);

	}
}



Zombie.prototype.kill = function() //we have the ability to override base functions, add animations and sounds for death here.
{
	//Particle Colors
	this.particleBit = game.add.bitmapData(8,8);
	this.particleBit.ctx.beginPath();
	this.particleBit.ctx.rect(0,0, this.particleBit.width, this.particleBit.height);
	this.particleBit.ctx.fillStyle = '#ffffff';
	this.particleBit.ctx.fill();
	game.cache.addBitmapData('particle2', this.particleBit);

	//EMITTER
	this.emitter = game.add.emitter(this.x, this.y, 20);
	this.emitter.makeParticles(game.cache.getBitmapData('particle2'));
	this.emitter.gravity = 400;
	
	
	this.emitter.explode();

	this.alive = false;
    this.exists = false;
    this.visible = false;
    this.canShoot = false;

    if(this.dropChance <= 0.60)
    {
		//spawn a random upgrade
		//currently 6 upgrades
		var randomUp = game.rnd.integerInRange(1,6);

		if(randomUp == 1) var Up = new Upgrade(game, 		this.x, this.y, 'items','atkSpeedUp');
		if(randomUp == 2) var Up = new ShotUpgrade(game, 	this.x, this.y, 'items', 'shotPower');
		if(randomUp == 3) var Up = new JumpUpgrade(game, 	this.x, this.y, 'items','extraJump');
		if(randomUp == 4) var Up = new FireRate(game, 		this.x, this.y, 'items','bulletspeed');
		if(randomUp == 5) var Up = new MaxHealth(game,		this.x, this.y, 'items', 'maxhealth');
		if(randomUp == 6) var Up = new Heal(game, 			this.x, this.y,	'items','heal');


		upgrades.add(Up);
    }

    if (this.events)
    {
        this.events.onKilled$dispatch(this);
    }

    return this;
}

Zombie.prototype.update = function()
{
	game.physics.arcade.collide(this.enemyWeapon.bullets, _player, this.zombieDamage, null, this);
	this.stateMachine.step();
}

Zombie.prototype.zombieDamage = function(_player, bullet)
{
	_player.damage(this.playerDamage);
	gameData.player.health = _player.health;
	bullet.kill();
	if(_player.x < this.x)
	{
		_player.pain(1);
	}
	else if(this.x < _player.x)
	{
		
		_player.pain(-1);
	}
}