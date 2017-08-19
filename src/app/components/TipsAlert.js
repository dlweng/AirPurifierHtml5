import React, {PropTypes, Component} from 'react';
import {Alert} from './Modal';

const styles = {
  container: {
  }
};

const titleStyles = {
  container: {
    color: '#000',
    verticalAlign: 'middle'
  },
  point: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#fcb82b',
    display: 'inline-block',
    marginRight: '6px',
    color: '#fff',
    fontSize: '12px',
    verticalAlign: 'middle',
    padding: '3px 0px'
  },
  text: {
    verticalAlign: 'middle'
  }
};
class Title extends Component {
  render() {
    return (
      <div style={titleStyles.container}>
        <span style={titleStyles.point}>!</span>      
        <span style={titleStyles.text}>设备连接失败</span>
      </div>
    );
  }
}

const contentStyles = {
  container: {
    fontSize: '12px',
    textAlign: 'left'
  },
  ul: {
    padding: '0px',
    listStyleType: 'none'
  },
  point: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#1db337',
    display: 'inline-block',
    marginRight: '6px'
  }
};
class Content extends Component {
  render() {
    return (
      <div style={contentStyles.container}>
        <span>添加失败，让我们看看可能哪里出了错：</span>
        <ul style={contentStyles.ul}>
          <li><span style={contentStyles.point}></span>设备是否正常运行</li>
          <li><span style={contentStyles.point}></span>Wi-Fi网络是否连接顺畅</li>
        </ul>
        <span>请拔下设备电源，再重新接通电源，再重试</span>
      </div>
    );
  }
} 


class TipsAlert extends Component {
  render() {
    return (
      <Alert title={<Title/>} content={<Content/>} isShow={this.props.isShow} onClose={() => {}} />
    );
  }
}

export default TipsAlert;
