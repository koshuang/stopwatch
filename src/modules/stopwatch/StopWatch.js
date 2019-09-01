import { StateMachine } from 'state-machine';
import { secondsToString } from 'utils';
import { stateSetting } from './stateSetting';

export class StopWatch {
  _time;
  _start;
  _stop;
  _reset;

  _stateMachine;
  _stateSetting = stateSetting;
  _actions = {
    start: 'START',
    tick: 'TICK',
    stop: 'STOP',
    clear: 'CLEAR',
  };

  constructor() {
    this._time = document.getElementById('time');
    this._start = document.getElementById('start');
    this._stop = document.getElementById('stop');
    this._reset = document.getElementById('reset');
  }

  run() {
    this._initStateMachine();
    this._initEventListeners();
  }

  _initStateMachine() {
    this._stateMachine = StateMachine.create(this._stateSetting);
  }

  _initEventListeners() {
    this._start.addEventListener('click', () => this._onStart());
    this._stop.addEventListener('click', () => this._onStop());
    this._reset.addEventListener('click', () => this._onReset());
  }

  _onStart() {
    try {
      this._stateMachine.send(this._actions.start);

      this._timerId = setInterval(() => {
        this._stateMachine.send(this._actions.tick);
        this._renderTime();
      }, 1000);
    } catch (error) {
      console.log(error);
      // do noting
    }
  }

  _onStop() {
    try {
      this._stateMachine.send(this._actions.stop);

      clearInterval(this._timerId);
    } catch (error) {
      console.log(error);
      // do noting
    }
  }

  _onReset() {
    try {
      this._stateMachine.send(this._actions.clear);

      clearInterval(this._timerId);
      this._renderTime();
    } catch (error) {
      console.log(error);
      // do noting
    }
  }

  _renderTime() {
    const seconds = this._stateMachine.context.count;
    const timeString = secondsToString(seconds);

    this._time.innerHTML = timeString;
  }
}
