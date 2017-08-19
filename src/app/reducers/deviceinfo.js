import {UPDATE_DEVICE_INFO} from '../constants/ActionTypes';

const initialState = {
  isDefault: true,
  attrs: {
    "Power": false,
    "Lock": false,
    "NightLed": false,
    "Humidification": false,
    "ResetFilter": false,
    "SleepMode": false,
    "Speed": 2,
    "Delay": 1,
    "TemperatureOutdoor": 0,
    "HumidityOutdoor": 0,
    "PM25Outdoor": 0,
    "TemperatureIndoor": 0,
    "HumidityIndoor": 0,
    "TVOC": 0,
    "FilterPercent": 0,
    "PM25Indoor": 0,
    "FilterLifeAlarm": false,
    "HydropeniaAlarm": false
  }
};

export default function deviceinfo(state = initialState, action) {
  switch (action.type) {
      //更新设备信息
    case UPDATE_DEVICE_INFO:{
      return Object.assign({}, action.data);
      // return state;
    }
    default:
      return state;
  }
}
