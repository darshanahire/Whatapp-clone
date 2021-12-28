<template >
  <div class="chatwindowparent chatWindowWidth">
    <div class="userTopData">
      <div class="row w-100 align-items-center">
        <div class="col-3 col-md-1 d-flex  align-items-center px-0 px-md-2">
          <i class="fas fa-arrow-left fa-lg mx-2 mobile" @click="goback"></i>
          <ProfileImg />
        </div>
        <div class="col-6 col-md-8 text-start">
          <h6 class="m-0">{{ user.name }}</h6>
          <!-- <p class="m-0 font-14">Click here to group info</p> -->
          <!-- found!=undefined?found:{istyping:false,unseenCount:0} -->
          <p class="m-0 font-14" v-if="IsOnlineNow == undefined">
            last seen today at 11:14 am
          </p>
          <p class="m-0 font-14" v-else-if="myfriends != undefined">
            {{ myfriends.istyping ? "typing..." : "online" }}
          </p>
        </div>
        <div class="col-3 col-md-3 text-end">
          <i class="fas fa-search mx-3"></i>
          <i class="fas fa-ellipsis-v mx-3 iconcolor"></i>
        </div>
      </div>
    </div>
    <div class="mainchatWindow scroll-y">
      <!-- <img class="" src="@/assets/chatbg.jpg" alt=""> -->
      <div class="dayDiv mt-2">TODAY</div>
      <div class="topEncrpMsg ">
        <i class="fas fa-lock fa-xs mx-2"></i>
        Messages are end-to-end encrypted. No one outside of this chat, not even
        WhatsApp, can read or listen to them. Click to learn more.
      </div>
      <div class="container h-80 w-80 py-3">
        <span v-for="(msg, id) in Messages" :key="id">
          <span v-if="conversationId === msg.conversationId">
            <div v-if="msg.sender === you">
              <LeftChat
                :msg="msg.text"
                :time="msg.createdAt"
                :prevSender="returnPrev(id)"
                :currSender="you"
              />
            </div>
            <div v-else-if="msg.sender === me">
              <RightChat
                :msg="msg.text"
                :time="msg.createdAt"
                :prevSender="returnPrev(id)"
                :currSender="me"
              />
            </div>
            <div v-else></div>
            <!-- <div v-else-if="msg !== undefined ? addUnSeenMsg(msg) : ''"> -->
            <!-- </div> -->
          </span>
        </span>
        <div id="bottomDiv" class="mt-auto" ref="Ref"></div>
      </div>
    </div>
    <div class="chatingdatadiv">
      <div class="w-100 d-flex align-items-center justify-content-center">
        <div class="text-start d-flex">
          <i class="far fa-grin fa-lg text-dark mx-2"></i>
          <i class="fas fa-paperclip fa-lg text-dark mx-3"></i>
        </div>
        <div class="text-start w-85">
          <input
            type="text"
            class="InputBar px-3"
            placeholder="Type a message"
            v-model="msgInput"
            @input="setTyping"
          />
        </div>
        <div class="text-end">
          <button class="sendMsgBtn" v-on:click="sendMsg">
            <i  v-if="Selftypingd" class="fas fa-paper-plane fa-lg text-dark mx-2 d-flex"></i>
          <i v-else class="fas fa-microphone fa-lg text-dark mx-3"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const { io } = require("socket.io-client");
