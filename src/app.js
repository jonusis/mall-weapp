/* eslint-disable no-shadow */
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import  './img/uiindex.png'
import './app.less'
import {set as setGlobalData, get as getGlobalData} from './global_data';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/person/register/index1',
      'pages/person/person',
      'pages/choose-order/choose',
      'pages/publish/publish',
      'pages/mine/home',
      'pages/add/detail',
      'pages/jinconnect/jinconnect',
      'pages/advice/advice',
      'pages/person/login/login',
      'pages/addcar/addcar',
      'pages/connectiontwo/connectiontwo',
      'pages/publish_two/publish_two',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./img/uiindex.png",
        selectedIconPath: "./img/uiindex-red.png"
      }, {
        pagePath: "pages/choose-order/choose",
        text: "发起",
        iconPath: "./img/uiplus.png",
        selectedIconPath: "./img/uiplus-red.png"
      },{
        pagePath: "pages/person/person",
        text: "我的",
        iconPath: "./img/uimine.png",
        selectedIconPath: "./img/uimine-red.png"
      }],
      color: '#333',
      selectedColor: 'red',
      backgroundColor: '#fff',
      borderStyle: 'white'
    }
  }

  componentDidMount () {
    user.checkLogin().then(res => {
      setGlobalData('hasLogin', true);
    }).catch(() => {
      setGlobalData('hasLogin', false);
    });
  }
  checkLogin() {
    return new Promise(function(resolve, reject) {
      if (Taro.getStorageSync('userInfo')) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
