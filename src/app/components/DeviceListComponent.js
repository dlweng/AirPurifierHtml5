import React, {PropTypes, Component} from 'react';
import {ConfirmInput, ConfirmAlert} from './Modal';

const deleteIcon = require('../images/delete.png');
const renameIcon = require('../images/rename.png');
const deviceLogo = require('../images/device_logo.png');

require('../../shadow.less');

const styles = {
  deviceList: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  tips: {
    fontSize: '14px',
    color: '#929292',
    textAlign: 'center',
    padding: '120px 0px 0px 0px',
    width: '100%'
  },
  noDeviceIcon: {
    width: '150px',
    display: 'block',
    margin: '0px auto 30px auto'
  },
  deviceItem: {
    position: 'relative',
    overflow: 'hidden',
    fontSize: '12px',
    backgroundColor: '#fff',
    height: '76px',
    padding: '7.5px 20px',
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  logo: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    top: '50%',
    marginTop: '-20px',
    left: '20px',
    padding: '2px',
    borderRadius: '4px'
  },
  logoImage: {
    width: '100%'
  },
  text: {
    width: '100%',
    padding: '0 140px 0 54px',
    position: 'absolute',
    top: '50%',
    marginTop: '-16px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  textTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    paddingBottom: '4px',
    color: '#299bd3',
    lineHeight: '1'
  },
  buttons: {
    position: 'absolute',
    overflow: 'hidden',
    top: '12px',
    right: '20px'
  },
  stateText: {
    fontSize: '11px',
    lineHeight: '1',
    color: 'rgba(0,0,0,0.7)'
  },
  iconButton: {
    textAlign: 'center',
    fontSize: '12px',
    marginLeft: '8px',
    float: 'left',
    width: '50px',
    height: '50px',
    padding: '10px 0px'
  },
  iconButtonImg: {
    width: '16px',
    height: '16px',
    marginBottom: '2px',
    opacity: '0.7'
  },
  iconButtonText: {
    fontSize: '10px',
    opacity: '0.7'    
  }
};

const noDeviceIcon = require('../images/no_device.png');

/**
 * 设备列表组件
 */
class DeviceListComponent extends Component {

  render() {
    const deviceList = this.props.devices;
    const isShowTips = deviceList.length == 0;
    return (
      <div style={styles.deviceList}>
      <div style={Object.assign({}, styles.tips, {display: isShowTips? 'block': 'none'})}>
        <img style={styles.noDeviceIcon} src={noDeviceIcon}/>
        <span>你还没有添加设备哟～</span>
      </div>
          {
            deviceList.map((item, index) => {
              return (
                <DeviceItem
                  style={index + 1 == deviceList.length? {border: 'none'}: {}}
                  renameFunc={this.props.renameFunc} 
                  deleteFunc={this.props.deleteFunc} 
                  itemData={item} 
                  onClick={this.props.onItemClick} 
                  {...item} 
                  key={item.id}/>
              );
            })
          }
      </div>
    );
  }
}

DeviceListComponent.propTypes = {
  devices: PropTypes.array,
  onItemClick: PropTypes.func,
  renameFunc: PropTypes.func,
  deleteFunc: PropTypes.func
};

/**
 * 设备item组件
 */
class DeviceItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.itemData);
  }
  render() {

    let logoStyle = {};
    let titleStyle = {};
    let stateTextStyle = {};

    switch(this.props.state) {
      case 'success':{
        titleStyle = {
          color: '#000'
        };
        stateTextStyle = {
          color: '#000'
        };
      } break;
      case 'default':{
        titleStyle = {
          color: '#000'
        };
        stateTextStyle = {
          color: 'rgba(0,0,0,0.5)'
        };
      } break;
      default :{
        titleStyle = {
          color: '#000'
        };
        stateTextStyle = {
          color: '#000'
        };
      } break;
    }

    return (
      <div style={Object.assign({}, styles.deviceItem, this.props.style)} onClick={this.handleClick} ref={c => {this.itemDom = c;}}>
        <div style={Object.assign({}, styles.logo, logoStyle)}>
          <img src={deviceLogo} style={styles.logoImage}/>
        </div>
        <div style={styles.text}>
          <div style={Object.assign({}, styles.textTitle, titleStyle)}>{this.props.name}</div>
          <div style={Object.assign({}, styles.stateText, stateTextStyle)}>{this.props.stateText}</div>
        </div>
        <div style={styles.buttons}>
          <RenameButton renameFunc={this.props.renameFunc} itemData={this.props.itemData}/>
          <DeleteButton deleteFunc={this.props.deleteFunc} itemData={this.props.itemData}/>
        </div>
      </div>
    );
  }

}

