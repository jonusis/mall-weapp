import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import './home.less'
import Fetch from "../../common/request";
import SmallTab  from '../../components/smallTab/small-tab'
import { AtTabs, AtTabsPane } from 'taro-ui'
import NopicTab from '../../components/noPicTab/nopic-tab'
import CarTab from '../../components/carTab/car-tab'
import 'taro-ui/dist/style/components/tabs.scss';


export default class mypage extends Component{
    constructor(props){
    super(props)
    this.state = {
      orderCarList: [],
      orderBuyList: [],
      hasNext:false,
      pageNum:0,
      current: 0
      }
    }
    handleClick (value) {
      this.setState({
        current: value
      })
    }
  config = {
    navigationBarTitleText: '我的拼单',
    "enablePullDownRefresh": true, 
    onReachBottomDistance:50
  }

  // getpindanList (ordercarID, page) {
  //   Fetch(`/order/car/`+ `${ordercarID}/`+`${page}`).then(data => {
  //     this.setState({
  //       orderList:data.orderList,
  //       pageMax:data.pageMax,
  //       hasNext:data.hasNext,
  //       ordersnum:data.ordersnum,
  //       pageNum:data.pageNum
  //     })
  //   });
  // }
  getOrderBuyList(page){
    Fetch(`order/buy/list/queryOrderBuyListById?userID=${Taro.getStorageSync('userInfo').uid}&page=${page}`).then(res => {
      this.setState({
        orderBuyList:res.data.data,
        hasNext:res.data.pageNum !== res.data.pageMaxSize,
        pageNum:res.data.pageNum
        
      })
    })
  }
  getOrderCarList(page){
    Fetch(`order/car/list/queryOrderCarListById?userID=${Taro.getStorageSync('userInfo').uid}&page=${page}`).then(res => {
      this.setState({
        orderCarList:res.data.data,
        hasNext:res.data.pageNum !== res.data.pageMaxSize,
        pageNum:res.data.pageNum
      })
    })
  }

    //刷新
  //   onPullDownRefresh(){
  //     const{index} = this.state;
  //     Taro.showNavigationBarLoading();    
  //     if(index == 1){
  //     Fetch(`order/post/list/?userID=${this.state.userID}&page=1`).then(data => {
  //       console.log(data);
  //       this.setState({
  //         orderList: data.data.orderList
  //       })
  //     })
  //   }else if(index == 2){
  //     Fetch(`order/pick/list/?userID=${this.state.userID}&page=1`).then(data => {
  //       this.setState({
  //         orderList: data.data.orderList
  //       })
  //     })
  //   }else{
  //     Fetch(`order/comment/list/?userID=${this.state.userID}&page=1`).then(data => {
  //       this.setState({
  //         orderList: data.data.orderList
  //       })
  //     })
  //   };
  //     Taro.hideNavigationBarLoading();
  //     Taro.stopPullDownRefresh();
  // }
    //上拉加载更多
  onReachBottom() {
    const {hasNext,orderBuyList,orderCarList} = this.state;
    if(hasNext && current === 0){
      var num = this.state.pageNum;
      num = num + 1;
      Fetch(`order/buy/list/queryOrderBuyListById?userID=${Taro.getStorageSync('userInfo').uid}&page=${num}`).then((res)=> {
        this.setState({
          orderBuyList: orderBuyList.concat(res.data.data),
          hasNext:res.data.pageNum !== res.data.pageMaxSize,
          pageNum:res.data.pageNum
        })
      })
    }else if(hasNext && current === 1){
      var num = this.state.pageNum;
      num = num + 1;
      Fetch(`order/car/list/queryOrderCarListById?userID=${Taro.getStorageSync('userInfo').uid}&page=${num}`).then((res) => {
        this.setState({
          orderBuyList: orderCarList.concat(res.data.data),
          hasNext:res.data.pageNum !== res.data.pageMaxSize,
          pageNum:res.data.pageNum
        })
      })
    }
  }

  componentWillMount() {
    this.getOrderBuyList(1);
    this.getOrderCarList(1);
  }


  componentDidMount () { }
  
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {orderBuyList,orderCarList} = this.state
    const tabList = [{ title: '拼购' }, { title: '拼车' }]
    return (
      <View>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} customStyle={{background: '#EDEDED'}} >
        {
        orderBuyList.map((obj) => (
          !obj.kind?
          <CarTab key='2' orderList={obj} />
          :
          obj.picture?
            <SmallTab key='2' orderList={obj} />
            :
            <NopicTab key='2' orderList={obj} />
        ))
        }
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} customStyle={{background: '#EDEDED'}}>
        {
        orderCarList.map((obj) => (
          !obj.kind?
          <CarTab key='2' orderList={obj} />
          :
          obj.picture?
            <SmallTab key='2' orderList={obj} />
            :
            <NopicTab key='2' orderList={obj} />
        ))
        }
        </AtTabsPane>
      </AtTabs>

      </View>
    )
  }
}



