class StateMachine{
	constructor(state, states, args=[])
	{
		this.initState = state;
		this.states = states;
		this.args = args;
		this.state = null;

		for(const state of Object.values(this.states))
		{
			state.stateMachine = this;
		}
	}

	step()
	{
		//initialize
		if(this.state == null)
		{
			this.state = this.initState;
			this.states[this.state].enter(...this.args);
		}
		this.states[this.state].execute(...this.args);
	}

	transition(newState, ...enterArgs)
	{
		this.state = newState;
		this.states[this.state].enter(...this.args, ...enterArgs);
	}
}

class State {
	enter() {

	}

	execute(){
		
	}
}