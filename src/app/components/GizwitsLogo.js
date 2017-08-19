import React, {PropTypes, Component} from 'react';
const styles = {
  container: {
    color: '#fff',
    textAlign: 'center'
  },
  icon: {
    width: '14px',
    position: 'relative',
    top: '2px',
    marginRight: '4px'
  }
};
const icon = require('../images/gizwits-icon.png');
class GizwitsLogo extends Component {
  render() {
    return (
      <div style={styles.container}>
        <img style={styles.icon} src={icon}/>
        <span>机智云·为智能硬件而生</span>
      </div>
    );
  }
}
export default GizwitsLogo;