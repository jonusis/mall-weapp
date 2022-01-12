import Taro, { Component } from "@tarojs/taro";
import { View,  Input, Button ,Image,Text} from "@tarojs/components";
import logo from "../../../img/logo.png";
import "./login.less";
import {set as setGlobalData, get as getGlobalData} from '../../../global_data';

export default class Index extends Component {
    state = {
      username: '',
      password: '',
      mask_name: 'unmask',
      // content_name: 'cover',
      mask_bg: 'mask_bg_show',
    };

    config = {
      navigationBarTitleText: "登录"
    };
    toLogin() {
      const {username,password} = this.state;
        if (!this.state.username) {
          Taro.showToast({
            title: "请输入学号",
            icon: "none"
          });
          return;
        }
        if (!this.state.password) {
          Taro.showToast({
            title: "请输入密码",
            icon: "none"
          });
          return;
        }
        Taro.request({
          url:`http://10.189.1.135:8080/v1/user/login?account=${username}&password=${password}`,
          method:"POST",
          success:function(res){
            console.log(res);
            if(res.data.code == 200){
              Taro.showToast({
                title: "登录成功",
                icon: "success",
                duration: 1000
              });
              Taro.setStorageSync('userInfo',res.data.data);
              setGlobalData('hasLogin',true);
              Taro.navigateBack({url:"pages/person/person"})
            }
            else{
              Taro.showToast({
                title: "账号或密码错误",
                icon: "none",
                duration: 1000
              });
            }
          }
         })
      }
        handleSave(){
          this.setState({
            mask_name: 'mask',
            // content_name: 'uncover',
            mask_bg: 'mask_bg_none',
          })
      }
      changeusername(e) {
        this.setState({
          username: e.detail.value
        });
      }
    
      changepassword(e) {
        this.setState({
          password: e.detail.value
        });
      }
      register(){
        Taro.navigateTo({
            url:'/pages/person/register/index1'
        })
    }
      render() {
        const {  username, password } = this.state;
        return(
            <View className='login'>
            <View className='logo_container'>
              <Image className='logo' src={logo} />
            </View>
            <View className='form_container'>
              <View className='login_item login_name'>
              <Text>账号</Text>
                <Input
                  placeholderClass='placeholder'
                  type='number'
                  placeholder='请输入账号'
                  value={username}
                  onInput={this.changeusername}
                  onChange={this.changeusername}
                />
              </View>
              <View className='login_item login_code'>
              <Text>密码</Text>
                <Input
                  placeholderClass='placeholder'
                  type='text'
                  password
                  placeholder='请输入密码'
                  value={password}
                  onInput={this.changepassword}
                  onChange={this.changepassword}
                />
              </View>
            </View>
            <View className='btn_container'>
              <Button className='login_btn' onClick={this.toLogin.bind(this)} >
                登录
              </Button>
            </View>
            <View className='register-box'>
                <Text className='register' onClick={this.register.bind(this)}>没有账户？点击注册</Text>
            </View>
          </View>
        )
    }
}