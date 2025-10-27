import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/style.less'
import 'simple-mind-map/dist/simpleMindMap.esm.css'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(JsonViewer)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
