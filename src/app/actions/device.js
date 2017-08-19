import * as types from '../constants/ActionTypes';

export function UpDateDeviceInfo(data) {
  return {type: types.UPDATE_DEVICE_INFO, data: data};
}

export function UpDateDeviceState(data) {
  return {type: types.UPDATE_DEVICE_STATE, data: data};
}
