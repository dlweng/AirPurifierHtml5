import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {UpDateDeviceState, UpDateDeviceInfo} from '../actions/device';
import {SetPlatform} from '../actions/platform';
import {UpDateWeatherForNativeAsyn} from '../actions/weather';

import Loading from '../components/Modal';

class MobileInit extends Component {

  constructor(props) {
    super(props);
    //监听底层回调
    this.showFromDeviceResponse = this.showFromDeviceResponse.bind(this);
    this.showFromDeviceState = this.showFromDeviceState.bind(this);
    this.setAddress = this.setAddress.bind(this);
    
    const {isDefault, isOnline} = this.props;

    this.state = {
      loadingState: {
        isShowIcon: true,
        isShow: !isOnline || isDefault,
        text: '正在获取设备数据'
      }
    };

    
  }

  componentDidMount() {
    
    const _this = this;
    window.showFromDeviceState = function(par) {
      _this.showFromDeviceState(par);
    };
    window.showFromDeviceResponse = function(par) {
      _this.showFromDeviceResponse(par);
    };
    window.setAddress = function(par) {
      _this.setAddress(par);
    };

    //设置当前平台
    this.props.actions.SetPlatform('mobile');
  }

  setAddress(par) {
    const data = JSON.parse(par);
    this.props.actions.UpDateWeatherForNativeAsyn(data.latitude, data.longitude);
  }

  componentWillReceiveProps(nextProps) {
    const isOnline = nextProps.isOnline;
    const isDefault = nextProps.isDefault;
    
    const loadingState = {
      isShowIcon: !!isOnline,
      isShow: !isOnline || isDefault,
      text: isOnline? '正在获取设备数据': '当前设备不在线'
    };
    //显示loading
    this.setState({loadingState});
  }

  //从底层获取设备状态
  showFromDeviceState(par) {
    //返回{isOnline:0}
    //发送更新事件
    par = JSON.parse(par);
    par.isOnline = Boolean(par.isOnline);

    this.props.actions.UpDateDeviceState(par);
  }
  //从底层获取设备信息
  showFromDeviceResponse(par) {
    console.log(par);
    par = JSON.parse(par);
    //统一两个平台的数据结构
    const deviceInfo = {attrs: par.data};
    //发送更新事件
    deviceInfo.isDefault = false;
    this.props.actions.UpDateDeviceInfo(deviceInfo);
  }

  render() {
    const {loadingState} = this.state;
    return (
      <div>
        {this.props.children}
        <Loading text={loadingState.text} isShowIcon={loadingState.isShowIcon} isShow={loadingState.isShow}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isDefault: state.deviceinfo.isDefault,
    isOnline: state.devicestate.isOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      UpDateDeviceState,
      UpDateDeviceInfo,
      SetPlatform,
      UpDateWeatherForNativeAsyn
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileInit);