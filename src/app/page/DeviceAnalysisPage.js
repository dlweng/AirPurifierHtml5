import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import PmRecord from '../containers/PmRecord';

const styles = {
  container: {
    height: '100%',
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%'
  }
};

class DeviceAnalysisPage extends Component {

  render() {
    
    return (
      <div style={Object.assign({}, styles.container)}>
        <PmRecord/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceAnalysisPage);
