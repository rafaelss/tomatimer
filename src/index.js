import { h, app } from 'hyperapp';

const state = {
  timer: '25:00',
  seconds: 60 * 25,
  started: false,
  stopped: true,
  counterInterval: null
};

const actions = {
  updateTimer: () => (state, actions) => {
    const seconds = state.seconds - 1;
    const timer = new Date(seconds * 1000).toISOString().substr(14, 5);
    return { seconds: seconds, timer: timer };
  },
  start: () => (state, actions) => {
    const counterInterval = setInterval(function() {
      actions.updateTimer();
    }, 1000);

    return { started: true, stopped: false, counterInterval: counterInterval };
  },
  stop: () => (state, actions) => {
    clearInterval(state.counterInterval);
    return { started: false, stopped: true, counterInterval: null };
  }
};

const view = (state, actions) =>
  h('div', {}, [
    h('h1', {}, `${state.timer}`),
    h('button', { onclick: actions.start, disabled: state.started }, 'Start'),
    h('button', { onclick: actions.stop, disabled: state.stopped }, 'Stop')
  ]);

export const main = app(state, actions, view, document.body);
