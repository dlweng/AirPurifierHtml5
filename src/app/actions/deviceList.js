import * as types from '../constants/ActionTypes';

import wxApi from '../api/api';

//异步处理
export function RenameDeviceAsyn(deviceItem, newName) {
  //更改名称
  return dispatch => {
    wxApi.renameDevice(deviceItem, newName, (data) => {
      if(data.success) {
        //更新store
        dispatch(RenameDevice(deviceItem.did, newName));
      }
    }, (e) => {
      //改名失败
    });
  };

}
export function RenameDevice(did, name) {
  return {type: types.RENAME_DEVICE, data: {did, name}};
}

export function DeleteDeviceAsyn(deviceItem) {
  //删除设备
  return dispatch => {
    wxApi.deleteDevice(deviceItem, (data) => {
      if(data.success) {
        //更新store
        dispatch(DeleteDevice(deviceItem.did));
      }
    }, (e) => {
      //改名失败
    });
  };
}
export function DeleteDevice(did) {
  return {type: types.DELETE_DEVICE, data: {did}};
}

//更新设备列表
export function UpdateDeviceList(data) {
  return {type: types.UPDATE_DEVICE_LIST, data: data};
}