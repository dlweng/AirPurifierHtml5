import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Dashboard from '../components/Dashboard/Dashboard';

class DeviceDashboard extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {platform} = this.props;
    if(platform == 'mobile'){
      window.location.hash = '#/mobile/deviceAnalysis';
    }
    if(platform == 'wechat'){
      window.location.hash = '#/connetDevice/'+this.props.deviceinfo.did+'/deviceAnalysis';
    }
  }

  render() {
    const value = this.props.deviceinfo.attrs.PM25Indoor;
    return (
      <div>
        <Dashboard data={value} tipsClick={this.onClick}/>
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
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceDashboard);
