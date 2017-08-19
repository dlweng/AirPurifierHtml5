import React, {Component} from 'react';

import {dispatch} from 'redux';
import {connect} from 'react-redux';

import {RenameDeviceAsyn, DeleteDeviceAsyn} from '../actions/deviceList';
import {GoToDevice} from '../actions/gizwits';

import DeviceListComponent from '../components/DeviceListComponent';

function mapStateToProps(state) {
  return {
    devices: state.devicelist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onItemClick: (deviceItem) => {
      dispatch(GoToDevice(deviceItem));
    },
    renameFunc: (deviceItem, newName) => {
      dispatch(RenameDeviceAsyn(deviceItem, newName));
    },
    deleteFunc: (deviceItem) => {
      dispatch(DeleteDeviceAsyn(deviceItem));
    }
  };
}

const DeviceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceListComponent);

export default DeviceList;
