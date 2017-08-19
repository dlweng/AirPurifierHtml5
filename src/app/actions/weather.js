import * as types from '../constants/ActionTypes';
import wxApi from '../api/api';


// const initialState = {
//   location: '',
//   pm25: 0,
//   tmp: 0,
//   hum: 0
// };
export function UpDateWeatherAsyn() {
  //更改名称
  return dispatch => {
    wxApi.getWeather((data) => {
      data = data['HeWeather5'];
      const weatherData = {
        location: data[0].basic.city,
        pm25: data[0].aqi.city.pm25,
        tmp: data[0].now.tmp,
        hum: data[0].now.hum
      };
      dispatch(UpDateWeather(weatherData));
    }, (e) => {
    });
  };
}

export function UpDateWeather(data) {
  return {type: types.UPDATE_WEATHER, data: data};
}

export function UpDateWeatherForNativeAsyn(latitude, longitude) {
  //更改名称
  return dispatch => {
    wxApi.getWeatherForLocation(latitude, longitude, (data) => {
      data = data['HeWeather5'];
      const weatherData = {
        location: data[0].basic.city,
        pm25: data[0].aqi.city.pm25,
        tmp: data[0].now.tmp,
        hum: data[0].now.hum
      };
      dispatch(UpDateWeather(weatherData));
    }, (e) => {
    });
  };
}

export function UpDateWeatherForTestAsyn() {
  //更改名称
  return dispatch => {
    const city = '广州';
    wxApi.getWeatherForCity(city, (data) => {
      data = data['HeWeather5'];
      const weatherData = {
        location: data[0].basic.city,
        pm25: data[0].aqi.city.pm25,
        tmp: data[0].now.tmp,
        hum: data[0].now.hum
      };
      dispatch(UpDateWeather(weatherData));
    }, (e) => {
    });
  };
}