import ProfileImg from "./Profileimg";
import http from "../services/https.vue";
import LeftChat from "../helperComp/LeftChat.vue";
import RightChat from "../helperComp/RightChat.vue";
export default {
  name: "ChatWindow",
  components: {
    ProfileImg,
    LeftChat,
    RightChat,
  },
  mounted: function () {    
    this.$store.dispatch("ResetSeenMsgs", this.you);
    this.$store.dispatch("GetFriends");
    const payload = { senderId: this.me, receiverId: this.you };
    http
      .newConversation(payload)
      .then(async (data) => {
        this.conversationId = data.data._id;
        http.getMessages(this.conversationId).then(async (data) => {
          this.Messages = data.data;
          // this.$store.dispatch("SetMessagesToStore",this.Messages);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.$socket.client.on("getMessage", (data) => {      
      this.socketMsg = data.text; 
      if(this.$route.path!=`/user/${this.you}`){
        // this.$store.dispatch("upadateSeenMsgs", {id:data.senderId,text:data.text});
      }
      else{
      const payload = {
        conversationId: this.conversationId,
        sender: data.senderId,
        text: this.socketMsg,
      };
      this.Messages = [...this.Messages, payload];}
    });
    this.$socket.client.on("sendertyping", (payload) => {
      this.$store.dispatch("setfriendTyping", payload.senderId);
    });
    this.$socket.client.on("getusers", (users) => {
      // console.log(users);

      this.$store.dispatch("SetonlineUsers", users);
    });
  },
  updated() {
    
    // console.log(this.$store.state.friendsAllData);
    this.$refs.Ref.scrollIntoView({ behavior: "smooth" });
  },
  created() {
    // this.$socket.client = io("ws://localhost:8900");    
    this.you = this.$route.params.id;
    this.changeUser(this.you);
    this.me = localStorage.getItem("Wuser");

    // this.$socket.client.emit("adduser", this.me);
    
    // console.log(this.$socket.client);
    // this.$socket.client.on("getusers", (users) => {
    //   console.log("users", users);
    // });
  },
  data() {
    return {
      msgInput: null,
      user: {},
      payload: "",
      Messages: [],
      me: "",
      you: "",
      conversationId: "",
      socket: "",
      socketMsg: "",
      prevSender: "",
      currSender: "",
      tempFriends: [],
    };
  },
  watch: {
    $route() {
      this.$store.dispatch("GetFriends");
      this.you = this.$route.params.id;
      this.$store.dispatch("ResetSeenMsgs", this.you);
      this.changeUser(this.you);
    },
  },
  methods: {
    goback(){
      this.$router.push('/')
    },
    setTyping() {    
      if(this.msgInput!=''){
        this.$store.dispatch("setSelfTyping",true);  
      }  
      else{
        this.$store.dispatch("setSelfTyping",false); 
      }
      this.$socket.client.emit("typing", { senderId: this.me, receiverId: this.you });
    },
    sendMsg() {
      // console.log(this.msgInput);
      if (this.msgInput !== "" && this.msgInput !== null) {
        this.$socket.client.emit("sendMessage", {
          conversationId: this.conversationId,
          senderId: this.me,
          receiverId: this.you,
          text: this.msgInput,
        });
        const payload = {
          conversationId: this.conversationId,
          sender: this.me,
          text: this.msgInput,
        };
        http
          .sendMsg(payload)
          .then(async () => {
            this.Messages = [...this.Messages, payload];
            // this.$store.dispatch("SetMessagesToStore",this.Messages);
            this.msgInput = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async changeUser(id) {
      this.Messages = [];
    //  this.$store.dispatch("GetFriends");
      try {
        this.user = await http.getUser(id);
        const payload = {
          senderId: this.me,
          receiverId: this.$route.params.id,
        };
        http
          .newConversation(payload)
          .then(async (data) => {
            this.conversationId = data.data._id;
            http.getMessages(this.conversationId).then(async (data) => {
              this.Messages = data.data;
              // this.$store.dispatch("SetMessagesToStore",this.Messages);
              // console.log(this.Messages);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    returnPrev(id) {
      if (id == 0) {
        return "darshan";
      } else {
        return this.Messages[id - 1].sender;
      }
    },
    // addUnSeenMsg(msg) {      
    //   this.$store.dispatch("upadateSeenMsgs", {id:msg.sender,text:msg.text});
    //   this.Messages = this.Messages.filter((m) => {
    //     m.sender != msg.sender;
    //   });
    //   // this.$store.dispatch("SetMessagesToStore",this.Messages);
    // },
  },
  computed: {
    myfriends() {
      let friends = this.$store.getters.friendsAllData;
      let found = friends.find((friend) => friend.id == this.you);
      return found;
    },
    IsOnlineNow() {
      let friends = this.$store.getters.onlineUsers;
      let IsOnlineNow = friends.find((friend) => friend.userId == this.you);
      return IsOnlineNow;
    },
    Selftypingd(){
 return this.$store.getters.selfTyping;
      }
  },
};
</script>
<style>
.chatwindowparent {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.userTopData {
  height: 60px;
  background: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainchatWindow {
  background: url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png);
  /* background: url(http://localhost:8080/img/chatbg.8c989945.jpg); */
  background-size: contain;
  height: 84%;
}
.chatingdatadiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: #ededed;
}
.InputBar {
  outline: none;
  border: none;
  border-radius: 20px;
  height: 40px;
  width: 100%;
  background: #ffff;
  font-size: 15px;
}
.w-85 {
  width: 83%;
}
.w-80 {
  width: 80%;
}

.topEncrpMsg {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdf4c5;
  color: black !important;
  width: 78%;
  font-size: 12px;
  margin: 20px auto 0;
  padding: 6px 0;
  border-radius: 8px;
}
.dayDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  margin: auto;
  background: #e1f3fb;
  border-radius: 6px;
  font-size: 13px;
}
.fa-check-double {
  color: rgb(96, 200, 235);
}
.scroll-y {
  overflow: scroll;
}
.sendMsgBtn {
  border: none;
}
.font-13 {
  font-size: 13px;
  color: #707070;
}
</style>