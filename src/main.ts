import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 样式
import '@/styles/index.less'
import 'virtual:windi.css'

import { registerGlobComp } from '@/components/registerGlobComp'

const app = createApp(App)
registerGlobComp(app)
app.use(createPinia())
  .use(router)
  .use(Antd)
  .mount('#app')
