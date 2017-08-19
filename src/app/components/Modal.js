import React, {PropTypes, Component} from 'react';

require('../../loading.less');

const styles = {
  overlay: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: '1000'
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',    
    width: '260px',
    height: '160px',
    margin: '-50px auto 0px auto',
    position: 'relative',
    padding: '0px 30px 0px 30px'    
  },
  alertBox: {
    backgroundColor: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',
    width: '82%',
    maxWidth: '280px',
    margin: '-50px auto 0px auto',
    padding: '20px 30px 20px 30px',
    position: 'relative',
    fontSize: '14px',
    lineHeight: '1.4'
  },
  alertTitle: {
    textAlign: 'center',
    fontSize: '17px',
    color: '#ffb716',
    padding: '0px 0px 4px 0px'
  },
  alertContent: {
    padding: '20px 0px',
    textAlign: 'center'
  },
  modalContentBox: {
    display: 'table',
    overflow: 'hidden',
    height: '117px',
    width: '100%'
  },
  modalContent: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  buttonBox: {
    position: 'absolute',
    width: '100%',
    bottom: '0px',
    borderTop: '1px solid #e6e6e6',
    left: '0px'
  },
  button: {
    float: 'left',
    width: '50%',
    textAlign: 'center',
    lineHeight: '42px',
    fontSize: '12px'
  },
  buttonBorderRight: {
    borderRight: '1px solid #e6e6e6'
  },
  boxTitle: {
    textAlign: 'center',
    fontSize: '13px',
    lineHeight: '1.4'
  },
  input: {
    outline: '0',
    border: '1px solid #e6e6e6',
    width: '80%',
    height: '30px',
    padding: '0px 8px',
    margin: '14px 0px 0px 10%',
    borderRadius: '2px'
  },
  loadingBox: {
    width: '240px',
    borderRadius: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    margin: '-50px auto 0px auto',    
    fontSize: '13px',
    color: '#fff',
    padding: '30px 20px'
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '13px'
  },
  loadingIcon: {
    marginBottom: '18px'
  }
};

const CenterStyle = {
  container: {
    display: 'table',
    height: '100%',
    width: '100%'
  },
  cell: {
    verticalAlign: 'middle',
    height: '100%',
    width: '100%',
    display: 'table-cell'
  }
};

/**
 * loading
 */
class Loading extends Component {
  render() {
    return (
      <Overlay onClose={this.props.onClose} isShow={this.props.isShow}>
        <LoadingContent isShowIcon={this.props.isShowIcon} text={this.props.text}></LoadingContent>
      </Overlay>
    );
  }
}
Loading.propTypes = {
  text: PropTypes.string,
  isShow: PropTypes.bool,
  isShowIcon: PropTypes.bool,
  onClose: PropTypes.func
};

/**
 * loading的主要元素
 */
class LoadingContent extends Component {
  render() {
    return (
      <div style={styles.loadingBox}>
        <div style={Object.assign({}, {display: this.props.isShowIcon ? 'block': 'none'}, styles.loadingIcon)} className="loader"></div>
        <div style={styles.loadingText}>{this.props.text}</div>
      </div>
    );
  }
}
LoadingContent.defaultProps = {
  isShowIcon: true  
};
LoadingContent.propTypes = {
  text: PropTypes.string,
  isShowIcon: PropTypes.bool  
};

/**
 * 提示框
 */
class Alert extends Component {
  render() {
    return (
      <Overlay onClose={this.props.onClose} isShow={this.props.isShow}>
        <div style={styles.alertBox}>
          <div style={styles.alertTitle}>
            {this.props.title} 
          </div>
          <div style={styles.alertContent}>
            {this.props.content}
          </div>
        </div>
      </Overlay>
    );
  }
}
Alert.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClose: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

/**
 * 带输入框的确认弹窗
 */
class ConfirmInput extends Component {
  render() {
    return (
      <Overlay onClose={this.props.onClose} isShow={this.props.isShow}>
        <ConfirmInputBox
          onClose={this.props.onClose}
          onConfirm={this.props.onConfirm}
          closeText={this.props.closeText}
          confirmText={this.props.confirmText}
          confirmButtonType={this.props.confirmButtonType}
          cancelButtonType={this.props.cancelButtonType}
          inputValue={this.props.inputValue}
          content={this.props.content}/>
      </Overlay>
    );
  }
}
ConfirmInput.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  isShow: PropTypes.bool,
  closeText: PropTypes.string,
  confirmText: PropTypes.string,
  content: PropTypes.string
};
/**
 * 普通确认框
 */
