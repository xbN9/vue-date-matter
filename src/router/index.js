import Vue from 'vue'
import VueRouter from "vue-router"

const Cate = () => import('../views/cate/Cate')


//1、安装插件
Vue.use(VueRouter)

//2、创建路由对象

const routes = [
  {
    path: '',
    name: '',
    redirect:'/cate'
  },{
    path: '/cate',
    component:Cate
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})
export default router
