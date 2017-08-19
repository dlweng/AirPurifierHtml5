import React, {PropTypes, Component} from 'react';
import Swiper from 'swiper';
require('swiper/dist/css/swiper.css');
require('./TimeSelect.less');

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px',
    zIndex: '100'
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px'
  },
  contentBox: {
    backgroundColor: '#fff',
    width: '240px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: '6px',
    margin: '-130px 0px 0px -120px',
    paddingBottom: '38px'
  },
  timeBox: {
    height: '142px',
    overflow: 'hidden',
    position: 'relative'
  },
  buttonBox: {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    bottom: '0px',
    textAlign: 'center',
    fontSize: '13px',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    zIndex: '99'
  },
  button: {
    width: '50%',
    float: 'left',
    padding: '12px 0px',
    color: 'rgba(191,191,191,1)'
  },
  activeButton: {
    color: '#11c66f'
  },
  borderRight: {
    borderRight: '1px solid rgba(0,0,0,0.1)'
  },
  timeBorder: {
    backgroundColor: '#f5f5f5',
    height: '30px',
    width: '100%',
    position: 'absolute',
    top: '50%',
    marginTop: '-16px'
  },
  swiperSlide: {
    fontSize: '16px',
    lineHeight: '28px'
  },
  swiperContainer: {
    height: '142px',
    textAlign: 'center'
  },
  shadow: {
    width: '100%',
    position: 'absolute',
    zIndex: '99',
    height: '30px',
    borderRadius: '6px',
    pointerEvents: 'none'
  },
  title: {
    textAlign: 'center',
    padding: '14px 0px 10px 0px',
    fontSize: '15px'
  },
  shadowTop: {
    top: '0px',
    background: '-webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0))'
  },
  shadowBottom: {
    bottom: '0px',
    background: '-webkit-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,1))'
  },
  timeBorderLeftText: {
    position: 'absolute',
    right: '50%',
    marginRight: '20px',
    lineHeight: '29px',
    fontSize: '15px'
  },
  timeBorderRightText: {
    position: 'absolute',
    left: '50%',
    marginLeft: '20px',
    lineHeight: '32px',
    fontSize: '14px'
  }
};

class TimeSelect extends Component {

  constructor(props) {
    super(props);
    this.onConfirmHandle = this.onConfirmHandle.bind(this);
    this.onCloseHandle = this.onCloseHandle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.initialSlide != this.props.initialSlide){
      this.mySwiper.slideTo(nextProps.initialSlide);
    }
  }

  componentDidMount() {
    //初始化swiper

    let activeIndex = 0;
    if(!this.props.initialSlide){
      
    }else {
      activeIndex = this.props.initialSlide;
    }

    this.mySwiper = new Swiper(this.swiperDom, {
      direction : 'vertical',
      initialSlide: activeIndex,
      slidesPerView : 5,
      centeredSlides : true,
      height: 144
    });
  }

  onConfirmHandle() {
    const activeIndex = this.mySwiper.activeIndex;
    console.log("选择的时间是activeIndex = " + activeIndex);
    this.props.onConfirm(activeIndex);
  }

  onCloseHandle() {
    //关闭窗口，复位
    this.props.onClose();
    this.mySwiper.slideTo(this.props.initialSlide);
  }

  render() {

    const {isShow} = this.props;


    const swiperData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 12, 18, 24, 36, 72];

    return (
      <div className="time-select" style={Object.assign({}, styles.container, {display: isShow? 'block': 'none'})}>

        <div onClick={this.onCloseHandle} style={Object.assign({}, styles.background)}>
          
        </div>

        <div style={styles.contentBox}>

          <div style={styles.title}>延时关机</div>

          <div style={styles.timeBox}>

            <div style={Object.assign({}, styles.shadow, styles.shadowTop)}></div>
            <div style={Object.assign({}, styles.shadow, styles.shadowBottom)}></div>

            <div style={styles.timeBorder}>
              <div style={styles.timeBorderLeftText}></div>
              <div style={styles.timeBorderRightText}>小时后</div>
            </div>
            
            <div className="swiper-container" style={styles.swiperContainer} ref={c => {this.swiperDom = c;}}>
              <div className="swiper-wrapper">
                {
                  swiperData.map((item) => {
                    return (<div className="swiper-slide" style={styles.swiperSlide} key={item}>{item}</div>);
                  })
                }
              </div>
            </div>

          </div>
          <div style={styles.buttonBox}>
            <div onClick={this.onCloseHandle} style={Object.assign({}, styles.button, styles.borderRight)}>
              取消
            </div>
            <div onClick={this.onConfirmHandle} style={Object.assign({}, styles.button, styles.activeButton)}>
              确定
            </div>
          </div>
        </div>
        
      </div>
    );
  }

}

TimeSelect.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  initialSlide: PropTypes.number
};

export default TimeSelect;