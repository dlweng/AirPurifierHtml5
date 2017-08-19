import React, {PropTypes, Component} from 'react';

import Swiper from 'swiper';
require('swiper/dist/css/swiper.css');

const powerIcon = require('../images/home_btn_power_nor.png');
const powerIconActive = require('../images/home_btn_power_hig.png');
const autoIcon = require('../images/home_btn_auto_nor.png');
const autoIconActive = require('../images/home_btn_auto_hig.png');
const lowSpeedIcon = require('../images/home_btn_low_nor.png');
const lowSpeedIconActive = require('../images/home_btn_low_hig.png');
const midSpeedIcon = require('../images/home_btn_mid_nor.png');
const midSpeedIconActive = require('../images/home_btn_mid_hig.png');
const highSpeedIcon = require('../images/home_btn_high_nor.png');
const highSpeedIconActive = require('../images/home_btn_high_hig.png');

const humidityIcon = require('../images/home_btn_wet_nor.png');
const humidityIconActive = require('../images/home_btn_wet_hig.png');
const lockIcon = require('../images/home_btn_lock_nor.png');
const lockIconActive = require('../images/home_btn_lock_hig.png');
const delayIcon = require('../images/home_btn_time_nor.png');
const delayIconActive = require('../images/home_btn_time_hig.png');
const nightLedIcon = require('../images/home_btn_light_nor.png');
const nightLedIconActive = require('../images/home_btn_light_hig.png');
const sleepModeIcon = require('../images/home_btn_sleep_nor.png');
const sleepModeIconActive = require('../images/home_btn_sleep_hig.png');

