import React, {PropTypes, Component} from 'react';

import StateBar from '../components/StateBar.js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const icon1 = require('../images/icon_location.png');
const icon2 = require('../images/icon_PM25.png');
const icon3 = require('../images/icon_temp.png');
const icon4 = require('../images/icon_water.png');

const styles = {
  container: {
  }
};

class AirStateBar extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
  }

  render() {
    
    const {TVOC, FilterPercent} = this.props.deviceinfo.attrs;

    let TVOC_Text = '';
    switch(TVOC) {
      case 0: {
        TVOC_Text = '优';
        break;
      }
      case 1: {
        TVOC_Text = '良';        
        break;
      }
      case 2: {
        TVOC_Text = '差';        
        break;        
      }
    }

    const datas = [
      {value: TVOC_Text, label: 'voc', unit: ''},
      {value: FilterPercent, label: '滤网', unit: '%'},
    ];

    return (
      <StateBar datas={datas} onClick={this.onClick}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceinfo: state.deviceinfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirStateBar);
