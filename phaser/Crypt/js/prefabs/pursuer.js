var Pursuer = function(game, x, y, key)
{
	Enemy.call(this, game, x, y, key);
	this.chaseRange = 150;
	//all we need to do is define animations.
	this.animations.add('left', Phaser.Animation.generateFrameNames('sprite', 1, 3), 3, true);
	this.animations.add('right', Phaser.Animation.generateFrameNames('sprite', 1, 3), 3, true);

	this.stateMachine = new StateMachine('patrol', {
		//idle: new IdleState(),
		patrol: new PatrolState(),
		chase: new PursueChaseState(),
		attack: new AttackState(),
		pain: new PainState(),
		//die: new DieState(),
		//shoot: new ShootState(),
	}, [game, this ]);
}
Pursuer.prototype = Object.create(Enemy.prototype);
Pursuer.prototype.constructor = Pursuer;


class PursueAttackState extends State {
	enter(game, enemy)
	{
	
	}

	execute(game, enemy)
	{
		//sets the speed to 0, if colliding deals damage to player.
		enemy.body.velocity.x = 0;
		//Attack
		_player.damage(enemy.playerDamage);
		gameData.player.health = _player.health;
		if(enemy.enemySpeed > 0)
		{
			_player.pain(-1);

		}
		else if(enemy.enemySpeed < 0)
		{
			_player.pain(1);
		}
		enemy.stateMachine.transition('chase');
	}
}

class PursueChaseState extends State { //This dude chases forever
	enter(game, enemy)
	{
		//animations
	}

	execute(game, enemy)
	{
		

		game.physics.arcade.collide(enemy, _player, function(enemy){
			enemy.stateMachine.transition('attack');
		});
		
		enemy.chase(enemy);
		//jump
		if(_player.y < enemy.y)
		{
			enemy.body.velocity.y = -200;
		}
		enemy.body.velocity.x = enemy.enemySpeed;

	}
}