const styles = {
  container: {
    position: 'relative'
  },
  mainContainer: {
    height: '100px',
    backgroundColor: '#fff',
    padding: '0px 8px',
    width: '100%',
    position: 'absolute',
    bottom: '0px'
  },
  subContainer: {
    height: '50px',
    backgroundColor: '#fff',
    lineHeight: '50px',
    width: '100%',
    position: 'absolute',
    bottom: '0px' 
  },
  item: {
    float: 'left',
    width: '20%',
    textAlign: 'center',
    padding: '12px 0px',
    overflow: 'hidden'
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '0px auto',
    display: 'block',
    marginBottom: '8px'
  },
  text: {
    fontSize: '12px'
  },
  activeText: {
    color: '#e59e1e'
  },
  hidden: {
    opacity: '0',
    pointerEvents: 'none'
  },
  subContainerRightIcon: {
    width: '20px',
    position: 'relative',
    top: '5px',
    left: '-2px',
    height: '20px',
    fontSize:'12px',
  },
  subContainerRight: {
    position: 'absolute',
    right: '0px',
    width: '100px',
    backgroundColor: '#fff',
    top: '0px',
    textAlign: 'center'
  },
  subContainerLeft: {
    width: '100%',
    padding: '0px 100px 0px 20px',
    backgroundColor: '#f6f6f6',
    fontSize: '12px',
  },
};

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.mySwiper = new Swiper(this.swiperDom, {
      resistanceRatio: 0,
      initialSlide: 0,
      pagination : '.swiper-pagination',
      onSlideChangeEnd: (swiper) => {
      }
    });
  }

  handleClick(key, value) {
    this.props.onChange({key, value});
  }

  render() {
    const {power, auto, lowSpeed, midSpeed, highSpeed, humidity, lock, delay, nightLed, sleepMode} = this.props.datas;
    const hideMainContainer = !power || lock;

    console.log("渲染延时delay = " + delay);
    //延时时间, 设置界面的延时显示
    let renderDelay = 0;
    if (delay <= 8) {
      renderDelay = delay;
    }
    else if(delay == 9){
      renderDelay = 12;
    }
    else if (delay == 10){
      renderDelay = 18;
    }
    else if(delay == 11){
      renderDelay = 24;
    }
    else if(delay == 12){
      renderDelay = 36;
    }
    else if(delay == 13){
      renderDelay = 72;
    }
    console.log("渲染延时renderDelay = " + renderDelay);

    let tipsText = '';
    tipsText = nightLed? '夜灯模式 ': '';
    tipsText += sleepMode? '睡眠模式 ': '';
    tipsText += auto? '自动模式': '';
    tipsText += lowSpeed? '低速模式': '';
    tipsText += midSpeed? '中速模式': '';
    tipsText += highSpeed? '高速模式': '';
    tipsText += humidity? '加湿中': '';

    return (
      <div style={styles.container}>
        <div style={Object.assign({}, styles.mainContainer, hideMainContainer? styles.hidden: {})} className="swiper-container" ref={c => {this.swiperDom = c;}}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div style={styles.item} onClick={this.handleClick.bind(this, 'power', power)}>
                <img style={styles.iconBox} src={power? powerIconActive: powerIcon}/>
                <span style={Object.assign({}, styles.text, power? styles.activeText: {})}>已开机</span>
              </div>
              <div style={styles.item} onClick={this.handleClick.bind(this, 'auto', auto)}>
                <img style={styles.iconBox} src={auto? autoIconActive: autoIcon}/>
                <span style={Object.assign({}, styles.text, auto? styles.activeText: {})}>自动</span>
              </div>
              <div style={styles.item} onClick={this.handleClick.bind(this, 'lowSpeed', lowSpeed)}>
                <img style={styles.iconBox} src={lowSpeed? lowSpeedIconActive: lowSpeedIcon}/>
                <span style={Object.assign({}, styles.text, lowSpeed? styles.activeText: {})}>低档</span>
              </div>
              <div style={styles.item} onClick={this.handleClick.bind(this, 'midSpeed', midSpeed)}>
                <img style={styles.iconBox} src={midSpeed? midSpeedIconActive: midSpeedIcon}/>
                <span style={Object.assign({}, styles.text, midSpeed? styles.activeText: {})}>中档</span>
              </div>
              <div style={styles.item} onClick={this.handleClick.bind(this, 'highSpeed', highSpeed)}>
                <img style={styles.iconBox} src={highSpeed? highSpeedIconActive: highSpeedIcon}/>
                <span style={Object.assign({}, styles.text, highSpeed? styles.activeText: {})}>高档</span>
              </div>
            </div>
            <div className="swiper-slide">
              <div style={styles.item} onClick={this.handleClick.bind(this, 'humidity', humidity)}>
                <img style={styles.iconBox} src={humidity? humidityIconActive: humidityIcon}/>
                <span style={Object.assign({}, styles.text, humidity? styles.activeText: {})}>加湿</span>
              </div>
              <div style={styles.item} onClick={this.handleClick.bind(this, 'lock', lock)}>
                <img style={styles.iconBox} src={lock? lockIconActive: lockIcon}/>
                <span style={Object.assign({}, styles.text, lock? styles.activeText: {})}>童锁</span>
              </div>
              <div style={styles.item} onClick={this.handleClick.bind(this, 'delay', delay)}>
                <img style={styles.iconBox} src={delay? delayIconActive: delayIcon}/>
                <span style={Object.assign({}, styles.text, delay? styles.activeText: {})}>
                  {delay? renderDelay+'H后关机': '延时'}
                </span>
              </div>
      
              <div style={styles.item} onClick={this.handleClick.bind(this, 'nightLed', nightLed)}>
                <img style={styles.iconBox} src={nightLed? nightLedIconActive: nightLedIcon}/>
                <span style={Object.assign({}, styles.text, nightLed? styles.activeText: {})}>夜灯</span>
              </div>
              <div style={styles.item} onClick={this.handleClick.bind(this, 'sleepMode', sleepMode)}>
                <img style={styles.iconBox} src={sleepMode? sleepModeIconActive: sleepModeIcon}/>
                <span style={Object.assign({}, styles.text, sleepMode? styles.activeText: {})}>睡眠</span>
              </div>
            </div>
          </div>
           <div className="swiper-pagination"></div>
        </div>
        <div style={Object.assign({}, styles.subContainer, power && lock?{}: styles.hidden)}>
          <div style={styles.subContainerLeft}>
            {tipsText}
          </div>
          <div style={styles.subContainerRight} onClick={this.handleClick.bind(this, 'lock', lock)}>
            <img style={styles.subContainerRightIcon} src={lockIconActive}/> 童锁开
          </div>
        </div>

        <div style={Object.assign({}, styles.subContainer, power?styles.hidden: {})}>
          <div style={styles.subContainerLeft}>
            点击右方按钮开机
          </div>
          <div style={styles.subContainerRight} onClick={this.handleClick.bind(this, 'power', power)}>
            <img style={styles.subContainerRightIcon} src={powerIconActive}/> 开机
          </div>
        </div>

      </div>
    );
  }
}

NavBar.propTypes = {
  datas: PropTypes.object,
  onChange: PropTypes.func,
};

export default NavBar;
