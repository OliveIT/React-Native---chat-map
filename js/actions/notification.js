import type { Action } from './types';
import { bindActionCreators } from 'redux';

export const UPDATE_START = 'UPDATE_START';
export const UPDATE_FINISH = 'UPDATE_FINISH';

export function update_start(notify: string): Action {
  return {
    type: UPDATE_START,
    notify
  };
}

export function notify_stop(notify) {
  return {
    type: UPDATE_FINISH,
    notify
  };
}

// export function update_data():Action{
//     return {
//         type: "TEST",
//         meta: {remote: true},
//     }
// }
