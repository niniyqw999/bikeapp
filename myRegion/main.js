import App from './App'
import { createSSRApp } from 'vue'
import store from '@/store/index.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
//添加基础接口地址
Vue.config.productionTip = false;
// Vue.prototype.$baseUrl = 'http://localhost:3000/api';
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()

// #endif

// #ifdef VUE3
export function createApp() {
  const app = createSSRApp(App)
  //注册pinia
      app.use(store)
  return {
    app
  }
}
// #endif