import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from "axios";
import editor from "mavon-editor";

import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式

import "./axios"
import './permission'



Vue.use(Element)
Vue.use(editor)
Vue.use(hljs)
Vue.config.productionTip = false
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('highlight',function(el){

  let blocks = el.querySelectorAll('pre code');

  blocks.forEach((block)=>{

    hljs.highlightBlock(block)

  })

})