class ConfirmAlert extends Component {
  render() {
    return (
      <Overlay onClose={this.props.onClose} isShow={this.props.isShow}>
        <ConfirmAlertBox
          onClose={this.props.onClose}
          onConfirm={this.props.onConfirm}
          closeText={this.props.closeText}
          confirmText={this.props.confirmText}
          confirmButtonType={this.props.confirmButtonType}
          cancelButtonType={this.props.cancelButtonType}
          content={this.props.content}/>
      </Overlay>
    );
  }
}
ConfirmAlert.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  isShow: PropTypes.bool,
  closeText: PropTypes.string,
  confirmText: PropTypes.string,
  confirmButtonType: PropTypes.string,
  cancelButtonType: PropTypes.string,
  content: PropTypes.string
};

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //阻止事件冒泡
  componentDidMount() {
    this.overlayDom.addEventListener('mousedown', function(e){
      e.stopPropagation();
    });
    this.overlayDom.addEventListener('touchstart', function(e){
      e.stopPropagation();
    });
  }

  //阻止冒泡
  handleClick(e) {
    if(!this.props.onClose) {
    }else{
      this.props.onClose(e);
    }
    e.stopPropagation();
  }

  render() {
    const style = {
      display: this.props.isShow ? 'block' : 'none'
    };
    return (
      <div ref={c => {this.overlayDom = c;}} onClick={this.handleClick} style={Object.assign({}, styles.overlay, style)}>
        <div style={CenterStyle.container}>
          <div style={CenterStyle.cell}>
            {this.props.children}
          </div>
        </div>        
      </div>
    );
  }
}

Overlay.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isShow: PropTypes.bool,
  onClose: PropTypes.func
};

class ConfirmInputBox extends Component {

  constructor(props) {
    super(props);

    this.onConfirmHandle = this.onConfirmHandle.bind(this);
    this.onCloseHandle = this.onCloseHandle.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      length: this.props.inputValue.length
    };
  }

  handleClick(e) {
    e.stopPropagation();
  }

  onConfirmHandle() {
    if(this.state.length != 0){
      const name = this.inputDom.value;
      this.props.onConfirm(name);
    }
  }

  //重置输入框的值
  onCloseHandle() {
    this.props.onClose();
    this.inputDom.value = this.props.inputValue;
    this.setState({
      length: this.props.inputValue.length
    });
  }

  onChange() {
    const length = this.inputDom.value.length;
    this.setState({
      length: length
    });
  }

  render() {
    return (
      <div onClick={this.handleClick} style={styles.modalBox}>
        <div style={styles.modalContentBox}>
          <div style={styles.modalContent}>
            <div style={styles.boxTitle}>{this.props.content}</div>
            <input ref={c => {this.inputDom = c;}} maxLength="15" onChange={this.onChange} style={styles.input} defaultValue={this.props.inputValue}/>
          </div>
          <Buttons 
            onClose={this.onCloseHandle}
            onConfirm={this.onConfirmHandle}
            closeText={this.props.closeText}
            confirmText={this.props.confirmText}
            confirmButtonType={this.state.length == 0? '': this.props.confirmButtonType}
            cancelButtonType={this.props.cancelButtonType}/>
        </div>
      </div>
    );
  }
}
ConfirmInputBox.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  closeText: PropTypes.string,
  confirmText: PropTypes.string,
  confirmButtonType: PropTypes.string,
  cancelButtonType: PropTypes.string,
  content: PropTypes.string
};

class ConfirmAlertBox extends Component {
  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div onClick={this.handleClick} style={styles.modalBox}>
        <div style={styles.modalContentBox}>
          <div style={styles.modalContent}>
            <div style={styles.boxTitle}>{this.props.content}</div>
          </div>
          <Buttons 
            onClose={this.props.onClose}
            onConfirm={this.props.onConfirm}
            closeText={this.props.closeText}
            confirmText={this.props.confirmText}
            confirmButtonType={this.props.confirmButtonType}
            cancelButtonType={this.props.cancelButtonType}/>
        </div>
      </div>
    );
  }
}
ConfirmAlertBox.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  closeText: PropTypes.string,
  confirmText: PropTypes.string,
  confirmButtonType: PropTypes.string,
  cancelButtonType: PropTypes.string,
  content: PropTypes.string
};

class Buttons extends Component {

  getButtonStyle(type) {
    let style = {};
    switch(type) {
      case "success":
        style = {
          color: 'rgb(10, 196, 107)',
          backgroundColor: '#fff'
        };
      break;
      case "error":
        style = {
          color: '#fff',
          backgroundColor: '#ff7676'
        };
      break;
      default :
        style = {
          color: '#d6d6d6'
        };
      break;
    }
    return style;
  }

  render() {
    const cancelButtonStyle = this.getButtonStyle(this.props.cancelButtonType);
    const confirmButtonStyle = this.getButtonStyle(this.props.confirmButtonType);
    return (
      <div style={styles.buttonBox}>
        <div onClick={this.props.onClose} style={Object.assign({}, styles.button, styles.buttonBorderRight, cancelButtonStyle)}>取消</div>
        <div onClick={this.props.onConfirm} style={Object.assign({}, styles.button, confirmButtonStyle)}>确定</div>
      </div>
    );
  }
}
Buttons.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  closeText: PropTypes.string,
  confirmText: PropTypes.string,
  confirmButtonType: PropTypes.string,
  cancelButtonType: PropTypes.string
};

export default Loading;
export {ConfirmInput, ConfirmAlert, Alert};
