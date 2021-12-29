/* eslint-disable react/no-unescaped-entities */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker ,Image} from '@tarojs/components'
import pho from '../../img/watch.png'
import './time.less'

export default class Time extends Component {
  componentWillMount(){
    this.props.onTime(this.state.timeSel)
  }
  state = {
    timeSel: '2018-05-05',
  }

  onTimeChange = e => {
    this.props.onTime(e.detail.value)
    this.setState({
      timeSel: e.detail.value
    })
  }

  render () {
    return (
    <View className='page-section'>
       <Image className='pho' src={pho} />
            <View>
              <Picker className='pck' mode='date' onChange={this.onTimeChange}>
              <Text className='address'>截止时间</Text>
                <Text className='arry'>{this.state.timeSel} ></Text>
              </Picker> 
        </View>
      </View>
    )
  }
}