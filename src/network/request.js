import axios from 'axios'

export function request(config) {
  //1、创建axios实例
  const instance = axios.create({
    timeout: 5000,
  })

  //2、axios的拦截器
  instance.interceptors.request.use(config => {
    config.headers = {Authorization:"13456261505","Access-Control-Allow-Origin":"*"}
    // console.log(config);
    return config

  }, err => {
    console.log(err);
  })

  //2.2、响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  //3、发送真正的网络请求
  return instance(config)
}
