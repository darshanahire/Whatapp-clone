import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueCryptojs from 'vue-cryptojs'

Vue.use(VueCryptojs)
Vue.config.productionTip = false
// import dotenv from 'dotenv'
Vue.use(EmojiPicker)
// dotenv.config()

import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
const socket = io('/');
// const socket = io('ws://192.168.0.112:5000');
// const socket = io('ws://localhost:5000');

socket.emit("adduser", localStorage.getItem("Wuser"));
Vue.use(VueSocketIOExt, socket);




// import VueSocketIO from 'vue-socket.io'
// import {io} from 'socket.io-client'

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: io('ws://localhost:8900')
// })
// )

import MediaQueryPlugin from 'vue-media-query-plugin';
Vue.use(MediaQueryPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

