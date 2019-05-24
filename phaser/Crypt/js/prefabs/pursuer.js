var Pursuer = function(game, x, y, key)
{
	Enemy.call(this, game, x, y, key);
	this.chaseRange = 150;

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

class PursueChaseState extends State {
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