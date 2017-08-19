import {INIT_GIZWITS, STORAGE_GIZWITS_HANDLE, CONNECTED_DEVICE, GO_TO_DEVICE, READ_DEVICE_INFO, SEND_CMD} from '../constants/ActionTypes';

const initialState = {
  handle: null,
  isInit: false,
  activeConnetDevice: null
};

//连接设备
function connetDevice(did, state) {
  if(state.isInit) {
    //初始化完成，连接设备
    state.handle.connect(did);
    const newState = Object.assign({}, state);
    newState.activeConnetDevice = did;
    return newState;
  }else{
    //初始化没完成
    return state;
  }
}

//跳转并连接设备
function goToDevice(deviceData, state, option) {
  //默认参数
  console.log(option);
  if(option == undefined) {
    option = {};
    option.isCover = false;
  }
  if(option.isCover){
    const url = window.location.protocol + '//' + window.location.host + window.location.pathname + '#/connetDevice/'+deviceData.id+'/deviceinfo';
    location.replace(url);
  }else{
    location.hash = '#/connetDevice/'+deviceData.id+'/deviceinfo';
  }
  //连接设备
  return state;
}

export default function gizwitsSocket(state = initialState, action) {
  switch (action.type) {
    //更新设备信息
    case STORAGE_GIZWITS_HANDLE: {
      const newState = Object.assign({}, state);
      newState.handle = action.data;
      return newState;
    }
    case INIT_GIZWITS: {
      const newState = Object.assign({}, state);
      newState.isInit = true;
      return newState;
    }
    case GO_TO_DEVICE: {
      return goToDevice(action.data, state, action.option);
    }
    case CONNECTED_DEVICE: {
      return connetDevice(action.data.did, state);
    }
    case READ_DEVICE_INFO: {
      if(state.handle != null) {
        state.handle.read(action.data.did);
      }
      return state;
    }
    case SEND_CMD: {
      if(state.handle != null) {
        console.log(action);
        state.handle.write(action.data.did, action.data.cmd);
        setTimeout(() => {
          state.handle.read(action.data.did);
        }, 100);

      }
      return state;
    }
    default:
      return state;
  }
}
