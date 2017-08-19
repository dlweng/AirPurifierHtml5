import React, {Component} from 'react';

import AirInfoBar from '../containers/AirInfoBar';
import AirStateBar from '../containers/AirStateBar';
import BottomNavBar from '../containers/BottomNavBar';
import DeviceDashboard from '../containers/DeviceDashboard';

import GizwitsLogo from '../components/GizwitsLogo';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {UpDateWeatherAsyn, UpDateWeatherForNativeAsyn, UpDateWeatherForTestAsyn} from '../actions/weather';

import wxApi from '../api/api';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  gizwitsLogo: {
    position: 'fixed',
    bottom: '70px',
    width: '100%'
  },
  navContainer: {
    position: 'absolute',
    width: '100%',
    bottom: '0px'
  },
  airInfoBarContainer: {
    position: 'absolute',
    width: '100%',
    top: '30px'
  },
  airStateBarContainer: {
    position: 'absolute',
    width: '100%',
    bottom: '160px'
  },
  dashboardContainer: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    marginTop: '-190px'
  }
};

class DeviceInfoPage extends Component {

  constructor(props) {
    super(props);
    this.updateWeather = this.updateWeather.bind(this);
  } 

  updateWeather(platform) {
    if(platform == 'wechat') {
      wxApi.wxJsConfig(['getLocation'], () => {
        //获取天气信息
        this.props.actions.UpDateWeatherAsyn();
      });
    }
    if(platform == 'mobile'){
      this.props.actions.UpDateWeatherForNativeAsyn();
    }
  }

  componentDidMount() {
    this.updateWeather(this.props.platform);
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.platform != this.props.platform) {
      this.updateWeather(nextProps.platform);
    }
  }

  render() {

    const {PM25Indoor} = this.props.deviceinfo.attrs;
    let dashboardState = '';
    let bgColor = '';

    if(PM25Indoor <= 50) {
      dashboardState = 'high';
      bgColor = {background: '-webkit-radial-gradient(circle, #24d982,#0ac46b)'};
    }else if(PM25Indoor > 50 && PM25Indoor <= 100) {
      dashboardState = 'middle';
      bgColor = {background: '-webkit-radial-gradient(circle, #e5a80f,#d58f0d)'};
    }else if(PM25Indoor > 100 && PM25Indoor <= 150) {
      dashboardState = 'low';
      bgColor = {background: '-webkit-radial-gradient(circle, #e8790e,#dd620b)'};
    }else if(PM25Indoor > 150 && PM25Indoor <= 200) {
      dashboardState = 'low';
      bgColor = {background: '-webkit-radial-gradient(circle, #e8790e,#dd620b)'};
    }else if(PM25Indoor > 200 && PM25Indoor <= 300) {
      dashboardState = 'low';
      bgColor = {background: '-webkit-radial-gradient(circle, #e8790e,#dd620b)'};
    }else if(PM25Indoor > 300 && PM25Indoor <= 650) {
      dashboardState = 'low';
      bgColor = {background: '-webkit-radial-gradient(circle, #e8790e,#dd620b)'};
    }
    
    return (
      <div style={Object.assign({}, styles.container, bgColor)}>
         { <div style={styles.airInfoBarContainer}>
          <AirInfoBar/>
        </div>  }
        <div style={styles.dashboardContainer}>
          <DeviceDashboard/>
        </div>
        <div style={styles.airStateBarContainer}>
          <AirStateBar/>            
        </div>

        {/* <div style={styles.gizwitsLogo}>
          <GizwitsLogo/>
        </div> */}
        
        <div style={styles.navContainer}>
          <BottomNavBar/>
        </div>
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
      UpDateWeatherAsyn,
      UpDateWeatherForNativeAsyn,
      UpDateWeatherForTestAsyn
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfoPage);
