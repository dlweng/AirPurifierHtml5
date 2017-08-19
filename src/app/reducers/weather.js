import {UPDATE_WEATHER} from '../constants/ActionTypes';

const initialState = {
  location: '--',
  pm25: '--',
  tmp: '--',
  hum: '--'
};

export default function weather(state = initialState, action) {
  switch (action.type) {
    //更新设备信息
    case UPDATE_WEATHER: {
      return action.data;
    }
    default:
      return state;
  }
}
