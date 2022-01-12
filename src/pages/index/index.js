import Taro, { Component } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import './index.less'
import Fetch from "../../common/request";
import HeaderTab from '../../components/headerTab/header-tab';
import SmallTab  from '../../components/smallTab-index/small-tab'
import NopicTab from '../../components/noPicTab-index/nopic-tab'
import CarTab from '../../components/carTab/car-tab'


export default class mypage extends Component{
    constructor(props){
    super(props)
    this.state = {
      orderList: [ ],
      pageNum: 1,
      hasNext:true,
      index: 1
      }
    }
  config = {
    navigationBarTitleText: '华师拼单',
    "enablePullDownRefresh": true, 
    onReachBottomDistance:50
  }


  getOrderCarList(page){
    Fetch(`order/car/list/?page=${page}`).then(res => {
      console.log(res);
      this.setState({
        orderList:res.data.data,
        hasNext:res.data.pageNum !== res.data.pageMaxSize,
        pageNum:res.data.data.pageNum
      })
    })
  }
  getOrderBuyList(index,page){
    Fetch(`order/buy/list/?kind=${index}&page=${page}`).then(res => {
      this.setState({
        orderList:res.data.data,
        hasNext:res.data.pageNum !== res.data.pageMaxSize,
        pageNum:res.data.data.pageNum
      })
    })
  }

  getIndex(index){
    this.setState({
      index:index
    })
    if(index===2){
      this.getOrderCarList(1);
    }else if(index !== 1){
      index = index - 1;
      this.getOrderBuyList(index,1);
  }else{
    this.getOrderBuyList(1,1);
  }
  }
  //刷新
  onPullDownRefresh(){
    Taro.showNavigationBarLoading();
    this.getIndex(this.state.index);
    Taro.hideNavigationBarLoading();
    Taro.stopPullDownRefresh();
}
  //下拉加载更多
  onReachBottom(){
    var hasNext=this.state.hasNext;
    if(hasNext){
      var list = this.state.orderList;
      var num = this.state.pageNum;
      num = num + 1;
      if(this.state.index !== 2){
      Fetch(`order/buy/list/?kind=${this.state.index}&page=${num}`).then(res => {
        var datalist = res.data.data;
        this.setState({
          hasNext:res.data.pageNum !== res.data.pageMaxSize,
          pageNum:res.data.data.pageNum
        })
        return datalist;
      }).then(datalist =>{
        list = list.concat(datalist);
        this.setState({
          orderList:list
        })
      })
    }else{
      Fetch(`order/car/list/?page=${num}`).then(data => {
        var datalist = res.data.data;
        this.setState({
          hasNext:res.data.pageNum !== res.data.pageMaxSize,
          pageNum:data.data.pageNum
        })
        return datalist;
      }).then(datalist =>{
        list = list.concat(datalist);
        this.setState({
          orderList:list
        })
      })
    }
    }
  }

  componentWillMount() {
    Fetch(`order/buy/list/?kind=1&page=1`).then(res => {
      this.setState({
        orderList: res.data.data
      })
    })
  }
  render () {
    const {index,orderList} = this.state;
    return (
      <View>
        <HeaderTab navList={[{key:1,content:'网购'},{key:2,content:'拼车'},{key:3,content:'外卖'},{key:4,content:'会员账号'},{key:5,content:'其他'}]} onGetIndex={this.getIndex.bind(this)} />  
        <View className='height'>
        <View className='tab-content'>
        {index === 2?
          orderList.map((obj) => (
            <CarTab orderList={obj}/>
        ))
        :
        orderList.map((obj,index) => (
          obj.picture?
            <SmallTab orderList={obj} />
            :
            <NopicTab orderList={obj} />
        ))
        }
        </View>
      </View>
    </View>
    )
  }
}

