import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {UpdateDeviceList} from '../actions/deviceList';
import {UpDateDeviceState, UpDateDeviceInfo} from '../actions/device';
import {CreateGizwitsHandle, InitGizwits, ConnectedDevice, GoToDevice, ReadDeviceInfo} from '../actions/gizwits';
import {SetPlatform} from '../actions/platform';

import apiConfig from '../../config/apiConfig';

import wxApi from '../api/api';

/**
 * 初始化机智云
 */

class Init extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tipsState: false,
      tipsTitle: '',
      tipsContent: ''
    };

    this.onAlertClose = this.onAlertClose.bind(this);
  }

  onAlertClose() {
    this.setState({
      tipsState: false
    });
  }

  componentDidMount() {

    //设置当前平台
    this.props.actions.SetPlatform('wechat');

    wxApi.getOpenId((OpenId) => {

      //初始化机智云成功的回调 返回设备列表
      const onInit = (devices) => {
        //更新到 store
        devices.map((item, index) => {
          if(item.dev_alias == ''){
            devices[index].dev_alias = '空气净化管家';
          }
        });
        console.log(devices);
        this.props.actions.UpdateDeviceList(devices);

        /**
        * 初始化成功，需要手动连接一次，防止还没初始化的时候后面的路由已经连接了
        * 这样做是为了更快渲染页面，不用等到初始化完成再渲染，但是感觉可以再优化
        */
        
        //发送初始化成功的action
        this.props.actions.InitGizwits();
        if(this.props.params.did == 'defaultDevice') {
          //连接第一个在线设备
          
          for(let i = 0; i< devices.length; i++) {
            if(devices[i].is_online == true) {
              this.props.actions.GoToDevice(devices[i], {isCover: true});
              break;
            }
          }
        }else{
          this.props.actions.ConnectedDevice(this.props.params.did);
        }


      };

      //设备上下限通知
      const onOnlineStatusChanged = (value) => {
        // value = did 和 is_online
        console.log(value);
        this.props.actions.UpDateDeviceState({isOnline: value.is_online});
        if(value.is_online == true){
          //上线的时候应该先读取一次数据
          this.props.actions.ReadDeviceInfo(value.did);
        }
      };

      //监听设备上报数据
      const onReceivedAttrs = (data) => {
        //这里判断上报的数据是不是当前激活的设备
        if(this.props.gizwitsSocket.activeConnetDevice == data.did) {
          data.isDefault = false;
          this.props.actions.UpDateDeviceInfo(data);
          //收到设备上报的数据，可以把state 设置为上线
          this.props.actions.UpDateDeviceState({isOnline: true});
        }
      };
      //链接失败的时候回调
      const onError = (value) => {
        if(!this.props.params.did) {
          
        }else{
          setTimeout(() => {
            this.props.actions.ConnectedDevice(this.props.params.did);
          }, 400);
        }
      };

      //连接成功的回调
      const onConnected = () => {
        //发送手动读取数据的action
        setTimeout(() => {
          this.props.actions.ReadDeviceInfo(this.props.params.did);
        }, 100);
      };

      //重写回调方法 onInit 要用这种方式写，因为对他做了一层嵌套用来保存 token 和 uid
      const funcs = [
        {key: 'onInit', value: onInit},
        {key: 'onReceivedAttrs', value: onReceivedAttrs},
        {key: 'onError', value: onError},
        {key: 'onConnected', value: onConnected},
        {key: 'onOnlineStatusChanged', value: onOnlineStatusChanged}
      ];

      this.props.actions.CreateGizwitsHandle(apiConfig.jzUrl, OpenId, apiConfig.jzAppId, 'attrs_v4', funcs);

    }, (e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gizwitsSocket: state.gizwitsSocket
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      UpdateDeviceList,
      CreateGizwitsHandle,
      InitGizwits,
      ConnectedDevice,
      GoToDevice,
      ReadDeviceInfo,
      UpDateDeviceInfo,
      UpDateDeviceState,
      SetPlatform,
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init);
