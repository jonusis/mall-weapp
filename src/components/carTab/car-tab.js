import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './car-tab.less'
import '../../img/time.png'
import '../../img/end.png'
import '../../img/start.png'
import '../../img/full.png'
import Fetch from '../../common/request';

export default class CarTab extends Component {

  constructor(props){
    super(props)
    this.state = {
      full:false,

      }
    }
    config = {
      navigationBarTitleText: '首页'
    }

  toPostOrder(e){
    var id = this.props.orderList.id;
    Fetch(
      `order/car?ordercarID=${id}&userID=${Taro.getStorageSync('userInfo').uid}`,
      {},
      "POST"
    ).then(res =>{
      if(res.data.code === 200){
        var tel1 = res.data.tel;
        var qq1 = res.data.qq;
        var wechat1 = res.data.wecaht;
        Taro.showModal({
          title: "参与成功",
          content:`联系方式：\r\n
          qq：${qq1}\r\n
          电话：${tel1}\r\n
          微信：${wechat1}`
        })
      }else{
        Taro.showModal({
          title:res.data.msg,
          duration:2000
        })
      }
    })
  }
  componentWillMount () {
    const {orderList}=this.props
    if(orderList.numExist == orderList.numNeed){
      this.setState({
        full:true,
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
      <View scroll-y='true' className='box'>
      <View className='header'>
      {orderList.userPicture.map((value) => (
      <Image className='headSculpture'
        src={value} key='2'
      ></Image>
        ))}

      <View className='numberOfpinpin'>已拼{orderList.numExist}/{orderList.numNeed} </View>
      </View>
        <View className='description'>
        <Image className={orderList.full ?'pic':'none'} src='../../img/full.png'></Image>
        <View className='list'>
        <Image className='img' src='../../img/start.png'></Image>
        <View className='word'>{orderList.placeA}</View>
        </View>
        <View className='list'>
        <Image className='img' src='../../img/end.png'></Image>
        <View className='word'>{orderList.placeB}</View>
        </View>
        <View className='list'>
        <Image className='img' src='../../img/time.png'></Image>
        <View className='word'>{orderList.time}</View>
        </View>
        </View>
        <View className='bottom'>
        <View className='remark'>备注：{orderList.heading}</View>
        <View className='btn' data-id={orderList.ordercarID} onClick={this.toPostOrder.bind(this)}>
        <Text>确认拼车</Text>
        </View>
      </View>
    </View>
    )
  }
}
