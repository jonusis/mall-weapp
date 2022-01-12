import Taro, { Component} from '@tarojs/taro'
import { View, Button ,Input ,Image} from '@tarojs/components'
// import {isNull} from 'util'
import pho from '../../img/qq.png'
import phoone from '../../img/wechat.png'
import photwo from '../../img/c-phone.png'

import './jinconnect.less'
import Fetch from '../../common/request';

export default class  Jconnection extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  componentWillMount(){
      // Fetch(`user/info/`).then(data =>{
      //   console.log(data.info)
      //   this.setState({
      //     tel: data.info.tel,
      //     qq: data.info.qq,
      //     wechat:data.info.wechat
      //   })
      // })
      
          // this.setState({
          //     tel:data.tel,
          //     qq:data.qq,
          //     wechat:data.wechat,
          // })
      
      // var that=this;
      // Taro.request({
      //       url:'https://pinpin.muxixyz.com/api/v1/user/info/',
      //       method:'GET',
      //       header:{
      //         token:Taro.getStorageSync('token')
      //       },
      //       success:function(res){
      //         var obj = {};
      //         obj.tel = res.data.tel;
      //         obj.qq = res.data.qq;
      //         obj.wechat = res.data.wechat;
      //         obj.expires_in = Date.now() + res.data.expires_in;
      //         Taro.setStorageSync('tel', obj.tel);
      //         Taro.setStorageSync('qq', obj.qq);
      //         Taro.setStorageSync('wechat', obj.wechat);
      //     }
      // })
  }
  componentDidMount(){
      Fetch(`user/info?uid=${Taro.getStorageSync('userInfo').uid}`).then(data =>{
        console.log(data.data)
        this.setState({
          tel: data.data.data.tel,
          qq: data.data.data.qq,
          wechat:data.data.data.wechat
        })    
      })
  }
  Config = {
    navigationBarTitleText: "联系方式"
  }
  constructor(props){
    super(props)
    this.state = {
      tel: '',
      qq: '',
      wechat:'',
      isEditAll:false,
  }
}
  changedisplay(){
      this.setState({
        isEditAll: true,
      })
  }
  
setconnection1(){
    if(this.state.tel &&(this.state.tel!='')){
    Taro.setStorageSync('tel',this.state.tel)
    Taro.setStorageSync('con','已选电话')
    Taro.navigateBack({
      delta: 1
    })
   }
   else{
    Taro.showToast({
      title: "请编辑您的联系方式",
      icon: "none",
      duration: 1000
    })
   }
  }
  setconnection2(){
    if(this.state.wechat &&(this.state.wechat!='')){
    Taro.setStorageSync('wechat',this.state.wechat)
    Taro.setStorageSync('con','已选微信')
    Taro.navigateBack({
      delta: 1
    })
  }
  else{
    Taro.showToast({
      title: "请编辑您的联系方式",
      icon: "none",
      duration: 1000
    })
  }
  }
  setconnection3(){
    if(this.state.qq &&(this.state.qq!='')){
    Taro.setStorageSync('qq',this.state.qq)
    Taro.setStorageSync('con','已选qq')
    Taro.navigateBack({
      delta: 1
    })
  }
  else{
    Taro.showToast({
      title: "请编辑您的联系方式",
      icon: "none",
      duration: 1000
    })
  }
  }
  changetel(e) {
    this.setState({
      tel: e.detail.value
    });
  }
  changeqq(e) {
    this.setState({
      qq: e.detail.value
    });
  }
  changewechat(e) {
    this.setState({
      wechat: e.detail.value
    });
  }
  torefInfo(){
    Fetch(
      'user/info/',
      {
        tel:this.state.tel,
        qq:this.state.qq,
        wechat:this.state.wechat,
        uid:Taro.getStorageSync('userInfo').uid,
        account:Taro.getStorageSync('userInfo').account,
        headPicture:Taro.getStorageSync('userInfo').headPicture,
      },
      "PUT"
    ).then((res) => {
      this.setState({
        tel:res.data.data.tel,
        qq:res.data.data.qq,
        wechat:res.data.data.wechat,
      })
    })
    this.setState({
      isEditAll: false,
    })
  }

  render () {
    const{ tel , qq , wechat, isEditAll }=this.state;
    return (
      <View>
        <View className='btn'>
        <View className='box'></View>
        {isEditAll ?  <Button onClick={this.torefInfo}>保存</Button> : <Button onClick={this.changedisplay}>编辑</Button> }
        </View>
        <View className='bigbox'>
          <View className='qqinput'>
          <Image className='photwo' src={photwo}></Image>
          <Input
            disabled={!isEditAll}
            type='text'
            placeholder='请输入手机号'
            value={tel}
            onInput={this.changetel}
            onClick={()=>!isEditAll && this.setconnection1()}
          >{this.state.tel}</Input>
          </View>
          <View className='qqinput'>
          <Image className='pho' src={phoone}></Image>
          
          <Input
            disabled={!isEditAll}
            type='text'
            placeholder='快来完善微信号'
            value={wechat}
            onChange={this.changewechat}
            onClick={()=>!isEditAll && this.setconnection2()}
          />
          </View>
          <View className='qqinput'>
          <Image className='pho' src={pho}></Image>
          <Input
            disabled={!isEditAll}
            type='text'
            placeholder='请输入qq号'
            value={qq}
            onChange={this.changeqq}
            onClick={()=>!isEditAll && this.setconnection3()}
          />
          </View>
        </View>
      </View>
    )
  }
}