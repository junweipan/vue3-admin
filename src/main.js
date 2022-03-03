import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import store from './store'
import router from './router'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import SvgIcon from '@/components/SvgIcon'// svg component
import * as echarts from 'echarts'
import VueParticles from 'vue-particles'

const app = createApp(App)
//使用echarts 作图, 设置为全局
app.config.globalProperties.echarts = echarts;

app.config.productionTip = false

// register globally
app.component('SvgIcon', SvgIcon)

// 注册自定义指令
import * as Directives from '@/directive/permission/index'
Object.values(Directives).forEach(fn => fn(app))

app.use(ElementPlus, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})
app.use(store)
app.use(router)
//引入login页面粒子动态
app.use(VueParticles)
app.mount('#app')

export default app
