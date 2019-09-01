import { StateMachine } from 'state-machine';
import { secondsToString } from 'utils';

export class StopWatch {
  time;
  start;
  stop;
  reset;

  _stateMachine;
  _stateSetting;
  _actions = {
    start: 'START',
    tick: 'TICK',
    stop: 'STOP',
    clear: 'CLEAR',
  };

  constructor() {
    this.time = document.getElementById('time');
    this.start = document.getElementById('start');
    this.stop = document.getElementById('stop');
    this.reset = document.getElementById('reset');
  }

  run() {
    this.initStateMachine();
    this.initEventListeners();
  }

  initStateMachine() {
    const seconds = 60;
    const countdown = context => context.count - 1;
    const reset = () => seconds;

    this._stateSetting = {
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

    this._stateMachine = StateMachine.create(this._stateSetting);
  }

  initEventListeners() {
    this.start.addEventListener('click', () => this.onStart());

    this.stop.addEventListener('click', () => this.onStop());

    this.reset.addEventListener('click', () => this.onReset());
  }

  onStart() {
    try {
      this._stateMachine.send(this._actions.start);

      this._timerId = setInterval(() => {
        this._stateMachine.send(this._actions.tick);
        this.renderTime();
      }, 1000);
    } catch (error) {
      console.log(error);
      // do noting
    }
  }

  onStop() {
    try {
      this._stateMachine.send(this._actions.stop);

      clearInterval(this._timerId);
    } catch (error) {
      console.log(error);
      // do noting
    }
  }

  onReset() {
    try {
      this._stateMachine.send(this._actions.clear);

      clearInterval(this._timerId);
      this.renderTime();
    } catch (error) {
      console.log(error);
      // do noting
    }
  }

  renderTime() {
    const seconds = this._stateMachine.context.count;
    const timeString = secondsToString(seconds);

    this.time.innerHTML = timeString;
  }
}
