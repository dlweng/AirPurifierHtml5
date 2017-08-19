import React, {Component} from 'react';

import {dispatch} from 'redux';
import {connect} from 'react-redux';

import RadiusButton from '../components/RadiusButton';

import wxApi from '../api/api';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      wxApi.bindDevice().then(() => {
        //扫码成功
      }).catch((e) => {
        //提示错误
      });
    }
  };
}

const BindDeviceButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(RadiusButton);

export default BindDeviceButton;
