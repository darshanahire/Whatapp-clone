<template>
  <div class="leftChatParent px-3">
    <div v-if="prevSender != currSender" class="tailInIcon"></div>
    <div class="leftChat">
      <p class="msg">
        {{ decryptedText }}
      </p>
      <div class="chatTime">
        <span v-if="time">{{ time | moment("h:mm a") }}</span>
        <span v-else>{{ new Date() | moment("h:mm a") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(require("vue-moment"));
export default {
  name: "LeftChat",
  props: {
    msg: String,
    time: String,
    prevSender: String,
    currSender: String,
  },
  data(){
  return{
    decryptedText:""
    }
},
  created(){    
    
    this.decryptedText = this.$CryptoJS.AES.decrypt(this.msg, process.env.VUE_APP_SECRETE_KEY).toString(this.$CryptoJS.enc.Utf8)
  }
};
</script>

<style>
.leftChat {
  height: auto;
  width: auto;
  max-width: 50%;
  padding: 8px 10px 3px;
  border-radius: 8px;
  background: white;
  text-align: start;
  margin: 6px 0;
  font-size: 14px;
  z-index: 5;
}
.leftChatParent {
  display: flex;
  justify-content: start;
  position: relative;
}
.tailInIcon {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  position: absolute;
  border-top: 16px solid #ffff;
  z-index: 3;
  left: 4px;
  top: 6px;
  border-radius: 5px;
}
.chatTime span {
  font-size: 10px;
  color: rgb(101 101 101);
  text-align: end;
  margin: 0 2px;
}
</style>
