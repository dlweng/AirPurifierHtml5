import {UPDATE_PM25_DATA} from '../constants/ActionTypes';

const initialState = {
  label: ['12/1', '12/2', '12/3', '12/4', '12/5', '12/6', '12/7'],
  data: [182, 193, 183, 172, 183, 222, 212]
};

export default function pmRecord(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PM25_DATA: {
      return action.data;
    }
    default:
      return state;
  }
}
