import * as types from '../constants/ActionTypes';

import wxApi from '../api/api';

export function CreateGizwitsHandle(host, openId, appId, accord, callBacks) {
  const handle = wxApi.initGizwits(host, openId, appId, accord, callBacks);
  return {type: types.STORAGE_GIZWITS_HANDLE, data: handle};
}

export function InitGizwits() {
  return {type: types.INIT_GIZWITS};
}

export function ConnectedDevice(did) {
  return {type: types.CONNECTED_DEVICE, data: {did}};
}

export function GoToDevice(deviceData, option) {
  return {type: types.GO_TO_DEVICE, data: deviceData, option: option};
}

export function ReadDeviceInfo(did) {
  return {type: types.READ_DEVICE_INFO, data: {did}};
}

export function SendCmd(data) {
  return {type: types.SEND_CMD, data: {cmd: data.cmd, did: data.did}};
}
