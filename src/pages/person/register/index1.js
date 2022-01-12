import Taro, { Component } from '@tarojs/taro'
import { AtButton, AtForm, AtInput, AtList, AtListItem }  from 'taro-ui'
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/button.scss";
import { Picker, View } from '@tarojs/components';
import {set as setGlobalData, get as getGlobalData} from '../../../global_data';
import './index.less'

export default class Index extends Component {
  state ={
    name:'',
    account:'',
    password:'',
    age:'',
    sex:1,
    selector: ['男', '女'],
    selectorChecked: '男',
  }
  handleChange (value) {
    this.setState({
      name : value
    })
    return value
  }
  handleChange1 (value) {
    this.setState({
      account : value
    })
    return value
  }
  handleChange2 (value) {
    this.setState({
      password : value
    })
    return value
  }
  handleChange3 (value) {
    this.setState({
      age : value
    })
    return value
  }
  handleChange4 (e) {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
    if(this.state.selectorChecked == '男') {
      this.setState({
        sex: 1
      })
    }
    else 
    this.setState({
      sex: 0
    })
  }
  onChangeSelector(e){
    this.setState({
      selectorChecked :this.state.selector[e.detail.value]
    })
  }
  onSubmit(){
    const {name, account ,password , age, sex}= this.state
    Taro.request({
      url:'http://10.189.1.135:8080/v1/user/addUser',
      method:"POST",
      data:{
        name:name,
        account:account,
        password:password,
        age:age,
        sex:sex,
      },
      success:function(res){
        if(res.data.code == 200){
          Taro.showToast({
            title: "注册成功",
            icon: "success",
            duration: 1000
          });
          Taro.setStorageSync('userInfo',res.data);
          setGlobalData('hasLogin',true);
          Taro.navigateBack({url:"pages/person/person"})
        }else{
          Taro.showToast({
            title: "注册失败",
            icon: "none",
            duration: 1000
          });
        }
        return res;
      }
     })
  }

  render () {
    return (
      <View className='register'>
        <AtForm >
          <AtInput
            name='value1'
            title='姓名'
            type='text'
            placeholder='请输入姓名'
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value2'
            title='账户'
            type='number'
            placeholder='请输入账户'
            value={this.state.account}
            onChange={this.handleChange1.bind(this)}
          />
          <AtInput
            name='value3'
            title='密码'
            type='password'
            placeholder='密码不能少于10位数'
            value={this.state.password}
            onChange={this.handleChange2.bind(this)}
          />
          <View className='registerage'>
            <AtInput className='age'
              name='value4'
              title='年龄'
              type='number'
              placeholder='年龄'
              value={this.state.age}
              onChange={this.handleChange3.bind(this)}
            />
          </View>
          <View className='sexbox'>
            <Picker mode='selector' range={this.state.selector} onChange={this.onChangeSelector}>
              <AtList>
                <AtListItem
                  title='性别'
                  extraText={this.state.selectorChecked}
                />
              </AtList>
            </Picker>
          </View>
        </AtForm>
        <AtButton type='primary' onClick={this.onSubmit.bind(this)}>注册并自动登录</AtButton>
      </View>
    )
  }
}