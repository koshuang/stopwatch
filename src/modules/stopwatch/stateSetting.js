const seconds = 60;
const countdown = context => context.count - 1;
const reset = () => seconds;

export const stateSetting = {
  initial: 'reset',
  context: {
    count: seconds,
  },
  states: {
    reset: {
      on: {
        START: { to: 'running' },
      },
    },
    running: {
      on: {
        TICK: { to: 'running', callback: { count: countdown } },
        STOP: { to: 'paused' },
        CLEAR: { to: 'reset', callback: { count: reset } },
      },
    },
    paused: {
      on: {
        START: { to: 'running' },
        CLEAR: { to: 'reset', callback: { count: reset } },
      },
    },
  },
};
