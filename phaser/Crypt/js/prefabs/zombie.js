'use strict'

var Zombie = function(game, x, y, key)
{
	Enemy.call(this, game, x, y, key);
	this.tint = Phaser.Color.RED;

	this.enemyWeapon = game.add.weapon(6, 'bullet');
	this.enemyWeapon.fireRate = 300;
	this.enemyWeapon.bulletSpeed = 400;
	this.enemyWeapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
	/*this.enemyWeapon.onfire.add(function(){

	});*/
	this.enemyWeapon.trackSprite(this);
	this.enemyWeapon.fireAngle = 0;

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
	}

	execute(game, enemy)
	{
		//Will fire if zombie and player are on same platform.
		if(enemy.bottom != _player.bottom)
		{
			enemy.stateMachine.transition('patrol');
		}

		enemy.body.velocity.x = 0;
		if(enemy.x < _player.x)
		{
			if(enemy.enemySpeed <=0)
			{
				enemy.enemySpeed *=-1;
			}
			
			enemy.enemyWeapon.fireAngle = 0;
			enemy.enemyWeapon.fire();
		}
		else if(_player.x < enemy.x)
		{
			if(enemy.enemySpeed >= 0)
			{
				enemy.enemySpeed *= -1;
			}
			
			enemy.enemyWeapon.fireAngle = -180;
			enemy.enemyWeapon.fire();
		}

		console.log(enemy.enemySpeed);

	}
}