import {combineReducers} from 'redux';
import deviceinfo from './deviceinfo';
import devicelist from './devicelist';
import gizwitsSocket from './gizwitsSocket';
import devicestate from './devicestate';
import weather from './weather';
import pmRecord from './pmRecord';
import platform from './platform';

const rootReducer = combineReducers({
  deviceinfo,
  devicelist,
  gizwitsSocket,
  devicestate,
  weather,
  pmRecord,
  platform
});

export default rootReducer;
