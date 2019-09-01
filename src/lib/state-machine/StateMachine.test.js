import { StateMachine } from './StateMachine';

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
            START: { to: 'running' },
          },
        },
      },
    };
    const fsm = StateMachine.create(stateSetting);

    fsm.send('START');

    expect(fsm.state).toEqual(stateSetting.states.reset.on.START.to);
  });

  it('should throw an error if no transitions', () => {
    const stateSetting = {
      initial: 'reset',
      states: {
        reset: {
          on: {
            START: { to: 'running' },
          },
        },
      },
    };
    const fsm = StateMachine.create(stateSetting);


    expect(() => {
      fsm.send('UNKNOWN');
    }).toThrow(new Error('Could not find next state for action UNKNOWN'));
  });

  describe('when there are context and callback', () => {
    it('should trigger callback and keep as same state', () => {
      const increment = context => context.count + 1;
      const stateSetting = {
        initial: 'running',
        context: {
          count: 0
        },
        states: {
          running: {
            on: {
              INC: { to: 'running', callback: { count: increment } },
            },
          },
        },
      };
      const fsm = StateMachine.create(stateSetting);

      fsm.send('INC');

      expect(fsm.context.count).toEqual(1);
    });
  });
});
