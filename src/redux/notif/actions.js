import { CLEAR_NOTIF, SET_NOTIF } from './constants';

export function setNotif(status, variant, message) {
  return {
    type: SET_NOTIF,
    status,
    variant,
    message,
  };
}

export function clearNotif() {
  return {
    type: CLEAR_NOTIF,
  };
}
