import React, {PropTypes, Component} from 'react';

import NavBar from '../components/NavBar.js';
import TimeSelect from '../components/TimeSelect/TimeSelect.js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SendCmd} from '../actions/gizwits';

//引入原生的接口
import native from '../api/native';

const styles = {
  container: {
  }
};

class BottomNavBar extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onTimeSelectClose = this.onTimeSelectClose.bind(this);
    this.onTimeSelectConfirm = this.onTimeSelectConfirm.bind(this);

    this.state = {
      isShowTimeSelect: false,
      defaultTime: 0
    };

  }

  onChange(value) {

    let cmd = null;

    switch(value.key) {
      case 'power': {
        cmd = {Power: !value.value};
        break;
      }
      case 'auto': {
        //4是智能档
        const cmdValue = value.value == 4;
        if(cmdValue){

        }else{
          cmd = {Speed: 4};
        }
        break;
      }
      case 'lowSpeed': {
        const cmdValue = value.value == 1;
        if(cmdValue){

        }else{
          cmd = {Speed: 1};
        }
        break;
      }
      case 'midSpeed': {
        const cmdValue = value.value == 2;
        if(cmdValue){

        }else{
          cmd = {Speed: 2};
        }
        break;
      }
      case 'highSpeed': {
        const cmdValue = value.value == 3;
        if(cmdValue){

        }else{
          cmd = {Speed: 3};
        }
        break;
      }
      case 'humidity': {
        cmd = {Humidification: !value.value};
        break;
      }
      case 'lock': {
        cmd = {Lock: !value.value};
        break;
      }
      case 'delay': {
        this.setState({
          isShowTimeSelect: true,
          defaultTime: value.value
        });
        break;
      }
      case 'nightLed': {
        cmd = {NightLed: !value.value};
        break;
      }
      case 'sleepMode': {
        cmd = {SleepMode: !value.value};
        break;
      }
    }

    const {platform} = this.props;

    if(cmd) {
      if(platform == 'wechat') {
        this.props.actions.SendCmd({cmd, did: this.props.deviceinfo.did});
      }

      if(platform == 'mobile'){
        cmd = JSON.stringify(cmd);
        console.log(cmd);
        try {
          native.sendCommand('sendCmd', cmd);
        } catch (error) {

        }
      }
    }
  }

  onTimeSelectClose() {
    this.setState({
      isShowTimeSelect: false
    });
  }
  onTimeSelectConfirm(value) {
    console.log(value);
    this.setState({
      isShowTimeSelect: false
    });
    let cmd = {Delay: value};
    
    const {platform} = this.props;    
    
    if(platform == 'wechat') {
      this.props.actions.SendCmd({cmd, did: this.props.deviceinfo.did});
    }

    if(platform == 'mobile'){
      cmd = JSON.stringify(cmd);
      console.log(cmd);
      try {
        native.sendCommand('sendCmd', cmd);
      } catch (error) {

      }
    }

  }

  render() {
    const {Power, Speed, Lock, Humidification, Delay, NightLed, SleepMode} = this.props.deviceinfo.attrs;
    const data = {
      power: Power,
      auto: Speed == 4,
      lowSpeed: Speed == 1,
      midSpeed: Speed == 2,
      highSpeed: Speed == 3,
      humidity: Humidification,
      lock: Lock,
      delay: Delay,
      nightLed: NightLed,
      sleepMode: SleepMode
    };

    return (
      <div>
        <NavBar datas={data} onChange={this.onChange}/>
        <TimeSelect initialSlide={this.state.defaultTime} onConfirm={this.onTimeSelectConfirm} onClose={this.onTimeSelectClose} isShow={this.state.isShowTimeSelect}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceinfo: state.deviceinfo,
    platform: state.platform
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      SendCmd
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNavBar);
