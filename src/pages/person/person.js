import Taro, { Component} from '@tarojs/taro'
import { View,  OpenData} from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
// import { AtButton ,Open-data} from 'taro-ui'
import './person.less'
import Fetch from "../../common/request";
import Connection from '../../components/connection/connection';
import Myrecord from '../../components/myrecord/myrecord';
import Toadvice from '../../components/toadvice/toadvice';
import Share from '../../components/share/share';
import {set as setGlobalData, get as getGlobalData} from '../../global_data';

export default class Person extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  constructor(){
    this.state={
      userInfo:{},
      isLogin:false
    }
  }
  Config = {
    navigationBarTitleText: '我的'
  }
  
  onShareAppMessage(){
    return{
      title:'校园拼拼',
      imageUrl:'../../img/sharepp.png',
    }
  }
  componentWillMount () {

   }

  componentDidMount () {
    const hasLogin = getGlobalData('hasLogin');
    if(hasLogin){
      const data = Taro.getStorageSync('userInfo');
      this.setState({userInfo:data,isLogin:true});
    }else{
      Taro.navigateTo({url: "/pages/person/login/login"});
    }

  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  onLogin(){
    Taro.navigateTo({url: "/pages/person/login/login"});
  }
  
  render () {
    const {userInfo,isLogin} = this.state;
    return (
      <View>
        <View className='user'>
          {isLogin === false ? <View className="avatar" onClick={this.onLogin.bind(this)}></View> : <AtAvatar className="avatar" image={userInfo.headpicture}></AtAvatar>}
          {isLogin  === false ? <View className="name" >请登录</View> : <View className="name">{userInfo.name}</View>}
        </View>
        <View className='choose-box'>
        <Connection />
        <Myrecord />
        <Toadvice />
        <Share />
        </View>
      </View>
    )
  }
}
