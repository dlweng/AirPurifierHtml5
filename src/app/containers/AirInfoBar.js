import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import InfoBar from '../components/InfoBar.js';

const icon1 = require('../images/icon_location.png');
const icon2 = require('../images/icon_PM25.png');
const icon3 = require('../images/icon_temp.png');
const icon4 = require('../images/icon_water.png');


const styles = {
  container: {
  }
};

class AirInfoBar extends Component {
  render() {

    const {location, tmp, pm25, hum} = this.props.weather;

    const datas = [
      {icon: icon1, label: location, unit: ''},
      {icon: icon2, label: pm25, unit: '中'},
      {icon: icon3, label: tmp, unit: '℃'},
      {icon: icon4, label: hum, unit: '%'},
    ];

    return (
      <InfoBar datas={datas}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirInfoBar);
