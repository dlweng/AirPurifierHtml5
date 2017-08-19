class Native {
  constructor() {
    //判断平台
    const u = navigator.userAgent, app = navigator.appVersion;
    this.ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  }

  //发送指令
  sendCommand(key, ...rest) {
    console.log(...rest);
    if(this.ios) {
      window.webkit.messageHandlers[key].postMessage(...rest);
    }
    if(this.android) {
      window.jsObj[key](...rest);
    }
  }

}

export default new Native();