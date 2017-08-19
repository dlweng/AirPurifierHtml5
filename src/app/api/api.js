import GizwitsWS from '../../lib/gizwitsSdk.js';
import fetch from 'isomorphic-fetch';
import fetchJsonp from 'fetch-jsonp';
import apiConfig from '../../config/apiConfig';

require('es6-promise').polyfill();

const wxApi = {
  //配置权限
  wxJsConfig: function (jsApiAry, ready) {

    if(ready == undefined){
      ready = function() {};
    }

    const localUrl = encodeURIComponent(window.location.href.split('#')[0]);

    console.log(localUrl);

    const url = apiConfig.url + apiConfig.proxyUrl +
    apiConfig.api.jsApiTicket + '?url='+localUrl;


    let option = {
      method: 'GET'
    };

    fetch(url, option)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //调用授权
      console.log(data);
      if(data.success != 'false') {
        window.wx.config({
          beta: apiConfig.isBeta, // 开启内测接口调用，注入wx.invoke方法,非常重要!!必须有这个
          debug: apiConfig.isDebug, //开启调试接口，alert运行结果
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList:jsApiAry
        });
        window.wx.ready(function() {
          ready();
        });
      }
    }).catch(function(e) {
      console.log(e);
    });
  },
  /**
   * 获取微信的code
   * 如果url上没有，则重定向去授权
   */
  getCode: function() {
    let code = wxApi.getUrlParameter('code');

    // //调试用 记得删除
    code = '123';

    if(Boolean(code) == false) {
      //重定向到授权页面
      // let locationUrl = window.location.protocol + '//' + window.location.host+'/';
      // let locationHast = window.location.hash;
      // locationHast = locationHast.replace('#', '?hash=');
      // locationUrl = encodeURI(locationUrl);
      // locationHast = encodeURI(locationHast);

      let locationUrl = window.location.href;
      const hashIndex = locationUrl.indexOf('#');
      let locationHast = locationUrl.substring(hashIndex, locationUrl.length);
      locationUrl = locationUrl.substring(0, hashIndex);
      locationHast = locationHast.replace('#', '?hash=');
      locationUrl = encodeURI(locationUrl);
      locationHast = encodeURI(locationHast);

      console.log(locationUrl + locationHast);
      const authorizationUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+apiConfig.wxAppid+
      '&redirect_uri='+ locationUrl + locationHast +'&response_type=code&scope=snsapi_base&state=default&#wechat_redirect';
      window.location.href = authorizationUrl;
      return null;
    }else{
      return code;
    }
  },
  /**
   * 获取openId
   */
  getOpenId: function(successCallback, errorCallback) {
    let openId = sessionStorage.getItem('openid');

    // //调试用记得删除
    openId = '123';

    if(!!openId == false || openId == 'undefined') {

      const code = wxApi.getCode();
      if(code == null) {
        return;
      }

      const url = apiConfig.url + apiConfig.proxyUrl + apiConfig.api.getOpenid + '?code=' + code;
      console.log(url);
      const option = {
        method: 'GET'
      };
      fetch(url, option)
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        console.log(openId);
        console.log(data);        
        sessionStorage.setItem('openid', data.openid);
        successCallback(data.openid);
      }).catch(function(e) {
        console.log(e);
        errorCallback(e);
      });

    }else {
      successCallback(openId);
    }
  },
  /**
   * 更改设备名称
   */
  renameDevice: function(deviceItem, newName, successCallback, errorCallback) {

    newName = encodeURIComponent(newName);

    const token = sessionStorage.getItem('token');
    const openid = sessionStorage.getItem('openid');
    
    const url = apiConfig.url + apiConfig.proxyUrl + apiConfig.api.deviceOper+"modify?" + 'token=' + token + '&openid=' + openid + '&did=' + deviceItem.did +
    '&dev_alias=' + newName + '&remark=1';
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, option)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      successCallback(data);
    }).catch(function(e) {
      errorCallback(e);
    });

  },
  deleteDevice: function(deviceItem, successCallback, errorCallback) {

    const token = sessionStorage.getItem('token');
    const openid = sessionStorage.getItem('openid');
    const url = apiConfig.url + apiConfig.proxyUrl + apiConfig.api.deviceOper+"delete?" + 'token=' + token + '&openid=' + openid + '&did=' + deviceItem.did +
    '&mac=' + deviceItem.mac;
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, option)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      successCallback(data);
    }).catch(function(e) {
      errorCallback(e);
    });

  },
  bindDevice: function (successCallback){
    window.wx.scanQRCode({
      needResult: 0,
      scanType: ["qrCode", "barCode"],
      success: function(res){
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        successCallback(JSON.stringify(res));
      }
    });

  },
  /**
   * 获取pm25聚合数据
   */
  getPm25ChartData: function(did, token, startime, endtime, successCallback, errorCallback){
    const url = apiConfig.completeJzUrl + 'app/devdata/'+did+'/agg_data?start_ts='+startime+'&end_ts='+endtime+'&attrs=pm25&aggregator=max&unit=DAYS';
    console.log(url);
    const option = {
      method: 'GET',
      headers: {
        'X-Gizwits-Application-Id': apiConfig.jzAppId,
        'X-Gizwits-User-token': sessionStorage.getItem('token')
      }
    };

    fetch(url, option)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      successCallback(data);
    }).catch(function(e) {
      errorCallback(e);
    });
  },
  initGizwits: function(host, openId, appId, commType, funcs) {
    const gizwitsWS = new GizwitsWS(host, openId, appId, commType);

    //重写方法
    funcs.map((item, index) => {
      if(item.key == 'onInit'){
        const onInit = function(devicelist) {
          //保存uid 和token 
          sessionStorage.setItem('uid', gizwitsWS._userId);
          sessionStorage.setItem('token', gizwitsWS._userToken);
          
          item.value(devicelist);
        };
        gizwitsWS[item.key] = onInit;
      }else{
        gizwitsWS[item.key] = item.value;
      }
    });
    
    //初始化机智云
    gizwitsWS.init();
    return gizwitsWS;
  },
  /**
   * 天气API
   */
  getWeather: function(successCallback, errorCallback){
    window.wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        //调用百度接口，转换成城市
        wxApi.locationToAddress(latitude, longitude, (data) => {
          //返回地址信息
          let address = data.addressComponent.city;
          address = address.split('市')[0];
          //获取天气情况
          wxApi.getWeatherForCity(address, (data) => {
            successCallback(data);
          }, (e) => {
            errorCallback(e);
          });
        }, (err) => {
          console.log(err);
        });

      }
    });

  },
  getWeatherForCity: function (city, successCallback, errorCallback) {
    //获取天气情况
    const url = 'https://free-api.heweather.com/v5/weather?city='+city+'&key='+apiConfig.weatherApiKey;
    const option = {
      method: 'GET'
    };
    fetch(url, option)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      successCallback(data);
    }).catch(function(e) {
      errorCallback(e);
    });
  },
  /**
   * 通过经纬度获取天气
   */
  getWeatherForLocation: function (lat, long, successCallback, errorCallback) {
    wxApi.locationToAddress(lat, long, (data) => {
      //返回地址信息
      let address = data.addressComponent.city;
      address = address.split('市')[0];
      //获取天气情况
      wxApi.getWeatherForCity(address, (data) => {
        successCallback(data);
      }, (e) => {
        errorCallback(e);
      });
    }, (err) => {
      console.log(err);
    });
  },
  /**
   * 坐标转成地址
   */
  locationToAddress(lat, long, successCallback, errorCallback) {
    const url = 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location='+lat+','+long+'&output=json&pois=1&ak='+apiConfig.baiduMapAK;
    const option = {
      method: 'GET',
      mode: 'no-cors'
    };
    fetchJsonp(url, option)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      successCallback(data.result);
    }).catch(function(e) {
      errorCallback(e);
    });

  },
  getUrlParameter: function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }
};

export default wxApi;