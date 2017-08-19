import {UPDATE_DEVICE_LIST, RENAME_DEVICE, DELETE_DEVICE} from '../constants/ActionTypes';
import apiConfig from '../../config/apiConfig';
const initialState = [
];

//处理设备列表
function formatDevicelist(deviceList) {
  //处理相关数据
  let newList = [];
  deviceList.map((item, index) => {
    if(item.product_key == apiConfig.jzPKey){
      deviceList[index].name = item.dev_alias;
      deviceList[index].id = item.did;
      deviceList[index].isOnline = item.is_online;
      //添加state 和 stateText
      if(item.is_online){
        deviceList[index].state = 'success';
        deviceList[index].stateText = '在线中';
      }else{
        deviceList[index].state = 'default';
        deviceList[index].stateText = '离线';
      }
      newList.push(deviceList[index]);
    }else{

    }
  });
  return newList;
}

function renameDevice(deviceList, did, newName) {
  let newState = Object.assign([], deviceList);
  newState.map((item, index) => {
    if(item.did == did){
      newState[index].name = newName;
      newState[index].dev_alias = newName;
    }
  });
  return newState;
}

function deleteDevice(devicelist, did) {
  let newState = Object.assign([], devicelist);
  let activeIndex = -1;
  newState.map((item, index) => {
    if(item.did == did){
      activeIndex = index;
    }
  });

  if(activeIndex != -1){
    newState.splice(activeIndex, 1);
  }
  return newState;
}

export default function devicelist(state = initialState, action) {
  switch (action.type) {
    //更新设备列表
    case UPDATE_DEVICE_LIST: {
      const deviceList = formatDevicelist(action.data);
      return deviceList;
      // return state;
    }
    case RENAME_DEVICE: {
      return renameDevice(state, action.data.did, action.data.name);
    }
    case DELETE_DEVICE: {
      return deleteDevice(state, action.data.did);
    }
    default:
      return state;
  }
}