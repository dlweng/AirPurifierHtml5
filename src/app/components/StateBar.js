import React, {PropTypes, Component} from 'react';

const styles = {
  container: {
    width: '90%',
    maxWidth: '400px',
    borderRadius: '8px',
    padding: '14px 10px 12px 10px',
    margin: 'auto',
    fontSize: '13px',
    color: '#777777',
    textAlign: 'center'
  },
  item: {
    width: '33.33%',
    display: 'inline-block'
  },
  unit: {
    fontSize: '10px',
  },
  value: {
    fontSize: '19px',
    color: '#fff'
  },
  label: {
    fontSize: '12px',
    marginBottom: '8px',
    color: '#fff',
    paddingRight: '10px'    
  },
  rightIcon: {
    height: '14px',
    position: 'relative',
    marginLeft: '-10px',
    top: '2px'
  },
};

const rightIcon = require('../images/right_icon.png');

class StateBar extends Component {
  render() {
    return (
      <div style={styles.container} onClick={this.props.onClick}>
        {
          this.props.datas.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <span style={styles.label}>{item.label}</span>
                <span style={styles.value}>{item.value}<sup style={styles.unit}>{item.unit}</sup></span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

StateBar.propTypes = {
  datas: PropTypes.array,
  onClick: PropTypes.func,
};

export default StateBar;
