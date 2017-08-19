import React, {Component} from 'react';
import DeviceList from '../containers/DeviceList';
import BindDeviceButton from '../containers/BindDeviceButton';

import wxApi from '../api/api';

const styles = {
  container: {
  },
  bottomButtonBox: {
    padding: '0px 30px 0px 30px',
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    backgroundColor: '#fff',
    height: '42px'
  },
  buttonPosition: {
    position: 'absolute',
    width: '100%',
    marginTop: '-24px',
    left: '0px',
    top: '0px'
  }
};


/**
 * 设备列表的页面
 */

class DeviceListPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    wxApi.wxJsConfig(['closeWindow', 'scanQRCode', 'openWXDeviceLib', 'getWXDeviceTicket', 'getLocation']);
  }

  render() {
    const {devices} = this.props;
    return (
      <div style={styles.container}>
        <DeviceList/>
        <div style={styles.bottomButtonBox}>
          <div style={styles.buttonPosition}>
            <BindDeviceButton/>
          </div>
        </div>

      </div>
    );
  }
}

export default DeviceListPage;
