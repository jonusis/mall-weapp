/* eslint-disable react/no-unescaped-entities */
import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './nopic-tab.less'
import '../../img/full.png'

export default class NopicTab extends Component {

  constructor(props){
    super(props)
    this.state = {
      full:false
      }
    }
    config = {
      navigationBarTitleText: '首页'
    }

  changPage(e){
    var id = e.currentTarget.dataset.id
    Taro.navigateTo({
      url: '../add/detail?id=' + `${id}`
  })
}
toPage(e){
  var id = e.currentTarget.dataset.id
  Taro.navigateTo({
    url: '../publish_two/publish_two?id=' + `${id}`
})
}

componentWillMount () {
  const {orderList}=this.props
  if(orderList.numExist == orderList.numNeed){
    this.setState({
      full:true
    })
  }
 }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {orderList}=this.props
    const {full} = this.state
    return (
      <View scroll-y='true' className='box' onClick={this.changPage.bind(this)} data-id={orderList.orderbuyID}>
      <View className='header'>
      {orderList.userPicture.map((value) => (
      <Image className='headSculpture'
        src={value} key='2'
      ></Image>
        ))}

<View className='numberOfpinpin' >已拼{orderList.numExist}/{orderList.numNeed} 
      </View>
      </View>
        <View className='description'>
        <Image className={full?'pic':'none'} src='../../img/full.png'></Image>
        <View className='title'>{orderList.heading}</View>
        <View className='cont'>{orderList.content}</View>
        <View className='time'>下单时间：{orderList.timeBuy}</View>
        <View className='place'>地点：{orderList.location}</View>
        </View>
        <View className='button-box'>
        <View className='btn black' onClick={this.toPage.bind(this)} data-id={orderList.orderbuyID}>
        <Text>再拼一单</Text>
        </View>
        </View>
      </View>
    )
  }
}
