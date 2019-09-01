import { StateMachine } from './StateMachine';

let stateSetting = {
  initial: 'reset',
  states: {
    reset: {
      on: {
        START: 'running',
      },
    },
    running: {
      on: {
        STOP: 'paused',
        CLEAR: 'reset',
      },
    },
    paused: {
      on: {
        START: 'running',
        CLEAR: 'reset',
      },
    },
  },
};

describe('constructor', () => {
  it('should set state to initial state', () => {
    const stateSetting = {
      initial: 'reset',
    };
    const fsm = StateMachine.create(stateSetting);

    expect(fsm.state).toEqual(stateSetting.initial);
  });
});

describe('send', () => {
  it('should transition to next state', () => {
    const stateSetting = {
      initial: 'reset',
      states: {
        reset: {
          on: {
            START: 'running',
          },
        },
      },
    };
    const fsm = StateMachine.create(stateSetting);

    fsm.send('START');

    expect(fsm.state).toEqual(stateSetting.states.reset.on.START);
  });

  it('should throw an error if no transitions', () => {
    const stateSetting = {
      initial: 'reset',
      states: {
        reset: {
          on: {
            START: 'running',
          },
        },
      },
    };
    const fsm = StateMachine.create(stateSetting);


    expect(() => {
      fsm.send('UNKNOWN');
    }).toThrow(new Error('Could not find next state for action UNKNOWN'));
  });
});
