import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
// import VueSocketIOExt from 'vue-socket.io-extended';
// import { io } from 'socket.io-client';

Vue.config.productionTip = false


// const socket = io.connect('/');
// const socket = io('ws://localhost:8900');
// socket.emit("adduser", localStorage.getItem("Wuser"));

// Vue.use(VueSocketIOExt, socket);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

