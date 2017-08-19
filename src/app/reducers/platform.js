import {SET_PLATFORM} from '../constants/ActionTypes';

const initialState = '';

export default function platform(state = initialState, action) {
  switch (action.type) {
    //更新设备信息
    case SET_PLATFORM: {
      return action.data;
    }
    default:
      return state;
  }
}
