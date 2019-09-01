import debugCreator from 'debug';

const debug = debugCreator('state-machine');

export class StateMachine {
  _config;
  _state;
  _stateMap = new Map();

  constructor(config) {
    this._config = config;

    this._init();
  }

  static create(config) {
    return new StateMachine(config);
  }

  _init() {
    this._setState(this._config.initial);
    this._initStates();
  }

  get state() {
    return this._state;
  }

  send(action) {
    const transitions = this._findAvailableNextTransitions(this._state);

    const nextState = transitions[action];
    if (!nextState) {
      throw new Error(`Could not find next state for action ${action}`);
    }

    this._setState(nextState);
  }

  _initStates() {
    if (this._config.states) {
      for (let [key, value] of Object.entries(this._config.states)) {
        this._stateMap.set(key, value);
      }
    }
  }

  _setState(state) {
    debug('Setting state %o', state);
    this._state = state;
  }

  _findAvailableNextTransitions(state) {
    const setting = this._stateMap.get(state);

    if (!setting) {
      throw new Error(`No available transitions for ${state}`);
    }

    return setting.on;
  }
}
