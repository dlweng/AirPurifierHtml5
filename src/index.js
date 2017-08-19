import 'babel-polyfill';

import './index.html';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';
import {Router, Route, createHashHistory, Redirect} from 'react-router';

import DeviceAnalysisPage from './app/page/DeviceAnalysisPage';
import DeviceInfoPage from './app/page/DeviceInfoPage';
import DeviceListPage from './app/page/DeviceListPage';
import Init from './app/containers/Init';
import MobileInit from './app/containers/MobileInit';
import ConnetDevice from './app/containers/ConnetDevice';

//连接设备的action
import {ConnectedDevice, GoToDevice} from './app/actions/gizwits';
import {UpDateDeviceInfo} from './app/actions/device';

import 'lib-flexible/flexible.js';

import wxApi from './app/api/api';

require('./index.less');

const store = configureStore();

//解析hash参数，重定向，解决微信不兼容hash的问题
const hash = wxApi.getUrlParameter('hash');
if(hash != null) {
  location.hash = '#'+hash;
}

//connetDevice路由发生改变，发送连接设备的action 处理did为defaultDevice的特殊情况
const routerWillEnter = (nextState, replace) => {
  const paramDid = nextState.params.did;
  const stateData = store.getState();
  const devicelist = stateData.devicelist;
  const gizwitsSocket = stateData.gizwitsSocket;

  console.log(nextState);  
  console.log(gizwitsSocket);  

  let deviceinfo = Object.assign({}, stateData.deviceinfo);

  if(paramDid != 'defaultDevice') {
    deviceinfo.did = paramDid;
    deviceinfo.isDefault = true;
    store.dispatch(UpDateDeviceInfo(deviceinfo));
    store.dispatch(ConnectedDevice(paramDid));
  }
  if(paramDid == 'defaultDevice' && gizwitsSocket.isInit) {
    //初始化完成，且路由id为defaultDevice 跳转过去默认的设备
    for(let i = 0; i< devicelist.length; i++) {
      if(devicelist[i].is_online == true) {
        store.dispatch(GoToDevice(devicelist[i], {isCover: true}));
        break;
      }
    }
  }

};

const deviceListWillEnter = (nextState, replace) => {
};

render(
  <Provider store={store}>
    <Router history={createHashHistory}>

      <Route path="/" component={Init}>
        <Route path="devicelist" component={DeviceListPage} onEnter={deviceListWillEnter}/>
        <Route path="connetDevice/:did" component={ConnetDevice} onEnter={routerWillEnter}>
          <Route path="deviceinfo" component={DeviceInfoPage}/>
          <Route path="deviceAnalysis" component={DeviceAnalysisPage}/>
        </Route>
      </Route>

      <Route path="/mobile" component={MobileInit}>
        <Route path="deviceinfo" component={DeviceInfoPage}/>
        <Route path="deviceAnalysis" component={DeviceAnalysisPage}/>
      </Route>

    </Router>
  </Provider>,
  document.getElementById('root')
);