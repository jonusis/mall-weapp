import Taro from "@tarojs/taro";
// 包裹一层，并且返回供外部调用
// amd cmd;模块发展的演变的过程；
// promise就是一个表示未来的事情；

const preHttp = "http://10.147.57.131:8080/";
const Fetch = (url, data = {}, method = "GET") => {
  const header = { "content-type": "application/json"};
  return Taro.request({
    url: preHttp + url,
    data,
    method,
    header
  }).then(res => {
    if (res.statusCode === 200) {
      return res;
    } else {
      // 异常
      Taro.showToast({
        title: ` ${res.data.message}`,
        icon: "none",
        duration: 1000
      });
      throw new Error(`服务端错误: ${res.statusCode}`);
    }
  });
};

export default Fetch;