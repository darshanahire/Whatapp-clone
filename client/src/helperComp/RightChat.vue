<template>
  <div class="rightChatParent px-3">
    <div v-if="prevSender!=currSender" class="tailOutIcon"></div>
    <div class="rightChat">
      <p class="msg">{{ decryptedText }}</p>
      <div class="chatTime">
        <p>
          <span v-if="time">{{ time | moment("h:mm a") }} <img class="tick" src="@/assets/seentick.png" alt="" height="10" /></span>
          <span v-else>{{ new Date() | moment("h:mm a") }} <img class="tick" src="@/assets/unseentick.png" alt="" height="10" /></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.use(require('vue-moment'));

export default {
name:"RightChat",
props:{
    msg:String,
    time:String,
    prevSender:String,
    currSender:String

},
data(){
  return{
    decryptedText:""
    }
},
created(){
  this.decryptedText = this.$CryptoJS.AES.decrypt(this.msg, process.env.VUE_APP_SECRETE_KEY).toString(this.$CryptoJS.enc.Utf8)
}
}
</script>

<style>
.tick{
  margin-left:3px;
}
.msg{
  word-wrap: break-word;
  overflow: hidden;
}
.rightChat {
  height: auto;
  width: auto;
  max-width: 50%;
  padding: 8px 8px 3px;
  border-radius: 8px;
  background: #d9fdd3;
  text-align: start;
  margin: 6px 0;
  font-size: 14px;
  z-index: 5;
}

.rightChatParent {
  display: flex;
  justify-content: end;
  position: relative;
}
.tailOutIcon {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  position: absolute;
  border-top: 16px solid #dcf8c6;
  z-index: 3;
  right: 4px;
  top: 6px;
  border-radius: 5px;
}
.chatTime {
  font-size: 10px;
  color: rgb(101 101 101);
  text-align: end;
  margin: 0 2px;
}
</style>