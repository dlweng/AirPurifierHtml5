import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Loading from '../components/Modal';

/**
 * 这里需要做的工作是连接设备
 * 并对did进行处理，例如did发生改变的时候重新连接另一个设备
 */

class ConnetDevice extends Component {

  constructor(props) {
    super(props);

    this.getDeviceInfoTimeOut = null;
    this.onLoadingClose = this.onLoadingClose.bind(this);
    this.clearConnetTimeOut = this.clearConnetTimeOut.bind(this);
    this.setConnetTimeOut = this.setConnetTimeOut.bind(this);

    const {isDefault, isOnline} = this.props;
    this.state = {
      loadingState: {
        isShowIcon: false,
        isShow: !isOnline || isDefault,
        text: '正在连接设备'
      }
    };

    //设置超时
    if(isDefault == true || isOnline == false){
      this.setConnetTimeOut();
    }

  }

  clearConnetTimeOut() {
    clearTimeout(this.getDeviceInfoTimeOut);
    this.getDeviceInfoTimeOut = null;
  }

  setConnetTimeOut() {
    clearTimeout(this.getDeviceInfoTimeOut);
    this.getDeviceInfoTimeOut = null;
    this.getDeviceInfoTimeOut = setTimeout(() => {
      //设备状态设置为不在线
      this.setState({
        loadingState:{
          isShowIcon: false,
          isShow: true,
          text: '设备连接失败',
          onClose: () => {}
        }
      });
    }, 10000);
  }

  onLoadingClose() {
    this.setState({
      loadingState: {
        isShow: false
      }
    });
  }

  /**
   * 参数改变  调整ui
   * 这里需要做一个处理，当获取设备数据超过10s的时候，判断设备不在线
   * 切换状态
   */
  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
    const {isDefault, isOnline, gizwitsSocket} = nextProps;
    
    if(isDefault == false && isOnline == true){
      this.clearConnetTimeOut();
    }else{
      //设置超时
      this.setConnetTimeOut();
    }

    const loadingState = {
      isShowIcon: false,
      isShow: !isOnline || isDefault,
      text: '正在连接设备',
      onClose: () => {}
    };
    //显示loading
    this.setState({loadingState});

    //判断当路由变成defaultDevice的时候 判断是否存在默认设备
    if(nextProps.params.did == 'defaultDevice' && gizwitsSocket.isInit) {
      if(this.props.devicelist.length == 0){
        //提示没有绑定设备
        const loadingState = {
          isShowIcon: false,
          isShow: true,
          text: '当前没有绑定任何设备',
          onClose: () => {}
        };
        //显示loading
        this.setState({loadingState});
        
        this.clearConnetTimeOut();
      }
    }

  }

  render() {

    const {loadingState} = this.state;

    return (
      <div>
        {this.props.children}
        <Loading isShow={loadingState.isShow} text={loadingState.text} onClose={loadingState.onClose} isShowIcon={loadingState.isShowIcon}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.devicestate.isOnline,
    isDefault: state.deviceinfo.isDefault,
    devicelist: state.devicelist,
    gizwitsSocket: state.gizwitsSocket
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnetDevice);
