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
  this.alive = false;
    this.exists = false;
    this.visible = false;
    this.canShoot = false;



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