DeviceItem.propTypes = {
  name: PropTypes.string,
  state: PropTypes.string,
  stateText: PropTypes.string,
  logo: PropTypes.string,
  onClick: PropTypes.func,
  itemData: PropTypes.object,
  renameFunc: PropTypes.func,
  deleteFunc: PropTypes.func
};

/**
 * 按钮组件
 */
class HandleButton extends Component {
  //阻止事件冒泡
  componentDidMount() {
    this.buttonDom.addEventListener('mousedown', function(e){
      e.stopPropagation();
    });
    this.buttonDom.addEventListener('touchstart', function(e){
      e.stopPropagation();
    });
  }

  render() {
    const textStyle = {
      color: ''
    };
    switch (this.props.state) {
      case 'error': textStyle.color = '#ff7676';
        break;
      case 'success': textStyle.color = '#2cc951';
        break;
      case 'warning': textStyle.color = '#ffc27a';
        break;
      case 'default': textStyle.color = '#000';
        break;
      default: textStyle.color = '#000';
    }
    Object.assign(textStyle, styles.iconButtonText);
    return (
      <div ref={c => {this.buttonDom = c;}} style={styles.iconButton} onClick={this.props.onClick}>
        <img style={styles.iconButtonImg} src={this.props.src}/>
        <div style={textStyle}>{this.props.text}</div>
      </div>
    );
  }

}
HandleButton.propTypes = {
  src: PropTypes.string,
  text: PropTypes.string,
  state: PropTypes.string,
  onClick: PropTypes.func
};

class RenameButton extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modalIsShow: false
    };
  }
  /**
   * modal取消方法
   */
  handleClose() {
    this.setState({
      modalIsShow: false
    });
  }
  /**
   * 确定按钮回调
   */
  handleConfirm(name) {
    this.setState({
      modalIsShow: false
    });

    this.props.renameFunc(this.props.itemData, name);
  }

  handleClick(e) {
    this.setState({
      modalIsShow: true
    });
    e.stopPropagation();
  }

  render() {
    return (
      <div style={{float: 'left'}}>
        <HandleButton onClick={this.handleClick} state="default" text="重命名" src={renameIcon}/>
        <ConfirmInput
          onConfirm={this.handleConfirm}
          onClose={this.handleClose}
          isShow={this.state.modalIsShow}
          closeText="取消"
          confirmText="确定"
          inputValue={this.props.itemData.name}
          confirmButtonType="success"
          content="请输入新的名字"/>
      </div>
    );
  }
}
RenameButton.propTypes = {
  itemData: PropTypes.object,
  renameFunc: PropTypes.func
};

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modalIsShow: false
    };
  }
  /**
   * modal取消方法
   */
  handleClose() {
    this.setState({
      modalIsShow: false
    });
  }
  /**
   * 确定按钮回调
   */
  handleConfirm() {
    this.setState({
      modalIsShow: false
    });

    this.props.deleteFunc(this.props.itemData);
  }

  /**
   * 按钮的点击方法
   */
  handleClick(e) {
    this.setState({
      modalIsShow: true
    });
    e.stopPropagation();
  }

  render() {
    return (
      <div style={{float: 'left'}}>
        <HandleButton onClick={this.handleClick} state="default" text="删除" src={deleteIcon}/>
        <ConfirmAlert
          onConfirm={this.handleConfirm}
          onClose={this.handleClose}
          isShow={this.state.modalIsShow}
          closeText="取消"
          confirmText="确定"
          confirmButtonType="error"
          content="确定删除设备吗？"/>
      </div>
    );
  }
}
DeleteButton.propTypes = {
  itemData: PropTypes.object,
  deleteFunc: PropTypes.func
};


export default DeviceListComponent;
