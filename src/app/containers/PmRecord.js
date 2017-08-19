import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPm25DataAsyn} from '../actions/pm25Data';

import LineChart from '../components/LineChart';

const styles = {
  container: {
    height: '100%',
    backgroundColor: '#fff'
  }
};

class PmRecord extends Component {

  constructor(props) {
    super(props);
    //获取pm25的聚合数据
    this.props.actions.getPm25DataAsyn(this.props.deviceinfo.did, sessionStorage.getItem('token'));
  }

  render() {
    return (
      <div style={styles.container} className="z-depth-1">
        <LineChart {...this.props.datas}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    datas: state.pmRecord,
    deviceinfo: state.deviceinfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getPm25DataAsyn
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PmRecord);
