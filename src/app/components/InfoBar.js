import React, {PropTypes, Component} from 'react';

const styles = {
  container: {
    width: '80%',
    maxWidth: '400px',
    borderRadius: '8px',
    padding: '14px 20px 15px 20px',
    border: '1px solid rgba(255,255,255,0.4)',
    margin: 'auto',
    fontSize: '13px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  item: {
    width: '25%',
    display: 'inline-block'
  },
  icon: {
    width: '14px',
    verticalAlign: 'middle',
    position: 'relative',
    display: 'inline-block',
    opacity: '0.8',
    marginRight: '4px'
  },
  unit: {
    fontSize: '8px',
    color: '#ffd83b'
  }
};

class InfoBar extends Component {
  render() {
    return (
      <div style={styles.container}>
        {
          this.props.datas.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <img style={styles.icon} src={item.icon}/>
                <span style={styles.label}>{item.label}</span>
                <sup style={styles.unit}>{item.unit}</sup>
              </div>
            );
          })
        }
      </div>
    );
  }
}

InfoBar.propTypes = {
  datas: PropTypes.array
};

export default InfoBar;
