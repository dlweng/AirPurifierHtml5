import React, {PropTypes, Component} from 'react';

require('./Dashboard.less');
const rightIcon = require('../../images/right_icon.png');

const styles = {
  container: {
    textAlign: 'center',
    width: '240px',
    height: '240px',
    position: 'relative',
    margin: 'auto'
  },
  canvas: {
  },
  content: {
    position: 'absolute',
    left: '0px',
    top: '50%',
    marginTop: '-56px',
    width: '100%',
    height: '100%',
    color: '#fff'
  },
  title: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.9)',
  },
  value: {
    fontSize: '70px',
    lineHeight: '70px',
    margin: '10px 0px 8px 0px'
  },
  sub: {
    color: 'rgba(255,255,255,0.6)'
  },
  sup: {
    transform: 'scale(0.6,0.6)'
  },
  tips: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.9)'
  },
  pointBox: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%'
  },
  icon: {
    height: '12px',
    position: 'relative',
    top: '1px',
    left: '4px'
  }
};

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.radius = 120;
  }

  draw(value) {
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.3)'; //生成的颜色块赋值给样式
    this.ctx.arc(this.radius, this.radius, this.radius - 10, 0, 2 * Math.PI, false);
    this.ctx.stroke();

    //画渐变
    this.ctx.beginPath();
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = "#fff";
    let grd = this.ctx.createLinearGradient(0, this.radius, this.radius * 2, this.radius);
    grd.addColorStop(1, 'rgba(255,255,255,0.1)'); //0表示起点..0.1 0.2 ...1表示终点，配置颜色
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = grd; //生成的颜色块赋值给样式
    this.ctx.arc(this.radius, this.radius, this.radius - 10, 0, value, false);
    this.ctx.stroke();

  }

  componentDidMount() {
    this.ctx = this.canvasDom.getContext('2d');
    const radian = Math.PI / 180 * (100 / 200 * 360);
    this.draw(radian);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.pointBox}>
          <Point/><Point/><Point/><Point/><Point/><Point/><Point/><Point/><Point/>
          <Point/><Point/><Point/><Point/><Point/><Point/><Point/><Point/><Point/>
          <Point/><Point/><Point/><Point/><Point/><Point/><Point/><Point/><Point/>
        </div>
        <canvas
          className='rain-animation'
          style={styles.canvas}
          ref={c => {
          this.canvasDom = c;
        }}
          width={this.radius * 2}
          height={this.radius * 2}></canvas>
        <div style={styles.content}>
          <div style={styles.title}>
            室内PM2.5<sub style={styles.sub}>ug/m<sup style={styles.sup}>2</sup></sub>
          </div>
          <div style={styles.value}>
            {this.props.data}
          </div>
          {/* <div style={styles.tips} onClick={this.props.tipsClick}>
            PM2.5记录
            <img style={styles.icon} src={rightIcon}/>
          </div> */}
        </div>
      </div>
    );
  }
}

const pointStyles = {
  point: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    left: '0px',
    top: '0px',
    position: 'absolute'
  }
};
class Point extends Component {

  constructor(props) {
    super(props);

    this.createAnimate = this.createAnimate.bind(this);
    this.createAnimate();
    this.state = {
      css: {
        left: this.left,
        top: this.top,
        transform: 'scale(1)',
        width: '0px',
        height: '0px',
      },
      class: ''
    };

    this.transitionEnd = this.transitionEnd.bind(this);
    this.transitionEvent = this.whichTransitionEvent();
  }

  whichTransitionEvent() {
    let t,
      el = document.createElement('surface'),
      transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

  createAnimate() {
    this.animateClass = parseInt(Math.random() * 1000) % 2? 'point-animation-left': 'point-animation-right';
    this.left = 0;
    this.top = 0;

    if(parseInt(Math.random() * 1000) % 2){
      if(parseInt(Math.random() * 1000) % 2){
        this.left = Math.random() * 300;
        this.top = Math.random() * 300;
      }else{
        this.top = Math.random() * -30;
        this.left = Math.random() * -30;
      }
    }else{
      if(parseInt(Math.random() * 1000) % 2){
        this.left = Math.random() * -30;
        this.top = Math.random() * 300;
      }else{
        this.left = Math.random() * 300;
        this.top = Math.random() * -30;
      }
    }

    this.width = Math.random() * 8;
    this.timeOut = Math.random() * 10000;
  }

  transitionEnd() {
    this.dom.removeEventListener(this.transitionEvent, this.transitionEnd); //销毁事件
    //重置元素状态
    this.createAnimate();

    this.setState({
      class: ''
    });

    this.setState({
      css: {
        left: this.left,
        top: this.top,
        transform: 'scale(1)',
        width: '0px',
        height: '0px',
      },
      class: ''
    });

    this.transitionEvent && this.dom.addEventListener(this.transitionEvent, this.transitionEnd);

    setTimeout(() => {
      this.setState({
        class: this.animateClass,
        css: {
          left: '50%',
          width: this.width,
          height: this.width,
          top: '50%',
          transform: 'scale(0)'
        }
      });
    }, this.timeOut);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        class: this.animateClass
      });
      this.setState({
        css: {
          left: '50%',
          width: this.width,
          height: this.width,
          top: '50%',
          transform: 'scale(0)'
        }
      });
    }, this.timeOut);
    this.transitionEvent && this.dom.addEventListener(this.transitionEvent, this.transitionEnd);    
  }

  render() {
    return (
      <div
        ref={c => {
        this.dom = c;
      }}
        className={this.state.class}
        style={Object.assign({}, pointStyles.point, this.state.css)}></div>
    );
  }
}

export default Dashboard;
