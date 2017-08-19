import * as types from '../constants/ActionTypes';
import wxApi from '../api/api';

export function upDatePm25Data(data) {
  return {type: types.UPDATE_PM25_DATA, data: data};
}

export function getPm25DataAsyn(did, token) {

  return dispatch => {
    //拿上一个七天的数据
    const endTime = new Date();
    endTime.setHours(23);
    endTime.setMinutes(59);
    endTime.setSeconds(59);
    const endMilliseconds = endTime.getTime();

    const startTime = new Date();
    startTime.setDate(startTime.getDate() - 7);
    startTime.setHours(0);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    const startMilliseconds = startTime.getTime();

    wxApi.getPm25ChartData(did, token, startMilliseconds, endMilliseconds, (data) => {
      console.log(data);
      let pm25Data = {
        label: ['1', '2', '3', '4', '5', '6', '7'],
        data: [0, 0, 0, 0, 0, 0, 0]
      };
      const value = data.data;
      value.map((item, index) => {
        pm25Data.data[index] = item.attrs.pm25;
      });
      dispatch(upDatePm25Data(pm25Data));
    }, (e) => {
      //改名失败
    });
  };

}
