import React, {PropTypes, Component} from 'react';

const icon = require('../images/icon_plus.png');

const styles = {
  container: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    margin: 'auto'
  },
  button: {
    fontSize: '16px',
    background: '-webkit-linear-gradient(top, #0ac46b,#0ac46b)',
    width: '100%',
    height: '100%',
    color: '#fff',
    lineHeight: '1',
    borderRadius: '50%',    
    textAlign: 'center',
    overflow: 'hidden',
    display: 'block',
    padding: '18px',
    border: '3px solid #fff'
  },
  icon: {
    width: '100%',
    display: 'block'
  }
};

class RadiusButton extends Component {
  render() {
    const {onClick} = this.props;
    return (
      <div onClick={onClick} style={styles.container}>
        <div ref={c => {this.itemDom = c;}} style={styles.button}>
          <img src={icon} style={styles.icon}/>
        </div>        
      </div>
    );
  }
}

RadiusButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default RadiusButton;
