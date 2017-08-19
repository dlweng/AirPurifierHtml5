import {UPDATE_DEVICE_STATE} from '../constants/ActionTypes';

const initialState = {
  isOnline: true
};

export default function devicestate(state = initialState, action) {
  switch (action.type) {
    //更新设备信息
    case UPDATE_DEVICE_STATE: {
        if(state.isOnline != action.data.isOnline) {
            console.log(action);
            return action.data;
        }else {
            return state;
        }
    }
    default:
      return state;
  }
}
